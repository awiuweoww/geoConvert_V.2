import React, { useEffect, useState } from "react";

import { Clock, Trash } from "lucide-react";

import { coordinateClient, type PointData } from "../../../utils/api/coordinate/coordinateGrpcClient";
import { cn } from "../../../utils/cn";
import { formatCoordinate } from "../../../utils/formatNumber";
import Modal from "../../../common/modal/Modal";
import Table, { type Column } from "../../../common/table/Table";
import { Button } from "../../../common/button/Button";

interface SavedPointsListModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDark: boolean;
    onPointDeleted: (id: number) => void;
}

/**
 * Komponen SavedPointsListModal — Daftar titik koordinat tersimpan.
 * Menggunakan common Modal + Table components.
 */
const SavedPointsListModal: React.FC<SavedPointsListModalProps> = ({
    isOpen,
    onClose,
    isDark,
    onPointDeleted
}) => {
    const [points, setPoints] = useState<PointData[]>([]);
    const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchPoints();
        }
    }, [isOpen]);

    const fetchPoints = async () => {
        try {
            setLoading(true);
            const response = await coordinateClient.getPoints({});
            setPoints(response.points);
        } catch (error) {
            console.error("Failed to fetch points:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await coordinateClient.deletePoint({ id });
                setPoints((prev) => prev.filter((p) => p.id !== id));
                onPointDeleted(id);
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                alert("Gagal menghapus data.");
            }
        }
    };

    const sortedPoints = [...points].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    const columns: Column<PointData>[] = [
        {
            header: "No",
            cell: (_item, index) => (
                <span className="font-medium opacity-50">
                    {String(index + 1).padStart(2, "0")}
                </span>
            )
        },
        {
            header: "Latitude",
            cell: (item) => (
                <span className="font-bold">{formatCoordinate(item.latitude)}</span>
            )
        },
        {
            header: "Longitude",
            cell: (item) => (
                <span className="font-bold">{formatCoordinate(item.longitude)}</span>
            )
        },
        {
            header: "Waktu",
            cell: (item) => (
                <div className="flex items-center gap-2 opacity-60">
                    <Clock size={14} />
                    {item.createdAt}
                </div>
            )
        },
        {
            header: "Aksi",
            cell: (item) => (
                <Button
                    variant="ghost"
                    color="primary"
                    size="xs"
                    onClick={() => handleDelete(item.id)}
                    className="text-brand-red hover:bg-brand-red/10"
                >
                    <Trash size={16} />
                </Button>
            )
        }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Daftar Titik Tersimpan"
            size="xl"
            className={cn(
                "rounded-3xl",
                isDark
                    ? "bg-bg-dark-subtle text-neutral-100"
                    : "bg-white text-neutral-900"
            )}
            footer={
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-30">
                    PT LEN - GEOCONVERT V1.0
                </span>
            }
        >
            <div className="flex justify-between items-center mb-4">
                <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest opacity-50",
                    isDark ? "text-neutral-400" : "text-neutral-600"
                )}>
                    {points.length} Titik ditemukan
                </span>
                <button
                    type="button"
                    onClick={() => setSortOrder(prev => prev === "latest" ? "oldest" : "latest")}
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-xl border transition-all active:scale-95 group",
                        isDark
                            ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                            : "bg-neutral-50 border-neutral-100 text-neutral-500 hover:text-neutral-900"
                    )}
                    aria-label={`Sort by ${sortOrder === "latest" ? "oldest" : "latest"}`}
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest mr-1">
                        {sortOrder === "latest" ? "Terbaru" : "Terlama"}
                    </span>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="14"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {sortOrder === "latest" ? (
                            <path d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                        ) : (
                            <path d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352z" />
                        )}
                    </svg>
                </button>
            </div>
            <Table<PointData>
                data={sortedPoints}
                columns={columns}
                keyExtractor={(item) => item.id}
                isLoading={loading}
                emptyMessage="Belum ada titik yang tersimpan."
                className={cn(
                    "border-0 shadow-none",
                    isDark ? "bg-transparent" : "bg-transparent"
                )}
            />
        </Modal>
    );
};

export default SavedPointsListModal;
