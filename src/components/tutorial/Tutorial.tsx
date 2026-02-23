import React from "react";

import { motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle2,
	MapPin,
	RefreshCw,
	Type
} from "lucide-react";

import { cn } from "../../utils/cn";
import { translations } from "../../constants/tutorialTranslation";

interface StepProps {
	index: number;
	title: string;
	description: string;
	icon: React.ReactNode;
	isDark: boolean;
	side: "left" | "right";
	illustration: React.ReactNode;
}

/**
 * Komponen Step — Satu langkah dalam timeline tutorial.
 * Menampilkan ikon di tengah, konten teks di satu sisi, dan ilustrasi di sisi lain.
 */
const Step: React.FC<StepProps> = ({
	index,
	title,
	description,
	icon,
	isDark,
	side,
	illustration
}) => {
	const isLeft = side === "left";

	return (
		<div className="relative flex items-center justify-between mb-32 last:mb-0 w-full">
			{/* Penanda Garis Tengah */}
			<div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center h-full">
				<motion.div
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}
					viewport={{ once: true }}
					className={cn(
						"w-12 h-12 rounded-full border-4 flex items-center justify-center z-10 shadow-xl transition-colors duration-300",
						isDark
							? "bg-bg-dark-raised border-neutral-800 text-brand-red shadow-black"
							: "bg-white border-neutral-100 text-brand-red shadow-rose-100"
					)}
				>
					{icon}
				</motion.div>
			</div>

			{/* Sisi Konten */}
			<motion.div
				initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
				whileInView={{ opacity: 1, x: 0 }}
				whileHover={{ x: isLeft ? 15 : -15 }}
				transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
				viewport={{ once: true, margin: "-100px" }}
				className={cn(
					"w-[42%] space-y-4 cursor-default",
					isLeft ? "text-right" : "order-last text-left"
				)}
			>
				<div>
					<span className="inline-block px-3 py-1 rounded-md bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-widest mb-2">
						Step 0{index}
					</span>
					<h3
						className={cn(
							"text-2xl md:text-3xl font-black tracking-tight",
							isDark ? "text-white" : "text-neutral-900"
						)}
					>
						{title}
					</h3>
				</div>
				<p
					className={cn(
						"text-sm md:text-base font-medium leading-relaxed",
						isDark ? "text-neutral-500" : "text-neutral-500"
					)}
				>
					{description}
				</p>
			</motion.div>

			{/* Sisi Ilustrasi */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8, x: isLeft ? 50 : -50 }}
				whileInView={{ opacity: 1, scale: 1, x: 0 }}
				transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
				viewport={{ once: true, margin: "-100px" }}
				className={cn(
					"w-[42%] flex justify-center",
					!isLeft && "order-first"
				)}
			>
				<motion.div
					whileHover={{ scale: 1.05, rotate: isLeft ? 2 : -2, y: -5 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
					className={cn(
						"relative p-6 rounded-3xl border shadow-2xl cursor-pointer",
						isDark
							? "bg-bg-dark-raised border-white/10 shadow-black"
							: "bg-white border-neutral-200 shadow-neutral-300/70"
					)}
				>
					{illustration}
				</motion.div>
			</motion.div>
		</div>
	);
};

/**
 * Komponen Tutorial — Halaman panduan penggunaan GeoConvert.
 * Menampilkan tiga langkah dalam format timeline vertikal.
 */
const Tutorial: React.FC<{ isDark: boolean; lang: "ID" | "EN" }> = ({
	isDark,
	lang
}) => {
	const t = translations[lang];

	return (
		<div className="relative w-full max-w-6xl mx-auto px-6 py-32 z-10">
			{/* Dekorasi Latar Belakang */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-brand-red/20 to-transparent pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-24 cursor-default"
			>
				<h2
					className={cn(
						"text-4xl md:text-5xl font-black tracking-tight mb-6",
						isDark ? "text-white" : "text-neutral-900"
					)}
				>
					{t.title}{" "}
					<span className="text-brand-red">{t.titleAccent}</span>
				</h2>
				<p
					className={cn(
						"text-lg font-medium max-w-2xl mx-auto",
						isDark ? "text-neutral-500" : "text-neutral-500"
					)}
				>
					{t.description}
				</p>
			</motion.div>

			<div className="space-y-10">
				<Step
					index={1}
					side="left"
					isDark={isDark}
					icon={<Type size={20} />}
					title={t.steps[0].title}
					description={t.steps[0].desc}
					illustration={
						<div className="w-56 space-y-3">
							<div className="h-2 w-20 bg-brand-red/20 rounded-full" />
							<div className="h-8 w-full border border-current opacity-20 rounded-full" />
							<div className="h-8 w-full border border-brand-red/40 rounded-full bg-brand-red/5 flex items-center px-4">
								<span className="text-[10px] font-bold text-brand-red">
									-6.2088
								</span>
							</div>
						</div>
					}
				/>

				<Step
					index={2}
					side="right"
					isDark={isDark}
					icon={<RefreshCw size={20} />}
					title={t.steps[1].title}
					description={t.steps[1].desc}
					illustration={
						<div className="w-56 flex items-center justify-between">
							<div
								className={cn(
									"p-3 rounded-xl border text-[10px] font-bold",
									isDark
										? "bg-neutral-800 border-neutral-700"
										: "bg-neutral-50 border-neutral-100"
								)}
							>
								DMS
							</div>
							<ArrowRight size={16} className="text-brand-red" />
							<div className="p-3 rounded-xl bg-brand-red text-white text-[10px] font-bold">
								DD
							</div>
						</div>
					}
				/>

				<Step
					index={3}
					side="left"
					isDark={isDark}
					icon={<MapPin size={20} />}
					title={t.steps[2].title}
					description={t.steps[2].desc}
					illustration={
						<div className="w-56 h-32 rounded-xl bg-grid-pattern opacity-40 flex items-center justify-center">
							<div className="relative">
								<MapPin size={32} className="text-brand-red animate-bounce" />
								<div className="absolute -bottom-1 left-1.5 w-5 h-2 bg-black/20 rounded-full blur-sm" />
							</div>
						</div>
					}
				/>
			</div>

			{/* Penutup Panggilan Aksi */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="mt-32 text-center"
			>
				<div
					className={cn(
						"inline-flex items-center gap-2 p-4 rounded-3xl border",
						isDark
							? "bg-bg-dark-overlay border-neutral-800 shadow-xl shadow-black/50"
							: "bg-rose-50 border-rose-100"
					)}
				>
					<CheckCircle2 size={24} className="text-brand-red" />
					<span
						className={cn(
							"text-sm font-bold",
							isDark ? "text-neutral-400" : "text-neutral-600"
						)}
					>
						{t.footer}
					</span>
				</div>
			</motion.div>
		</div>
	);
};

export default Tutorial;
