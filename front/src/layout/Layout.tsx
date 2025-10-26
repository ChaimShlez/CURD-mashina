import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../main/homePage/homePage";

function Layout() {
  return (
    <div className="Layout">
      <header>
        {/* <Header /> */}
      </header>

      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          
        </Routes>
      </main>
    </div>
  );
}

export default Layout;
