import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import AddUser from "../pages/admin/AddUser";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/owner" element={<OwnerDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/stores" element={<Stores />} />
      <Route path="/admin/add-user" element={<AddUser />}
/>
    </Routes>
  );
}

export default AppRoutes;