import React, { useState } from 'react'
import axios from 'axios'
export const AddUser = () => {
    const ADD_USER_API_URL = "https://phma-rmu.herokuapp.com/adduser";
    const [form, setForm] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const [role, setRole] = useState({
        name: "",
    });

    const submit = { ...form, roles: [role] }
    const finalSubmit = JSON.stringify(submit, null, 2)

    const onUpdateRole = e => {
        const newFormState = {
            ...role,
            [e.target.name]: e.target.value
        };
        setRole(newFormState);
    }

    const onUpdate = e => {
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
        const checkUserName = form.firstName;
        const checkEmail = form.email;
        const checkPassword = form.password;
        const checkRole = role.name;

        let nameLength;
        let emailLength;
        let validEmail;
        let passwordLength;
        let roleLength;
        if (checkUserName.trim().length == 0) {
            nameLength = false;
            alert("Please Enter First Name")
        } else {

            nameLength = true;
        }

        if (nameLength) {
            if (checkEmail.trim().length == 0) {
                emailLength = false;
                alert("Please Enter Username")
            } else {
                emailLength = true
            }
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

        if (passwordLength) {
            if (checkRole.trim().length == 0) {
                roleLength = false
                alert("Please Select Role")
            } else {
                roleLength = true
            }
        }

        if (nameLength && emailLength && validEmail && passwordLength && roleLength) {
            axios
                .post(ADD_USER_API_URL, finalSubmit, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {

                    alert(response.data)
                    setForm({
                        firstName: "",
                        email: "",
                        password: "",

                    })

                    setRole({
                        name: ""

                    })
                })
                .catch((error) => {
                    alert(error)
                })

        }

    }

    return (
        <div className='wrapper'>
            <div className='incoming-header'>
                <h4>Add New User</h4>
            </div>
            <div className='add-form'>
                <div className='login-form-input'>
                    <input type="text" placeholder='First Name' name='firstName' value={form.firstName} onChange={onUpdate} className='login-input' />
                </div>
                <div className='login-form-input'>
                    <input type="text" placeholder='username' name='email' value={form.email} onChange={onUpdate} className='login-input' />
                </div>
                <div className='login-form-input'>
                    <input type="password" placeholder='password' name='password' value={form.password} onChange={onUpdate} className='login-input' />
                </div>

                <select name="name" value={role.role} onChange={onUpdateRole} className='select-login-input'>
                    <option value="" disabled selected>--Select Role</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                </select>

                <div className='login-submit' onClick={submitForm}>Add User</div>

            </div>
        </div>
    )
}
