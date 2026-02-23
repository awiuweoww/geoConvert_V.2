import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// 1. Konfigurasi Database
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "geoconvert_db",
	waitForConnections: true,
	connectionLimit: 10
});

// 2. Load Proto File
// Pastikan path ke file .proto Anda benar
const PROTO_PATH = path.resolve(
	__dirname,
	"./src/utils/api/coordinate/proto/coordinate.proto"
);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const coordinateProto = protoDescriptor.CoordinateService;

/**
 * Helper Format Tanggal
 */
function formatDate(date: Date): string {
	return date.toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}

// 3. Implementasi Service
const server = new grpc.Server();

server.addService(coordinateProto.service, {
	// Implementasi SavePoint
	savePoint: async (call: any, callback: any) => {
		const { latitude, longitude } = call.request;
		console.log("gRPC SavePoint Request:", { latitude, longitude });

		try {
			const [result] = await pool.execute(
				"INSERT INTO saved_points (latitude, longitude) VALUES (?, ?)",
				[latitude, longitude]
			);
			const insertId = (result as any).insertId;

			// Ambil data yang baru saja dimasukkan untuk mendapatkan created_at yang asli
			const [rows] = await pool.execute(
				"SELECT created_at FROM saved_points WHERE id = ?",
				[insertId]
			);
			const realCreatedAt = (rows as any)[0].created_at;

			callback(null, {
				point: {
					id: insertId,
					latitude,
					longitude,
					created_at: formatDate(new Date(realCreatedAt))
				}
			});
		} catch (err: any) {
			console.error(err);
			callback({
				code: grpc.status.INTERNAL,
				message: "Database Error: " + err.message
			});
		}
	},

	// Implementasi GetPoints
	getPoints: async (_call: any, callback: any) => {
		try {
			const [rows] = await pool.execute(
				"SELECT id, latitude, longitude, created_at FROM saved_points ORDER BY id DESC"
			);
			const points = (rows as any[]).map((row) => ({
				id: row.id,
				latitude: parseFloat(row.latitude),
				longitude: parseFloat(row.longitude),
				created_at: formatDate(new Date(row.created_at))
			}));
			callback(null, { points });
		} catch (err: any) {
			callback({ code: grpc.status.INTERNAL, message: err.message });
		}
	},

	// Implementasi DeletePoint
	deletePoint: async (call: any, callback: any) => {
		try {
			const [result] = await pool.execute(
				"DELETE FROM saved_points WHERE id = ?",
				[call.request.id]
			);
			callback(null, { success: (result as any).affectedRows > 0 });
		} catch (err: any) {
			console.error("gRPC DeletePoint Error:", err);
			callback({ code: grpc.status.INTERNAL, message: err.message });
		}
	},

	// Implementasi DeleteAllPoints
	deleteAllPoints: async (_call: any, callback: any) => {
		try {
			const [result] = await pool.execute("DELETE FROM saved_points");
			callback(null, { deleted_count: (result as any).affectedRows });
			console.log("gRPC DeleteAllPoints: Berhasil menghapus semua data.");
		} catch (err: any) {
			console.error("gRPC DeleteAllPoints Error:", err);
			callback({ code: grpc.status.INTERNAL, message: err.message });
		}
	}
});

// 4. Menjalankan Server
const port = process.env.PORT || "50051"; // Gunakan port dari .env atau fallback ke 50051
server.bindAsync(
	`0.0.0.0:${port}`,
	grpc.ServerCredentials.createInsecure(),
	(err, actualPort) => {
		if (err) {
			console.error("Gagal bind server:", err);
			return;
		}
		console.log(`🚀 Server gRPC Murni (Node.js/TypeScript) berjalan di port: ${actualPort}`);
	}
);
