import DashboardLayout from "../../components/layout/DashboardLayout";

function AdminDashboard() {

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">

                Admin Dashboard

            </h1>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">

                        Total Users

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        0

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">

                        Total Stores

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        0

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">

                        Total Ratings

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        0

                    </p>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AdminDashboard;