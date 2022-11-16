import React, { useState } from 'react'
import axios from 'axios';
export const FileDiary = () => {
  const ADD_TRANSIT_API_URL = "https://phma-rmu.herokuapp.com/post-diary";
  const getData = localStorage.getItem("user");
  const parsedData = JSON.parse(getData);
  const [form, setForm] = useState({
    reference: "",
    fileTitle: "",
    department: "",
    unit: "",
    previousFileNumber: ""
  })

  const onUpdateForm = e => {
    const newFormState = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(newFormState)
  }

  const user = ({
    id: parsedData.userId,
    firstName: parsedData.firstName,
    email: parsedData.email

})

const submit = { ...form, appUser: { ...user }}
const finalSubmit = JSON.stringify(submit, null, 2)

  const onSubmit = () => {
    const checkReference = form.reference;
    const checkfileTitle = form.fileTitle;
    const checkDepartment = form.department;
    const checkUnit = form.unit;
    const checkPrevious = form.previousFileNumber;

    let referenceLength;
    let titleLength;
    let departmentLength;
    let unitLength;
    let previousLength;

    if (checkReference.trim().length == 0) {
      referenceLength = false;
      alert("Please Enter File Reference Number")
    } else {

      referenceLength = true;
    }

    if (referenceLength) {
      if (checkfileTitle.trim().length == 0) {
        titleLength = false;
        alert("Please Enter File Title")
      } else {
        titleLength = true;
      }
    }

    if (titleLength) {
      if (checkDepartment.trim().length == 0) {
        departmentLength = false;
        alert("Please Select Department")
      } else {
        departmentLength = true;
      }
    }

    if (departmentLength) {
      if (checkUnit.trim().length == 0) {
        unitLength = false;
        alert("Please Select Unit ")
      } else {
        unitLength = true;
      }
    }

    if (unitLength) {
      if (checkPrevious.trim().length == 0) {
        previousLength = false;
        alert("Please Enter Previous File Number")
      } else {
        previousLength = true;
      }
    }

    if (referenceLength && titleLength && departmentLength && unitLength && previousLength) {
      axios
          .post(ADD_TRANSIT_API_URL,finalSubmit,{headers: {
            "Content-Type": "application/json"}
        })
        .then((response)=>{
            alert(response.data.body)
            setForm({
              reference: "",
              fileTitle: "",
              department: "",
              unit: "",
              previousFileNumber: ""
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
        <h4>File Diary</h4>
      </div>
      <div className='incoming-form'>

        <div className='incoming-form-input'>
          <div className='form-input'>
            <input type="text" name='reference' value={form.reference} onChange={onUpdateForm} className='input-field' placeholder='File Reference Number' />
            <input type="text" name='fileTitle' value={form.fileTitle} onChange={onUpdateForm} className='input-field' placeholder="File Title" />

            <select name="department" id="" className='input-field select-diary' value={form.department} onChange={onUpdateForm}>
              <option value="" disabled selected>--Select Department</option>
              <option value="Agriculture">Agriculture</option>

              <option value="Audit Management">Audit Management</option>
              <option value="Birth And Death">Birth And Death</option>
              <option value="Budget And Rating">Budget And Rating</option>
              <option value="Central Administration">Central Administration</option>
              <option value="Education, Youth And Sport">Education, Youth And Sport</option>
              <option value="Financial Management">Financial Management</option>
              <option value="Housing">Housing</option>
              <option value="Human Resource Management">Human Resource Management</option>
              <option value="Legal">Legal</option>
              <option value="Natural Resources Conservation">Natural Resources Conservation</option>
              <option value="Physical Planning">Physical Planning</option>
              <option value="Roads">Roads</option>
              <option value="Social Welfare And Community Development">Social Welfare And Community Development</option>
              <option value="Statistics">Statistics</option>
              <option value="Trade, Industry And Tourism">Trade, Industry And Tourism</option>
              <option value="Works">Works</option>
            </select>


            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Agriculture" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Agric Extension">Agric Extension</option>
              <option value="Animal Health And Production">Animal Health And Production</option>
              <option value="Crop Services">Crop Services</option>
              <option value="Women/Youth in Agric">Women/Youth in Agric</option>
            </select>



            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Audit Management" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="External Audit">External Audit</option>
              <option value="Internal Audit">Internal Audit</option>
            </select>


            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Birth And Death" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Birth Registration">Birth Registration</option>
              <option value="Death Registration">Death Registration</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Budget And Rating" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activities</option>
              <option value="Budget Management">Budget Management</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Central Administration" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Administration">Administration</option>
              <option value="Assembly Affairs">Assembly Affairs</option>
              <option value="Estate And Transport Management">Estate And Transport Management</option>
              <option value="Logistics And Security Management">Logistics And Security Management</option>
              <option value="MIS">MIS</option>
              <option value="Planning">Planning</option>
              <option value="Procurement And Stores">Procurement And Stores</option>
              <option value="Records Management">Records Management</option>
              <option value="Other Admin Activities">Other Admin Activities</option>
            </select>


            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Education, Youth And Sport" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Education">Education</option>
              <option value="Education Committee">Education Committee</option>
              <option value="Library">Library</option>
              <option value="Youth">Youth</option>
              <option value="Sport">Sport</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Financial Management" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Levies">Levies</option>
              <option value="Revenue Mobilization">Revenue Mobilization</option>
              <option value="Treasury">Treasury</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Housing" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Housing Admin">Housing Admin</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Human Resource Management" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Personnel Management">Personnel Management</option>
              <option value="Personnel Welfare">Personnel Welfare</option>
              <option value="Training And Development">Training And Development</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Legal" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Legal Advice">Legal Advice</option>
              <option value="Litigation Management">Litigation Management</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Natural Resources Conservation" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Forestry">Forestry</option>
              <option value="Natural Resource Entity">Natural Resource Entity</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Physical Planning" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="P & G">P & G</option>
              <option value="T & CP">T & CP</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Roads" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Road Contract Management">Road Contract Management</option>
              <option value="Road Maintenance">Road Maintenance</option>
              <option value="Road Traffic Infrastructure">Road Traffic Infrastructure</option>
            </select>


            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Social Welfare And Community Development" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Community Development">Community Development</option>
              <option value="Disaster Prevention">Disaster Prevention</option>
              <option value="Environmental Health">Environmental Health</option>
              <option value="Health Administration">Health Administration</option>
              <option value="Social Welfare">Social Welfare</option>
              <option value="Waste Management">Waste Management</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Statistics" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Data Entry Analysis">Data Entry Analysis</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Reports">Reports</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Trade, Industry And Tourism" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Cooperatives">Co-operatives</option>
              <option value="Cottage">Cottage</option>
              <option value="Tourism">Tourism</option>
            </select>

            <select name="unit" value={form.unit} onChange={onUpdateForm} id={form.department == "Works" ? 'show-select' : 'hide-arrow'} className='input-field select-diary'>
              <option value="" disabled selected>--Select activity</option>
              <option value="Building">Building</option>
              <option value="Water">Water</option>
            </select>

            <input type="text" name='previousFileNumber' value={form.previousFileNumber} onChange={onUpdateForm} className='input-field' placeholder='Previous File Number' />
            <div className='form-submit-button' onClick={onSubmit}>
              <p className='incoming-submit'>Submit</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
