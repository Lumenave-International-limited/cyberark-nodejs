"use client";

import { useEffect, useLayoutEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const route = useRouter();
  const { user } = useAppContext();

  useLayoutEffect(() => {
    if (!user) route.push("/register");
  }, [user, route]);

  return <div>Dashboard</div>;
};

export default Dashboard;
