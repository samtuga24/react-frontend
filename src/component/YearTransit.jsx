import React, { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'
export const YearTransit = () => {
    const [main, setMain] = useState(true);
    const [click, setClick] = useState(false);
    const [viewSearch, setSearch] = useState([]);

    const diary = JSON.stringify(viewSearch, null, 2)
    const finalDiary = JSON.parse(diary)
    const [view, setView] = useState([])
    const transitView = JSON.stringify(view, null, 2)
    const setTransit = JSON.parse(transitView)
    const VIEW_TRANSIT_API_URL = "https://phma-rmu.herokuapp.com/transit-year"

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
        axios.get(VIEW_TRANSIT_API_URL)
            .then(response => {
                setView(response.data);

            })
    }, []);

    const onSubmit = () => {
        setMain(false);
        setClick(true);
        axios
            .get(`https://phma-rmu.herokuapp.com/transit-reference/${form.search}/`)
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
                                <th>File Reference Number</th>
                                <th>File Title</th>
                                <th>Sent To</th>
                                <th>Date</th>
                                <th>Remarks</th>
                                <th>Officer In Charge</th>
                                <th>Signature</th>
                            </tr>

                            {setTransit.map((details, i) => {

                                return (
                                    <tr key={i}>
                                        <td className='table-data'>{details.reference}</td>
                                        <td className='table-data'>{details.fileTitle}</td>
                                        <td className='table-data'>{details.sentTo}</td>
                                        <td className='table-data'>{details.date}</td>
                                        <td className='table-data'>{details.remarks}</td>
                                        <td className='table-data'>{details.appUser.firstName}</td>
                                        <td className='table-data'>{details.signature}</td>
                                    </tr>
                                );
                            })}

                        </table>}

                    {click &&
                        <table className='table-width'>

                            <tr>
                                <th>File Reference Number</th>
                                <th>File Title</th>
                                <th>Sent To</th>
                                <th>Date</th>
                                <th>Remarks</th>
                                <th>Officer In Charge</th>
                                <th>Signature</th>
                            </tr>

                            {finalDiary.map((transit, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='table-data'>{transit.reference}</td>
                                        <td className='table-data'>{transit.fileTitle}</td>
                                        <td className='table-data'>{transit.sentTo}</td>
                                        <td className='table-data'>{transit.date}</td>
                                        <td className='table-data'>{transit.remarks}</td>
                                        <td className='table-data'>{transit.appUser.firstName}</td>
                                        <td className='table-data'>{transit.signature}</td>
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
