import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getUsers } from "../../services/adminService";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Address</th>
            </tr>

          </thead>

          <tbody>

            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">

                  <td className="p-4">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">{user.address}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>
    </DashboardLayout>
  );
}

export default Users;