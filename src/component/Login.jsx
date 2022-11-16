import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Index } from './Index';

export const Login = () => {
    const LOGIN_API = "https://phma-rmu.herokuapp.com/api/auth/login";
    let navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(newFormState);

    }

    const isValidEmail = (inputEmail) => {
        return /\S+@\S+\.\S+/.test(inputEmail);
    }

    const submitForm = () => {
        const checkEmail = form.email;
        const checkPassword = form.password;

        let emailLength;
        let validEmail;
        let passwordLength;
        if (checkEmail.trim().length == 0) {
            emailLength = false;
            alert("Please enter username")
        } else {

            emailLength = true;
        }

        if (emailLength) {
            if (isValidEmail(checkEmail)) {

                validEmail = true;

            } else {
                validEmail = false;
                alert("Please enter a valid username")
            }
        }
        if (validEmail) {
            if (checkPassword.trim().length == 0) {
                passwordLength = false;
                alert("Please enter password")
            } else {
                passwordLength = true;
            }
        }

        if (emailLength && validEmail && passwordLength) {
            axios
                .post(LOGIN_API, form)
                .then((response) => {
                    if (response.data.token) {
                        localStorage.setItem("user", JSON.stringify(response.data))
                        if (response.data.roles.includes("admin")) {
                            // console.log(parsedData)
                            navigate("../admin")
                            window.location.reload()
                        } else if (response.data.roles.includes("user")) {
                            navigate("/user")
                            window.location.reload()
                        }else if (response.data.roles.includes("inactive")){
                            alert("This account is inactive")
                        }
                    }
                })
                .catch((error) => {
                    alert("username or password incorrect")
                })
        }

    }

    return (
        <div className='wrapper'>
            <Index />
            <div className='login-form'>
                <div className='login-form-input'>
                    <FontAwesomeIcon icon={faEnvelope} className='email-icon' />
                    <input type="text" placeholder='username' name='email' value={form.email} onChange={onUpdateForm} className='login-input' />
                </div>
                <div className='login-form-input'>
                    <FontAwesomeIcon icon={faLock} className='pass-icon' />
                    <input type="password" placeholder='password' name='password' value={form.password} onChange={onUpdateForm} className='login-input' />
                </div>
                <div className='login-submit' onClick={submitForm}><p>Sign In</p></div>

            </div>
            <Footer />
        </div>
    )
}
