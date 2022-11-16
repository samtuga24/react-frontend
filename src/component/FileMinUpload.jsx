import React, { useState } from 'react'
import axios from 'axios'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FileMinUpload = () => {
    const [file, setFile] = useState('')
    const [form, setForm] = useState({
        subject:"",
        reference: ""
    });


    const inputArr = [
        {
            reference: ""
        }
    ];

    const [arr, setArr] = useState(inputArr);

    const addInput = () => {
        setArr(s => {
            return [
                ...s,
                {
                    reference: ""
                }
            ];
        });
    };

    const handleChange = e => {
        e.preventDefault();

        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].reference = e.target.value;

            return newArr;
        });
    };

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
        const checkSubject = form.subject;
        let subLength;
        let refLength;
        let fileLength;
        let ext;

        if (checkSubject.trim().length == 0) {
            subLength = false;
            alert("Please Enter File Subject")
        } else {

            subLength = true;
        }

        if(subLength){
            if(arr[0].reference.trim().length == 0){
                refLength = false;
                alert("Please Enter File Reference Number")
            } else{
                refLength = true
            }
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





        if(subLength && refLength && fileLength && ext){
           
            // let finalArr = [];
            arr.map((item,i)=>{
                formData.append("reference", item.reference)
            })
            formData.append("file", file)
            
            axios.patch(`https://phma-rmu.herokuapp.com/update-minuted/${form.subject}`,formData)
            .then((response)=>{
                alert(response.data.body)
            })
            .catch((error)=>{
                alert(error)
            })
            // alert(ref)
            
    }


}
    return (
        <div className='incoming-file-upload'>
            <div className='incoming-header'>
                <h4>Upload Minuted file</h4>
            </div>
            <form action="" className='file-form' encType='multipart/form-data'>

                <div className='file-upload-input'>
                <input type="text" name="subject" value={form.subject} onChange={onUpdateForm} className='upload-field' placeholder='Enter File Subject' />
                {arr.map((item, i) => {
                            return (
                                <div className='add-reference'>
                                    <FontAwesomeIcon icon={faCirclePlus} className='add-reference-icon' size='2x' onClick={addInput} />
                                    <input className='input-field add-reference' id={i}   reference={item.reference} onChange={handleChange} placeholder='File Reference' />
                                </div>
                            );
                        })}
                    <input type="file" name='upload' onChange={onUpdate} className='file-input' />
                </div>
                <div className='file-submit-button' onClick={onSubmit}>
                    <p className='incoming-submit'>Upload</p>
                
            </div>

            </form>
        </div>
    )
}
