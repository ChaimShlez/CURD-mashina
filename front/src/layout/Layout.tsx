
import { Routes, Route } from "react-router-dom";
import HomePage from "../main/homePage/homePage";
import Header from "../header/Header";
import Login from "../main/login/login";
// import AddEmployee from "../main/addEmployee/AddEmployee";

function Layout() {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          
        </Routes>
      </main>
    </div>
  );
}

export default Layout;
