import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Wrapper from "../Component/Wrapper";
import { useState } from "react";

const RootPageLayout = () => {
  return (
    <div className="root-page-layout">
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};
export default RootPageLayout;
