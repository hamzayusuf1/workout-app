import React from "react";

import { useAppContext } from "../../../State/AppContext";

const DashboardHome = () => {
  const { userData } = useAppContext();
  return (
    <div>{`Welcome To Our Dashboard, ${userData.firstName}  ${userData.lastName}`}</div>
  );
};

export default DashboardHome;
