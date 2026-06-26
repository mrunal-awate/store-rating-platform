import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { addUser } from "../../services/adminService";

function AddUser() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addUser(form);

            alert("User Added Successfully");

            setForm({
                name: "",
                email: "",
                password: "",
                address: "",
                role: "USER",
            });

        } catch (error) {

            alert(
                error.response?.data?.message || "Something went wrong"
            );

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">

                Add User

            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-4"
            >

                <input
                    name="name"
                    placeholder="Name"
                    className="w-full border p-3 rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    className="w-full border p-3 rounded"
                    value={form.address}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="w-full border p-3 rounded"
                    value={form.role}
                    onChange={handleChange}
                >

                    <option value="USER">
                        User
                    </option>

                    <option value="STORE_OWNER">
                        Store Owner
                    </option>

                    <option value="ADMIN">
                        Admin
                    </option>

                </select>

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >

                    Add User

                </button>

            </form>

        </DashboardLayout>

    );

}

export default AddUser;