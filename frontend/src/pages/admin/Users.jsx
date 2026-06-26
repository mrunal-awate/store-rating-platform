import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getUsers, searchUsers } from "../../services/adminService";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (search.trim() === "") {
          const data = await getUsers();
          setUsers(data);
        } else {
          const data = await searchUsers(search);
          setUsers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [search]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72"
        />

      </div>

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
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
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