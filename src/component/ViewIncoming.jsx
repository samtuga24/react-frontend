import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigation } from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import { Footer } from './Footer';
export const ViewIncoming = () => {

    const [main, setMain] = useState(true);
    const [click, setClick] = useState(false);
    const [viewSearch, setSearch] = useState([]);

    const finalView = JSON.stringify(viewSearch, null, 2)
    const final = JSON.parse(finalView)

    const VIEW_INCOMIN_API_URL = "https://phma-rmu.herokuapp.com/view-incoming"
    const SEARCH_INCOMIN_API_URL = "https://phma-rmu.herokuapp.com/view"
    const [view, setView] = useState([])
    const diaryView = JSON.stringify(view, null, 2)
    const setDiary = JSON.parse(diaryView)
    console.log(setDiary)
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);

    const [form, setForm] = useState({
        reference: "",
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
                setView(response.data, null, 2);

            }).catch((error)=>{
                console.log(error)
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

    // console.log(final)

    const onSubmit = () => {
        setMain(false);
        setClick(true);
        var str = form.reference.replace(/\\|\//g,'')
        axios
            .get(`https://phma-rmu.herokuapp.com/view/${str}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                setSearch(response.data,null,2)

            }).catch((error)=>{
                console.log(error)
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
                            <input type="text" name="reference" value={form.reference} onChange={onUpdateForm} className='search-field' placeholder='Search for file' />
                            <div className='search-button' onClick={onSubmit}>Search</div>

                        </div>
                        <ReactHtmlTableToExcel
                            className="export-csv"
                            table="incoming-table"
                            filename="incoming-correspondence"
                            sheet="Sheet"
                            buttonText="Export to Excel"

                        />
                    </div>
                    {main &&
                        <table className='table-width' id='incoming-table'>
                            <tr>
                                <th>Reference Number</th>
                                <th>Date Of Letter</th>
                                <th>Date Received</th>
                                <th>From Whom Received</th>
                                <th>Institution's Reference</th>
                                <th>Subject</th>
                                <th>Officer In charge</th>
                                <th>File Title</th>
                                <th>Department</th>
                                <th>Activity</th>

                            </tr>
                            {setDiary.map((details, i) => {

                                return (
                                    <>
                                    {details.fileDiary.map((items,i)=>{
                                        return(
                                            <tr key={i} className="side-nav-item" onClick={() => documentClick(details.documents.name)}>
                                            <td className='table-data'>{items.reference}</td>
                                            <td className='table-data'>{details.dateOfLetter}</td>
                                            <td className='table-data'>{details.dateReceived}</td>
                                            <td className='table-data'>{details.fromWhomReceived}</td>
                                            <td className='table-data'>{details.institutionsReference}</td>
                                            <td className='table-data'>{details.subject}</td>
                                            <td className='table-data'>{details.appUser.firstName}</td>
                                            <td className='table-data'>{items.fileTitle}</td>
                                            <td className='table-data'>{items.department.name}</td>
                                            <td className='table-data'>{items.unit.name}</td>
                                        </tr>
                                        );
                                    })}

                                    </>
                                );
                            })}
                        </table>}



                    {click &&
                        <table className='table-width' id='incoming-table'>
                            <tr>
                                <th>Reference Number</th>
                                <th>Date Of Letter</th>
                                <th>Date Received</th>
                                <th>From Whom Received</th>
                                <th>Institution's Reference</th>
                                <th>Subject</th>
                                <th>Officer In charge</th>
                                <th>File Title</th>
                                <th>Department</th>
                                <th>Activity</th>

                            </tr>
                            {final.map((details, i) => {
                                
                                return (
                                    <>
                                    {details.fileDiary.map((items,i)=>{
                                        return(
                                            <tr key={i} className="side-nav-item" onClick={() => documentClick(details.documents.name)}>
                                            <td className='table-data'>{details.reference}</td>
                                            <td className='table-data'>{details.dateOfLetter}</td>
                                            <td className='table-data'>{details.dateReceived}</td>
                                            <td className='table-data'>{details.fromWhomReceived}</td>
                                            <td className='table-data'>{details.institutionsReference}</td>
                                            <td className='table-data'>{details.subject}</td>
                                            <td className='table-data'>{details.appUser.firstName}</td>
                                            <td className='table-data'>{items.fileTitle}</td>
                                            <td className='table-data'>{items.department.name}</td>
                                            <td className='table-data'>{items.unit.name}</td>
                                        </tr>
                                        );
                                    })}

                                    </>
                                );
                            })}
                        </table>}
                </div>
            </div>
            <Footer />
        </div>
    )
}
