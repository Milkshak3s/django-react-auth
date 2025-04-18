import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosService from "../utils/axios";


function ZCreateSquadForm() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateSquad = (name: string, description: string, formup: string) => {
        axiosService
            .post(`/api/squad/`, { name, description, formup })
            .then((res) => {
                setLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setMessage(error.response.data.detail);
                } else if (error.request) {
                    console.log(error.request);
                    setMessage(error.request);
                } else {
                    console.log('Error', error.message);
                    setMessage(error.message);
                }
            });
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            formup: "",
        },
        onSubmit: (values) => {
            setLoading(true);
            handleCreateSquad(values.name, values.description, values.formup);
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required("A name is required."),
            description: Yup.string().trim(),
            formup: Yup.string().trim()
        }),
    });


    return (
        <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Delta Team" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Formup Info</label>
                    <input value={formik.values.formup} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="formup" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2025-06-31 0600 UTC" required />
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anti-armor, anti-sweat, 7 dudes" required />
            </div>
            <div className="text-danger text-center my-2" hidden={false}>
                {message}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </form>
    );
}

export default ZCreateSquadForm
