import React from "react";
import SideBar from "./components/SideBar";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 ">
      <div className="col-span-1">
        <SideBar />
      </div>

      <div className="col-span-4">{children}</div>
    </div>
  );
}
