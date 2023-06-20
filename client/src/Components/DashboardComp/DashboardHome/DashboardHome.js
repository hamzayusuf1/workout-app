import React, { useContext } from "react";

import { AuthContext } from "../../../utils/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>{`Welcome To Our Dashboard, ${user?.user?.firstName}  ${user?.user?.lastName}`}</div>
  );
};

export default DashboardHome;
