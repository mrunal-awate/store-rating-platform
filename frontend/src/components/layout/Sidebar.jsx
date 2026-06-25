import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    return (

        <div className="w-64 bg-slate-900 text-white min-h-screen">

            <div className="text-2xl font-bold p-6 border-b border-slate-700">
                Store Rating
            </div>

            <nav className="flex flex-col mt-4">

                <Link
                    className="px-6 py-3 hover:bg-slate-700"
                    to="/admin"
                >
                    Dashboard
                </Link>

                {
                    user?.role === "ADMIN" && (
                        <>
                            <Link
                                className="px-6 py-3 hover:bg-slate-700"
                                to="/admin/users"
                            >
                                Users
                            </Link>

                            <Link
                                className="px-6 py-3 hover:bg-slate-700"
                                to="/admin/stores"
                            >
                                Stores
                            </Link>
                        </>
                    )
                }

                {
                    user?.role === "USER" && (

                        <Link
                            className="px-6 py-3 hover:bg-slate-700"
                            to="/user"
                        >
                            Stores
                        </Link>

                    )
                }

                {
                    user?.role === "STORE_OWNER" && (

                        <Link
                            className="px-6 py-3 hover:bg-slate-700"
                            to="/owner"
                        >
                            Dashboard
                        </Link>

                    )
                }

            </nav>

        </div>

    );
}

export default Sidebar;