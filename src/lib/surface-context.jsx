"use client";

import { createContext, useContext } from "react";

const SurfaceContext = createContext(1);

export function useSurface() {
  return useContext(SurfaceContext);
}

export function SurfaceProvider({ value, children }) {
  return (
    <SurfaceContext.Provider value={Math.max(1, Math.min(8, value))}>
      {children}
    </SurfaceContext.Provider>
  );
}
