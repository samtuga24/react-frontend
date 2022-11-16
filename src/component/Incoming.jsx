import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const Incoming = () => {
    const ADD_INCOMMING_API_URL = "https://phma-rmu.herokuapp.com/add-incoming";
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);
    const [file, setFile] = useState('')
    const [form, setForm] = useState({
        dateOfLetter: "",
        fromWhomReceived: "",
        institutionsReference: "",
        subject: "",
        documents:""
    });

    form.documents = file;

    const onUpdate = (e) => {
        setFile(e.target.files[0])
    }


    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };

        setForm(newFormState);
    }


    const user = ({
        id: parsedData.userId,
        firstName: parsedData.firstName,
        email: parsedData.email

    })

    let formData = new FormData();
    

    const submit = { ...form, appUser: { ...user }}
    const finalSubmit = JSON.stringify(submit)

    const onSubmit = () => {
        // const checkReference = form.reference;
        const checkDate = form.dateOfLetter;
        const checkReceived = form.fromWhomReceived;
        const checkInstitution = form.institutionsReference;
        const checkSubject = form.subject;


        let datefLength;
        let receivedLength;
        let institutionLength;
        let subLength;
        let fileLength;
        let ext;
        let fileSize;

        if (checkDate.trim().length == 0) {
            datefLength = false;
            alert("Please Enter Date Of Letter")
        } else {
            datefLength = true;
        }


        if (datefLength) {
            if (checkReceived.trim().length == 0) {
                receivedLength = false;
                alert("Please Enter From Whom Received")
            } else {
                receivedLength = true;
            }
        }

        if (receivedLength) {
            if (checkInstitution.trim().length == 0) {
                institutionLength = false;
                alert("Please Enter Institution's Reference Number")
            } else {
                institutionLength = true;
            }
        }

        if (institutionLength) {
            if (checkSubject.trim().length == 0) {
                subLength = false;
                alert("Please Enter Subject")
            } else {
                subLength = true;
            }
        }

        if (subLength) {
            if (file.length < 1) {
                fileLength = false;
                alert("Please Select File to Upload")
            } else {
                fileLength = true;

            }
        }
        if (fileLength) {
            var format = [".PDF", ".pdf"];
            var extension = file.name.substr(file.name.indexOf('.'))
            if (format.includes(extension)) {
                ext = true
            } else {
                alert("Only pdf format is supported")
                ext = false;
            }

        }

        if (datefLength && receivedLength && institutionLength && subLength ) {
           
            formData.append("file",file)
            formData.append("date",form.dateOfLetter)
            formData.append("whom",form.fromWhomReceived)
            formData.append("instRef",form.institutionsReference)
            formData.append("subject",form.subject)
            formData.append("user",user.id)
            formData.append("user",user.firstName)
            formData.append("user",user.email)
            
            
        
            axios
                .post(ADD_INCOMMING_API_URL,formData)
                .then((response) => {
                    alert(response.data)
                    setForm({

                        dateOfLetter: "",
                        fromWhomReceived: "",
                        institutionsReference: "",
                        subject: ""
                    })
                })
                .catch((error) => {
                    console.log(error)
                })

           
        }
    }
    return (
        <div className='incoming-wrapper'>
            <div className='incoming-header'>
                <h4>Incoming Correspondence</h4>
            </div>
            <form action="" encType='multipart/form-data' className='incoming-form'>


                <div className='incoming-form-input'>
                    <div className='form-input'>

                        <input type="date" name='dateOfLetter' value={form.dateOfLetter} onChange={onUpdateForm} className='input-field' placeholder='Date Of Letter' />
                        <input type="text" name='fromWhomReceived' value={form.fromWhomReceived} onChange={onUpdateForm} className='input-field' placeholder='From Whom Received' />
                        <input type="text" name='institutionsReference' value={form.institutionsReference} onChange={onUpdateForm} className='input-field' placeholder="Institution's Reference" />
                        <input type="text" name='subject' value={form.subject} onChange={onUpdateForm} className='input-field' placeholder='File Subject' />

                        <div className='file-upload-input'>

                            <input type="file" name='documents' onChange={onUpdate} className='file-input' />
                        </div>
                        <div className='form-submit-button' onClick={onSubmit}>
                            <p className='incoming-submit'>Submit</p>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    )
}
