import React, { useState } from 'react'
import axios from 'axios'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Outgoing = () => {
    const ADD_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/add-outgoing";
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);
    const [file, setFile] = useState('')
    let formData = new FormData();
    const [form, setForm] = useState({
        reference: "",
        dateReceivedForDispatch: "",
        subject: "",
        modeOfDispatch: ""
    })

    const inputArr = [
        {
            address: ""
        }
    ];

    const [arr, setArr] = useState(inputArr);

    const addInput = () => {
        setArr(s => {
            return [
                ...s,
                {
                    address: ""
                }
            ];
        });
    };

    const handleChange = e => {
        e.preventDefault();

        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].address = e.target.value;

            return newArr;
        });
    };


    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(newFormState)
    }

    const onUpdate = (e) =>{
        setFile(e.target.files[0])
    }

    const user = ({
        id: parsedData.userId,
        firstName: parsedData.firstName,
        email: parsedData.email

    })

    // const submit = { ...form, addressee: [ ...arr ], appUser: { ...user }}


    const onSubmit = () => {
        const checkReference = form.reference;
        const checkDate = form.dateReceivedForDispatch;
        const checkSubject = form.subject;
        const checkMode = form.modeOfDispatch;
        

        let refLength;
        let dateLength;
        let subLength;
        let modeLength;
        let addLength;

        if (checkReference.trim().length == 0) {
            refLength = false;
            alert("Please Enter File Reference Number")
        } else {

            refLength = true;
        }

        if (refLength) {
            if (checkDate.trim().length == 0) {
                dateLength = false;
                alert("Please Enter Date Received For Dispatch")
            } else {
                dateLength = true;
            }

        }

        if (dateLength) {
            if (checkSubject.trim().length == 0) {
                subLength = false;
                alert("Please Enter Subject")
            } else {
                subLength = true;
            }
        }

        if (subLength) {
            if (checkMode.trim().length == 0) {
                modeLength = false;
                alert("Please Select Mode of Dispatch")
            } else {
                modeLength = true;
            }
        }

        if (modeLength) {
            if (arr[0].address.trim().length == 0) {
                addLength = false;
                alert("Please enter Addressee")
            } else {
                addLength = true;
            }
        }



        if (refLength && dateLength && subLength && modeLength && addLength) {
            
            formData.append("reference",form.reference)
            formData.append("date", form.dateReceivedForDispatch)
            formData.append("mode",form.modeOfDispatch)
            formData.append("subject",form.subject)
            formData.append("user",user.id)
            formData.append("user",user.email)
            formData.append("user",user.firstName)
            arr.map((item,i)=>{
                formData.append("address", item.address)
            })
            formData.append("file",file)
            

            axios
                .post(ADD_OUTGOING_API_URL,formData)
                .then((response)=>{
                    alert(response.data)
                    setForm({
                        reference: "",
                        dateReceivedForDispatch: "",
                        subject: "",
                        modeOfDispatch: ""
                    })
                })
                .catch((error)=>{
                    alert(error)
                })
        }



    }
    return (
        <div className='incoming-wrapper'>
            <div className='incoming-header'>
                <h4>Outgoing Correspondence</h4>
            </div>
            <form className='incoming-form' encType='multipart/form-data'>

                <div className='incoming-form-input'>
                    <div className='form-input'>
                        <input type="text" className='input-field' name='reference' value={form.reference} onChange={onUpdateForm} placeholder="File Reference Number" />
                        <input type="date" className='input-field' name='dateReceivedForDispatch' value={form.dateReceivedForDispatch} onChange={onUpdateForm} placeholder='Date Received For Dispatch' />
                        <input type="text" name='subject' value={form.subject} onChange={onUpdateForm} className='input-field' placeholder='Subject' />


                        <select name="modeOfDispatch" id="" className='input-field select-div' value={form.modeOfDispatch} onChange={onUpdateForm}>
                            <option value="" disabled selected>--Select Mode of Dispatch</option>
                            <option value="EMS">EMS</option>
                            <option value="Local Posting">Local Posting</option>
                            <option value="By Hand">By Hand</option>
                            <option value="Email">Email</option>
                        </select>


                        {arr.map((item, i) => {
                            return (
                                <div className='add-addresse'>
                                    <FontAwesomeIcon icon={faCirclePlus} className='add-icon' size='2x' onClick={addInput} />
                                    <textarea className='input-field text-area-input' id={i}  address={item.address} onChange={handleChange} placeholder='Addresse' />
                                </div>
                            );
                        })}

            <div className='file-upload-input'>
                    <input type="file" name='upload' onChange={onUpdate} className='file-input' />
                </div>
                        <div className='form-submit-button-out' onClick={onSubmit}>
                            <p className='incoming-submit'>Submit</p>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
