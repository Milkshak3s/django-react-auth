import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import authSlice from "../store/slices/auth";
import apiUrl from "../utils/apiurl";


function Register() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (username: string, email: string, password: string) => {
        axios
            .post(`${apiUrl()}api/auth/register/`, { username, email, password })
            .then((res) => {
                dispatch(
                    authSlice.actions.setAuthTokens({
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    })
                );
                dispatch(authSlice.actions.setUser(res.data.user));
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
            username: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            setLoading(true);
            handleRegister(values.username, values.email, values.password);
        },
        validationSchema: Yup.object({
            username: Yup.string().trim().required("A username is required."),
            email: Yup.string().trim().required("A real email address, please."),
            password: Yup.string().trim().required("Yeah you gotta have a password bud."),
        }),
    });

    return (
        <div className="h-screen flex bg-gray-bg1">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
                    Register a new account
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <input
                          className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
                          id="username"
                          type="username"
                          placeholder="Username"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                         />
                         {formik.errors.username ? <div>{formik.errors.username} </div> : null}
                         <input
                          className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
                          id="email"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                         />
                         {formik.errors.email ? <div>{formik.errors.email} </div> : null}
                         <input
                          className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
                          id="password"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                         />
                         {formik.errors.password ? <div>{formik.errors.password} </div> : null}
                         <div className="text-danger text-center my-2" hidden={false}>
                            {message}
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <button
                            type="submit"
                            disabled={loading}
                            className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
