import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getStores } from "../../services/adminService";

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Stores</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Store Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Average Rating</th>
            </tr>
          </thead>

          <tbody>
            {stores.length > 0 ? (
              stores.map((store) => (
                <tr key={store.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{store.name}</td>
                  <td className="p-4">{store.email}</td>
                  <td className="p-4">{store.address}</td>
                  <td className="p-4 font-semibold text-yellow-600">
                    ⭐ {store.average_rating}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Stores;