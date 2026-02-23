/**
 * coordinateGrpcClient.ts
 *
 * Client wrapper gRPC-Web untuk CoordinateService.
 * Membungkus generated gRPC-Web client (PromiseClient) ke dalam
 * interface yang lebih nyaman dipakai oleh komponen React.
 *
 * Usage:
 * ```ts
 * import { coordinateClient } from "../utils/api/coordinate/coordinateGrpcClient";
 *
 * const response = await coordinateClient.getPoints({});
 * const points = response.points; // Point[]
 * ```
 */
import { CoordinateServicePromiseClient } from "./generated/coordinate_grpc_web_pb";
import {
	DeleteAllPointsRequest,
	DeletePointRequest,
	GetPointsRequest,
	Point,
	SavePointRequest
} from "./generated/coordinate_pb";



/**
 * URL target gRPC-Web proxy (Envoy / APISIX).
 * Diambil dari file .env (RSPACK_GRPC_HOST).
 */
const GRPC_HOST = process.env.RSPACK_GRPC_HOST || "http://localhost:9080";

/** Instance Promise-based gRPC-Web client (Pure gRPC-Web). */
const client = new CoordinateServicePromiseClient(GRPC_HOST, null, {
	format: "text"
});



export interface PointData {
	id: number;
	latitude: number;
	longitude: number;
	createdAt: string;
}

interface GetPointsResult {
	points: PointData[];
}

interface SavePointResult {
	point: PointData | null;
}

interface DeletePointResult {
	success: boolean;
}

interface DeleteAllPointsResult {
	deletedCount: number;
}



/** Konversi protobuf Point ke plain object. */
function toPointData(p: Point): PointData {
	return {
		id: p.getId(),
		latitude: p.getLatitude(),
		longitude: p.getLongitude(),
		createdAt: p.getCreatedAt()
	};
}

// ─── Public API ─────────────────────────────────────────────────────────────

export const coordinateClient = {
	/**
	 * Mengambil semua titik tersimpan dari database.
	 */
	async getPoints(_req: Record<string, never> = {}): Promise<GetPointsResult> {
		const request = new GetPointsRequest();
		const response = await client.getPoints(request);
		return {
			points: response.getPointsList().map(toPointData)
		};
	},

	/**
	 * Menyimpan titik koordinat baru ke database.
	 */
	async savePoint(req: {
		latitude: number;
		longitude: number;
	}): Promise<SavePointResult> {
		const request = new SavePointRequest();
		request.setLatitude(req.latitude);
		request.setLongitude(req.longitude);
		const response = await client.savePoint(request);
		const point = response.getPoint();
		return {
			point: point ? toPointData(point) : null
		};
	},

	/**
	 * Menghapus satu titik koordinat berdasarkan ID.
	 */
	async deletePoint(req: { id: number }): Promise<DeletePointResult> {
		const request = new DeletePointRequest();
		request.setId(req.id);
		const response = await client.deletePoint(request);
		return {
			success: response.getSuccess()
		};
	},

	/**
	 * Menghapus semua titik koordinat.
	 */
	async deleteAllPoints(
		_req: Record<string, never> = {}
	): Promise<DeleteAllPointsResult> {
		const request = new DeleteAllPointsRequest();
		const response = await client.deleteAllPoints(request);
		return {
			deletedCount: response.getDeletedCount()
		};
	}
};
