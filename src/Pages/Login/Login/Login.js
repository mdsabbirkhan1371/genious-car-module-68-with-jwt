import { async } from '@firebase/util';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';

import { Link } from "react-router-dom";
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Shared/Loading/Loading';
import PageTitle from '../../PageTitle/PageTitle';
import axios from 'axios'
const Login = () => {

    // get input value 
    const emailRef = useRef('');
    const passRef = useRef('');
    const navigate = useNavigate()
    const location = useLocation()

    let from = location.state?.from?.pathname || "/";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending, errorPassword] = useSendPasswordResetEmail(
        auth
    );

    if (loading || sending) {
        return <Loading></Loading>
    }
    if (error) {
        errorElement =
            <div>
                <p className='text-danger'>Error: {error?.message}</p>
            </div>

    }
    if (user) {
        // navigate(from, { replace: true });
    }

    const handleLoginSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passRef.current.value;
        await signInWithEmailAndPassword(email, password);
        const { data } = await axios.post('http://localhost:5000/login', { email })
        localStorage.setItem('accessToken', data.accessToken)
        navigate(from, { replace: true })

    }

    const registerHandle = () => {
        navigate('/register')
    }
    const resetPassword = async () => {
        const email = emailRef.current.value
        if (email) {
            await sendPasswordResetEmail(email)
            toast('sent email')
        }
        else {
            toast('Please Enter Your Email')
        }

    }

    return (

        <div className="container w-50  p-3 rounded">
            <PageTitle title="login"></PageTitle>
            <h3 className='text-center m-4'>Please Login!!</h3>
            <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control ref={passRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='btn btn-info w-50 d-block mx-auto my-3' variant="primary" type="submit">
                    Login
                </Button>

            </Form>
            {errorElement}
            <p> New in genious car service?<Link className='text-primary text-decoration-none' to='/register' onClick={registerHandle}> Please Register Now</Link> </p>
            <p> Forger Password?<button className='text-primary text-decoration-none btn btn-link' onClick={resetPassword}> Forget  Now</button> </p>
            <SocialLogin></SocialLogin>
            <ToastContainer />
        </div>

    );
};

export default Login;