import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosService from "../utils/axios";


function NewSquad() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateSquad = (name: string, description: string, formup: string) => {
        axiosService
            .post(`/api/squad/`, { name, description, formup })
            .then((res) => {
                setLoading(false);
                navigate("/");
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
        <div className="h-screen flex bg-gray-bg1">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                    Create a squad
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                    <input
                      className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
                      id="name"
                      type="name"
                      placeholder="Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                     />
                     {formik.errors.name ? <div>{formik.errors.name} </div> : null}
                     <input
                      className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
                      id="description"
                      type="description"
                      placeholder="Description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                     />
                     {formik.errors.description ? <div>{formik.errors.description} </div> : null}
                     <input
                      className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
                      id="formup"
                      type="formup"
                      placeholder="Formup"
                      name="formup"
                      value={formik.values.formup}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                     />
                     {formik.errors.formup ? <div>{formik.errors.formup} </div> : null}
                     <div className="text-danger text-center my-2" hidden={false}>
                        {message}
                     </div>
                     <div className="flex justify-center items-center mt-6">
                        <button type="submit" disabled={loading} className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white">
                            Create
                        </button>
                     </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewSquad;
