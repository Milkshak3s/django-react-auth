import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import authSlice from "../store/slices/auth";


function Register() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (username: string, email: string, password: string) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/auth/register/`, { username, email, password })
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
        <div>
            <div>
                <h1>
                    Register a new account
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
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
                          id="password"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                         />
                         {formik.errors.password ? <div>{formik.errors.password} </div> : null}
                         <div hidden={false}>
                            {message}
                        </div>
                        <div>
                            <button
                            type="submit"
                            disabled={loading}
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
