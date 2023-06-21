"use client";

import { useEffect, useLayoutEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const route = useRouter();
  const { user, logoutUser } = useAppContext();

  useLayoutEffect(() => {
    if (!user) route.push("/not-authorized");
  }, [user, route]);

  return (
    <div className="my-48 mx-auto text-center">
      <h2 className="text-3xl m-5">
        Only authenticated users can access this page.
      </h2>
      <p className="font-bold">User: {user?.email}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
      <p>{user?.department}</p>

      <button
        className="bg-black py-2 px-4 text-white rounded-lg mt-5"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
