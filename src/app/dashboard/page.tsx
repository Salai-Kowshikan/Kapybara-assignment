"use client"
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react";

function DashboardPage() {

  const userId = useUserStore((state) => state.userId);
  // useEffect( () => {
  //   console.log("User: " + userId)
  // }, [])

  return (
    <div>
      dashboard
    </div>
  );
}

export default DashboardPage;