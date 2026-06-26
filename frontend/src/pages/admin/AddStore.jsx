import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { addStore } from "../../services/adminService";

function AddStore() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        owner_id: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addStore(form);

            alert("Store Added Successfully");

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">
                Add Store
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-4"
            >

                <input
                    name="name"
                    placeholder="Store Name"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Store Email"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <input
                    name="owner_id"
                    placeholder="Owner ID"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                <button
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >
                    Add Store
                </button>

            </form>

        </DashboardLayout>

    );

}

export default AddStore;