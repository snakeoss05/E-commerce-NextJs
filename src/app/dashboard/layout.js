import React from "react";
import SideBarDashBord from "./components/SideBarDashBord";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 ">
      <div className="col-span-1">
        <SideBarDashBord />
      </div>

      <div className="col-span-4">{children}</div>
    </div>
  );
}
