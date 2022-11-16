import React, { useEffect } from 'react'
import axios from 'axios'
import { Navigation } from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Footer } from './Footer'
export const YearDiary = () => {
  const [main, setMain] = useState(true);
  const [click, setClick] = useState(false);
  const [viewSearch, setSearch] = useState([]);
  const diary = JSON.stringify(viewSearch, null, 2)
  const finalDiary = JSON.parse(diary)


  const [form, setForm] = useState({
    search: "",
  });

  const onUpdateForm = e => {
    const newFormState = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(newFormState);

  }
  const [view, setView] = useState([])
  const diaryView = JSON.stringify(view, null, 2)
  const setDiary = JSON.parse(diaryView)
  const VIEW_DIARY_API_URL = "https://phma-rmu.herokuapp.com/diary-find-year"

  const getData = localStorage.getItem("user");
  const parsedData = JSON.parse(getData);


  useEffect(() => {
    axios.get(VIEW_DIARY_API_URL)
      .then(response => {
        setView(response.data);

      })
  }, []);

  const onSubmit = () => {
    setMain(false);
    setClick(true);
    axios
      .get(`https://phma-rmu.herokuapp.com/reference/${form.search}/`)
      .then(response => {
        setSearch(response.data)
      })
  }

  return (
    <div className='outgoing-wrapper'>
      <Navigation firstName={parsedData.firstName} />
      <div className='view-outgoing'>
        <div className='outgoing-table'>
          <div className='export-button'>
            <div className='search-file'>
              <FontAwesomeIcon className='font-awesome' icon={faMagnifyingGlass} />
              <input type="text" name="search" value={form.search} onChange={onUpdateForm} className='search-field' placeholder='Search for file' />
              <div className='search-button' onClick={onSubmit}>Search</div>

            </div>
            <div className='export-csv' onClick={() => alert("export to excel")}>Export to Excel</div>
          </div>
          {main &&
            <table className='table-width'>
              <tr>
                <th>File Reference Number</th>
                <th>Date Opened</th>
                <th>File Title</th>
                <th>Department</th>
                <th>Unit</th>
                <th>Previous Reference Number</th>
              </tr>
              {setDiary.map((details, i) => {
                return (
                  <tr key={i}>
                    <td className='table-data'>{details.reference}</td>
                    <td className='table-data'>{details.dateOpened}</td>
                    <td className='table-data'>{details.fileTitle}</td>
                    <td className='table-data'>{details.department.name}</td>
                    <td className='table-data'>{details.unit.name}</td>
                    <td className='table-data'>{details.previousFileNumber}</td>
                  </tr>
                );
              })}

            </table>}

          {click &&
            <table className='table-width'>
              <tr>
                <th>File Reference Number</th>
                <th>Date Opened</th>
                <th>File Title</th>
                <th>Department</th>
                <th>Unit</th>
                <th>Previous Reference Number</th>

              </tr>
              {finalDiary.map((searchDetails, i) => {
                return (
                  <tr key={i}>
                    <td className='table-data'>{searchDetails.reference}</td>
                    <td className='table-data'>{searchDetails.dateOpened}</td>
                    <td className='table-data'>{searchDetails.fileTitle}</td>
                    <td className='table-data'>{searchDetails.department.name}</td>
                    <td className='table-data'>{searchDetails.unit.name}</td>
                    <td className='table-data'>{searchDetails.previousFileNumber}</td>

                  </tr>

                );
              })}
            </table>}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
