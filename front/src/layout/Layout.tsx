
import { Routes, Route } from "react-router-dom";
import HomePage from "../main/homePage/homePage";
import Header from "../header/Header";
import UpdateEmployee from "../main/updateEmployee/UpdateEmployee";
// import AddEmployee from "../main/addEmployee/AddEmployee";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header >
        <Header />
      </header>

      <main className="flex-1 bg-green-200">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/updateEmployee" element={<UpdateEmployee />} />
          {/* <Route path="/register" element={<Register />} /> */}
          
        </Routes>
      </main>
    </div>
  );
}

export default Layout;
