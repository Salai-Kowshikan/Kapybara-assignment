"use client";

import { useLoadingStore } from "@/stores/loading-store";
import { grid } from "ldrs";

grid.register();

const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <l-grid size="120" speed="2.0" color="white" />
    </div>
  );
};

export default Loader;
