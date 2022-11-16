import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigation } from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Footer } from './Footer'

export const YearIncoming = () => {
    const [main, setMain] = useState(true);
    const [click, setClick] = useState(false);
    const [viewSearch, setSearch] = useState([]);

    const finalView = JSON.stringify(viewSearch, null, 2)
    const final = JSON.parse(finalView)

    const VIEW_INCOMIN_API_URL = "https://phma-rmu.herokuapp.com/find-year"
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
        axios.get(VIEW_INCOMIN_API_URL)
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


    const onSubmit = () => {
        setMain(false);
        setClick(true);
        axios
            .get(`https://phma-rmu.herokuapp.com/view-reference/${form.search}/`)
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
                                <th>Date Of Letter</th>
                                <th>Date Received</th>
                                <th>From Whom Received</th>
                                <th>Institution's Reference</th>
                                <th>Subject</th>
                                <th>Officer In charge</th>

                            </tr>
                            {setDiary.map((details, i) => {

                                return (
                                    <tr key={i} className="side-nav-item" onClick={() => documentClick(details.documents.name)}>
                                        <td className='table-data'>{details.reference}</td>
                                        <td className='table-data'>{details.dateOfLetter}</td>
                                        <td className='table-data'>{details.dateReceived}</td>
                                        <td className='table-data'>{details.fromWhomReceived}</td>
                                        <td className='table-data'>{details.institutionsReference}</td>
                                        <td className='table-data'>{details.subject}</td>
                                        <td className='table-data'>{details.appUser.firstName}</td>
                                    </tr>
                                );
                            })}
                        </table>}



                    {click &&
                        <table className='table-width'>
                            <tr>
                                <th>Reference Number</th>
                                <th>Date Of Letter</th>
                                <th>Date Received</th>
                                <th>From Whom Received</th>
                                <th>Institution's Reference</th>
                                <th>Subject</th>
                                <th>Officer In charge</th>

                            </tr>
                            {final.map((details, i) => {
                                return (
                                    <tr key={i} className="side-nav-item">
                                        <td className='table-data'>{details.reference}</td>
                                        <td className='table-data'>{details.dateOfLetter}</td>
                                        <td className='table-data'>{details.dateReceived}</td>
                                        <td className='table-data'>{details.fromWhomReceived}</td>
                                        <td className='table-data'>{details.institutionsReference}</td>
                                        <td className='table-data'>{details.subject}</td>
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
