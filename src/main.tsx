import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

/**
 * Titik masuk utama aplikasi (Main Entry Point).
 * Merender komponen root <App /> ke dalam elemen DOM dengan ID 'root'.
 */
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);
