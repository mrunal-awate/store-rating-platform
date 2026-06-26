import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getStores,
  searchStores,
} from "../../services/adminService";

function Stores() {

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchStores = async () => {

      try {

        if (search.trim() === "") {

          const data = await getStores();

          setStores(data);

        } else {

          const data = await searchStores(search);

          setStores(data);

        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchStores();

  }, [search]);

  return (

    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Stores

        </h1>

        <input
          type="text"
          placeholder="Search stores..."
          className="border rounded-lg px-4 py-2 w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Store</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Address</th>

            </tr>

          </thead>

          <tbody>

            {

              stores.length > 0 ?

                stores.map((store) => (

                  <tr
                    key={store.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">

                      {store.name}

                    </td>

                    <td className="p-4">

                      {store.email}

                    </td>

                    <td className="p-4">

                      {store.address}

                    </td>

                  </tr>

                ))

                :

                <tr>

                  <td
                    colSpan="3"
                    className="text-center p-6"
                  >

                    No Stores Found

                  </td>

                </tr>

            }

          </tbody>

        </table>

      </div>

    </DashboardLayout>

  );

}

export default Stores;