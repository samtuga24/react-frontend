import React, { useState } from 'react'
import axios from 'axios'
export const TransitSheet = () => {
    const ADD_TRANSIT_API_URL = "https://phma-rmu.herokuapp.com/add-transit";
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);
    const [form, setForm] = useState({
        fileTitle: "",
        sentTo:"",
        reference: "",
        signature: "",
        remarks: ""
    })

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

    const submit = { ...form, appUser: { ...user }}
    const finalSubmit = JSON.stringify(submit, null, 2)

    const onSubmit = () =>{
        // const checkTitle = form.fileTitle;
        const checksentTo = form.sentTo;
        const checkReference = form.reference;
        const checkSignature = form.signature;
        const checkRemarks = form.remarks;

        let titleLength;
        let sentToLength;
        let referenceLength;
        let signatureLength;
        let remarksLength;

        // if (checkTitle.trim().length==0) {           
        //     titleLength = false;
        //     alert("Please Enter File Title")
        // } else {
           
        //     titleLength = true;
        // }

        
            if(checksentTo.trim().length==0){
                sentToLength = false;
                alert("Please Enter Sent To")
            } else{
                sentToLength = true;
            }
        

        if(sentToLength){
            if(checkReference.trim().length==0){
                referenceLength = false;
                alert("Please enter from whom received")
            } else{
                referenceLength = true;
            }
        }

        if(referenceLength){
            if(checkSignature.trim().length==0){
                signatureLength = false;
                alert("Please Enter Recipient ")
            } else{
                signatureLength = true;
            }
        }

        if(signatureLength){
            if(checkRemarks.trim().length==0){
                remarksLength = false;
                alert("Please enter Subject")
            } else{
                remarksLength = true;
            }
        }

        if(sentToLength && referenceLength && signatureLength && remarksLength){
            axios
                .post(ADD_TRANSIT_API_URL,finalSubmit,{headers: {
                    "Content-Type": "application/json"}
                })
                .then((response)=>{
                    console.log(response.data)
                    setForm({
                        // fileTitle:"",
                        sentTo:"",
                        reference:"",
                        signature:"",
                        remarks:"",
                    })
                    alert(response.data.body)

                })
                .catch((error)=>{
                    alert(error)
                })
            
        }
    }
  return (
    <div className='incoming-wrapper'>
    <div className='incoming-header'>
        <h4>File Transit Sheet</h4>
    </div>
    <div className='incoming-form'>
        
        <div className='incoming-form-input'>
            <div className='form-input'>
                {/* <input type="text" name='fileTitle' value={form.fileTitle} onChange={onUpdateForm} className='input-field' placeholder='File Title'/> */}
                <input type="text" name='sentTo' value={form.sentTo} onChange={onUpdateForm} className='input-field' placeholder='Sent To'/>
                <input type="text" name='reference' value={form.reference} onChange={onUpdateForm} className='input-field' placeholder='File Reference Number'/>
                <input type="text" name='signature' value={form.signature} onChange={onUpdateForm} className='input-field' placeholder='Recipient'/>
                <input type="text" name='remarks' value={form.remarks} onChange={onUpdateForm} className='input-field' placeholder="Remarks"/>
                <div className='form-submit-button' onClick={onSubmit}>
                    <p className='incoming-submit'>Submit</p>
                </div>
            </div>

        </div>
    </div>
</div>
  )
}
