"use client";

import { useLoadingStore } from "@/stores/loading-store";


const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    </div>
  );
};

export default Loader;
