import React, { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'
import { Footer } from './Footer'
export const ViewOutgoing = () => {

    const [main, setMain] = useState(true);
    const [click, setClick] = useState(false);
    const [viewSearch, setSearch] = useState([]);
    const finalView = JSON.stringify(viewSearch, null, 2)
    const [addresse, setAddressee] = useState([]);
    const address = JSON.stringify(addresse,null,2);
    const finalAdd = JSON.parse(address)
    const final = JSON.parse(finalView)



    const VIEW_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/view-outgoing"
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
                setView(response.data,null,2);
            
                console.log("addressee",response.data)
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
        var str = form.search.replace(/\\|\//g,'')
        axios
            .get(`https://phma-rmu.herokuapp.com/out-reference/${str}/`)
            .then(response => {
                setSearch(response.data,null,2)
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
                        <ReactHtmlTableToExcel
                            className="export-csv"
                            table="outgoing-table"
                            filename="outgoing-correspondence"
                            sheet="Sheet"
                            buttonText="Export to Excel"

                        />
                    </div>
                    {main &&
                        <table className='table-width' id='outgoing-table'>
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
                                
                                // {details.addressee.map((add,i)=>{
                                    return(
                                        <tr key={i} className="side-nav-item" onClick={() => documentClick(details.documents.name)}>

                                        <td className='table-data'>{details.reference}</td>
                                        <td className='table-data'>{details.dateReceivedForDispatch}</td>
                                        <td className='table-data'>{details.dateDispatched}</td>
                                        <td className='table-data'>{details.subject}</td>
                                        <td className='table-data tab-add'>
                                        {details.addressee.map((items,i)=>{
                                            return(
                                                <tr className='address-rows'>{items.address}</tr>
                                            );
                                        })}
                                        </td>
                                        <td className='table-data'>{details.modeOfDispatch}</td>
                                        <td className='table-data'>{details.appUser.firstName}</td>
                                    </tr>
                                    );
                                })}
                            {/* })} */}
                        </table>}

                    {click &&
                        <table className='table-width' id='outgoing-table'>
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
                                        <td className='table-data tab-add'>
                                        {details.addressee.map((items,i)=>{
                                            return(
                                                <tr className='address-rows'>{items.address}</tr>
                                            );
                                        })}
                                        </td>
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
