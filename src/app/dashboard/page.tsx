"use client"
import { useUserStore } from "@/stores/user-store";

function DashboardPage() {

  const userId = useUserStore((state) => state.userId);

  return (
    <div>
      dashboard
    </div>
  );
}

export default DashboardPage;