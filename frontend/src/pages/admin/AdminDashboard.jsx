import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../services/adminService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the Store Rating Management System
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Users Card */}
        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-gray-500 text-lg font-medium">
                Total Users
              </h3>

              <p className="text-5xl font-bold text-blue-600 mt-4">
                {stats.totalUsers}
              </p>
            </div>

            <div className="text-5xl">
              👥
            </div>

          </div>
        </div>

        {/* Stores Card */}
        <div
          onClick={() => navigate("/admin/stores")}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-gray-500 text-lg font-medium">
                Total Stores
              </h3>

              <p className="text-5xl font-bold text-green-600 mt-4">
                {stats.totalStores}
              </p>
            </div>

            <div className="text-5xl">
              🏪
            </div>

          </div>
        </div>

        {/* Ratings Card */}
        <div
          className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-gray-500 text-lg font-medium">
                Total Ratings
              </h3>

              <p className="text-5xl font-bold text-red-600 mt-4">
                {stats.totalRatings}
              </p>
            </div>

            <div className="text-5xl">
              ⭐
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;