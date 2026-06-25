import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <div className="bg-white shadow flex justify-between items-center px-8 py-4">

            <div>

                <h2 className="text-2xl font-semibold">
                    Welcome,
                    {" "}
                    {user?.name}
                </h2>

            </div>

            <button

                onClick={handleLogout}

                className="bg-red-500 text-white px-5 py-2 rounded-lg"

            >

                Logout

            </button>

        </div>

    );
}

export default Navbar;