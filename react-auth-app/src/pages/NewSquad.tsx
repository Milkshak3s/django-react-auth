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
        <div>
            <div>
                <h1>
                    Create a squad
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                    <input
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
                      id="formup"
                      type="formup"
                      placeholder="Formup"
                      name="formup"
                      value={formik.values.formup}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                     />
                     {formik.errors.formup ? <div>{formik.errors.formup} </div> : null}
                     <div hidden={false}>
                        {message}
                     </div>
                     <div>
                        <button type="submit" disabled={loading}>
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
