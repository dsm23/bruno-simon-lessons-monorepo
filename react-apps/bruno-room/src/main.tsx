import { StrictMode, Suspense } from "react";
import { Loader } from "@react-three/drei";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Loader />
  </StrictMode>,
);
