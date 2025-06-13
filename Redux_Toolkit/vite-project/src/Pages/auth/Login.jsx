import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import authThunk from "../../Redux/auth/authThunk";
import { LoginUI } from "../../features/authFeatures/LoginUI";


const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required."),
    password: Yup.string().required("Password is required.")
})

function Login() {
    const [data, setData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: data,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {

            const body = {
                email: values.email,
                password: values.password
            }

            dispatch(authThunk.login(body)).then((response) => {
                setSubmitting(false);
                if (response.meta.requestStatus === "fulfilled") {

                    navigate(`/dashboard`)
                }
                else {

                    setSubmitting(false);
                }
            })
        },
    })
    return <>
        <LoginUI formik={formik} />
    </>
}
export default Login;