import React, { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Footer } from './Footer'

export const YearOutgoing = () => {

  const [main, setMain] = useState(true);
  const [click, setClick] = useState(false);
  const [viewSearch, setSearch] = useState([]);
  const finalView = JSON.stringify(viewSearch, null, 2)
  const final = JSON.parse(finalView)



  const VIEW_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/out-year"
  const [view, setView] = useState([])
  const diaryView = JSON.stringify(view, null, 2)
  const setDiary = JSON.parse(diaryView)


  const getData = localStorage.getItem("user");
  const parsedData = JSON.parse(getData);

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

  useEffect(() => {
    axios.get(VIEW_OUTGOING_API_URL)
      .then(response => {
        setView(response.data);
      })
  }, []);

  const documentClick = (file_name) => {
    axios
      .get(`https://phma-rmu.herokuapp.com/upload/${file_name}`, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        window.open(`https://phma-rmu.herokuapp.com/upload/${file_name}`)
      })
  }

  console.log(setDiary)
  const onSubmit = () => {
    setMain(false);
    setClick(true);
    axios
      .get(`https://phma-rmu.herokuapp.com/out-reference/${form.search}/`)
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
            <div className='export-csv'>Export to Excel</div>
          </div>
          {main &&
            <table className='table-width'>
              <tr>
                <th>Reference Number</th>
                <th>Date Received For Dispatch</th>
                <th>Date Dispatched</th>
                <th>Subject</th>
                <th>Addressee</th>
                <th>Mode Of Dispatch</th>
                <th>Officer In Charge</th>

              </tr>
              {setDiary.map((details, i) => {

                return (
                  <tr key={i} className="side-nav-item" onClick={() => documentClick(details.documents.name)}>

                    <td className='table-data'>{details.reference}</td>
                    <td className='table-data'>{details.dateReceivedForDispatch}</td>
                    <td className='table-data'>{details.dateDispatched}</td>
                    <td className='table-data'>{details.subject}</td>
                    <td className='table-data'></td>
                    <td className='table-data'>{details.modeOfDispatch}</td>
                    <td className='table-data'>{details.appUser.firstName}</td>
                  </tr>
                );
              })}
            </table>}

          {click &&
            <table className='table-width'>
              <tr>
                <th>Reference Number</th>
                <th>Date Received For Dispatch</th>
                <th>Date Dispatched</th>
                <th>Subject</th>
                <th>Addressee</th>
                <th>Mode Of Dispatch</th>
                <th>Officer In Charge</th>

              </tr>

              {final.map((details, i) => {
                return (
                  <tr key={i} className="side-nav-item">
                    <td className='table-data'>{details.reference}</td>
                    <td className='table-data'>{details.dateReceivedForDispatch}</td>
                    <td className='table-data'>{details.dateDispatched}</td>
                    <td className='table-data'>{details.subject}</td>
                    <td className='table-data'></td>
                    <td className='table-data'>{details.modeOfDispatch}</td>
                    <td className='table-data'>{details.appUser.firstName}</td>
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
