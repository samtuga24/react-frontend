import React, { useState } from 'react'
import axios from 'axios'
export const ReturnTransit = () => {
    const [form, setForm] = useState({
        title: "",
        returningOfficer: ""
    })

    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(newFormState)
    }

    const onSubmit = () => {
        const checkTitle = form.title;
        const checkOfficer = form.returningOfficer;

        let titleLength;
        let officerLength;


        if (checkTitle.trim().length == 0) {
            titleLength = false;
            alert("Please Enter File Title")
        } else {

            titleLength = true;
        }

        if (titleLength) {
            if (checkOfficer.trim().length == 0) {
                officerLength = false;
                alert("Please Enter Returning Officer's Name")
            } else {
                officerLength = true;
            }

        }


        if (titleLength && officerLength) {
            var str = form.title.replace(/\\|\//g,'')
            axios.patch(`https://phma-rmu.herokuapp.com/update-transit/${str}`, form.returningOfficer,{headers: {
                "Content-Type": "application/json"}
            })
                .then((response) => {
                    alert(response.data.body)
                })
                .catch((error) => {
                    console.log(error)
                })

            // console.log(form.title)
        }

    }

    return (
        <div className='incoming-wrapper'>
            <div className='incoming-header'>
                <h4>File Return Form</h4>
            </div>
            <div className='incoming-form'>

                <div className='incoming-form-input'>
                    <div className='form-input'>
                        <input type="text" name='title' value={form.fileTitle} onChange={onUpdateForm} className='input-field' placeholder='File Reference Number' />
                        <input type="text" name='returningOfficer' value={form.returningOfficer} onChange={onUpdateForm} className='input-field' placeholder='Returning Officer' />
                        <div className='form-submit-button' onClick={onSubmit}>
                            <p className='incoming-submit'>Submit</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
