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
            console.error("Gagal fetch data", error);
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
            </div>
            <Table<PointData>
                data={points}
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
