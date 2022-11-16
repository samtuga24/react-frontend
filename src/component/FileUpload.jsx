import React, { useState } from 'react'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export const FileUpload = () => {
    // const UPDATE_API_URL = "http://localhost:8080/update/";
    // const SEARCH_API_URL = "http://localhost:8080/view-reference/";

    const [file, setFile] = useState('')
    const [form, setForm] = useState({
        reference: ""
    });

    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };

        setForm(newFormState);
    }

    let formData = new FormData();

    const onUpdate = (e) =>{
        setFile(e.target.files[0])
    }

    const onSubmit = (e) =>{

        
        const checkReference = form.reference;

        let refLength;
        let fileLength;
        let ext;

        if (checkReference.trim().length == 0) {
            refLength = false;
            alert("Please Enter File Subject")
        } else {

            refLength = true;
        }

        if(refLength){
            if(file.length < 1){
                fileLength = false;
                alert("Please Select File to Upload")
            } else{
                fileLength = true;
                
            }
        }
        if(fileLength){
            var format = [".PDF", ".pdf"];
            var extension = file.name.substr(file.name.indexOf('.'))
            if(format.includes(extension)){
                ext = true
            }else{
                alert("Only pdf format is supported")
                ext = false;
            }

        }

        if(refLength && fileLength && ext){
            formData.append("file", file)
            axios.patch(`https://phma-rmu.herokuapp.com/update/${form.reference}`,formData)
            .then((response)=>{
                alert(response.data.body)
            })
            .catch((error)=>{
                alert(error)
            })
               
    }

}
    return (
        <div className='incoming-file-upload'>
            <div className='incoming-header'>
                <h4>Upload Incoming file</h4>
            </div>
            <form action="" className='file-form' encType='multipart/form-data'>

                <div className='file-upload-input'>
                <input type="text" name="reference" value={form.reference} onChange={onUpdateForm} className='upload-field' placeholder='Enter File Subject' />
                    <input type="file" name='upload' onChange={onUpdate} className='file-input' />
                </div>
                <div className='file-submit-button' onClick={onSubmit}>
                    <p className='incoming-submit'>Upload</p>
                
            </div>

            </form>
        </div>
    )
}
