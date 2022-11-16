import React, { useState } from 'react'
import { AddUser } from './AddUser';
import { Footer } from './Footer'
import { Home } from './Home';
import { Incoming } from './Incoming';
import { Navigation } from './Navigation'
import { Outgoing } from './Outgoing';
import { Report } from './Report';
import { TransitSheet } from './TransitSheet';
import { Link } from 'react-router-dom'

import { faCloudArrowUp, faFilePen, faAngleRight, faAngleDown, faUserPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileUpload } from './FileUpload';
import { FileDiary } from './FileDiary';
import { FileOutUpload } from './FileOutUpload';
import { FileMinUpload } from './FileMinUpload';
import { ViewUsers } from './ViewUsers';
import { ReturnTransit } from './ReturnTransit';

export const UserDash = () => {
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);

    const [home, setHome] = useState(true);
    const [incoming, setIncoming] = useState(false);
    const [outgoing, setOutgoing] = useState(false);
    const [diary, setDiary] = useState(false);
    const [file, setFile] = useState(false);
    const [returnTrans, setReturn] = useState(false);
    const [report, setReport] = useState(false);
    const [addUser, SetUser] = useState(false);
    const [arrow, setArrow] = useState(false);
    const [down, setDown] = useState(false);
    const [out, setOut] = useState(false);
    const [outArrow, setOutArrow] = useState(false);
    const [trans, setTrans] = useState(false);
    const [transArrow, setTranstArrow] = useState(false);
    const [infile, setInfile] = useState(false);
    const [outfile, setOutFile] = useState(false);
    const [minfile, setMinFile] = useState(false);
    const [manage, setManage] = useState(false);
    const [manageOut, setManageOut] = useState(false);
    const [view, setView] = useState(false);

    const arrowClick = () => {
        setArrow(!arrow);
        setDown(!down);
    }

    const outArrowClick = () => {
        setOut(!out);
        setOutArrow(!outArrow);
    }

    const transArrowClick = () => {
        setTrans(!trans);
        setTranstArrow(!transArrow);
    }


    const manageClick = () => {
        setManage(!manage);
        setManageOut(!manageOut);
    }


    const homeClick = () => {
        setHome(true);
        setIncoming(false);
        setOutgoing(false);
        setFile(false);
        setDiary(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const inClick = () => {
        setHome(false);
        setIncoming(true);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const outClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(true);
        setFile(false);
        setDiary(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const fileClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setFile(true);
        setReport(false);
        setDiary(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const reportClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(true);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const returnClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReturn(true);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
    }

    const userClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(false);
        SetUser(true);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
    }

    const infileClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(false);
        SetUser(false);
        setInfile(true);
        setOutFile(false);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const outfileClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(true);
        setMinFile(false);
        setView(false);
        setReturn(false);
    }

    const minfileClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(true);
        setView(false);
        setReturn(false);
    }

    const diaryClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(true);
        setFile(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(false);
    }

    const viewClick = () => {
        setHome(false);
        setIncoming(false);
        setOutgoing(false);
        setDiary(false);
        setFile(false);
        setReport(false);
        SetUser(false);
        setInfile(false);
        setOutFile(false);
        setMinFile(false);
        setView(true);
    }

    const logout = () => {
        localStorage.removeItem("user");
    };

    return (
        <div className='dashboard-wrapper'>
            <Navigation firstName={parsedData.firstName} />
            <div className='panel-wrap'>
                <div className='side-nav'>
                    <div className='side-nav-item' onClick={homeClick}>
                        <p>Home</p>
                    </div>

                    <div className='side-nav-item incoming-icon' onClick={arrowClick}>
                        {arrow && <FontAwesomeIcon icon={faAngleDown} className='arrow-icon' size='lg' />}


                        <FontAwesomeIcon icon={faAngleRight} className='arrow-icon' id={down ? 'hide-arrow' : null} size='lg' />
                        <p>Incoming Correspondence</p>
                    </div>

                    {arrow &&
                        <div className='upload-wrap'>
                            <div className='upload-minute' onClick={inClick}>
                                <FontAwesomeIcon icon={faFilePen} className='up-arrow' size='lg' />
                                <p className='file-text'>Incoming Form</p>
                            </div>
                            <div className='upload-minute' onClick={infileClick}>
                                <FontAwesomeIcon icon={faCloudArrowUp} className='up-arrow' size='lg' />
                                <p className='file-text'>Upload Incoming File</p>
                            </div>

                            <div className='upload-minute' onClick={minfileClick}>
                                <FontAwesomeIcon icon={faCloudArrowUp} className='up-arrow' size='lg' />
                                <p className='file-text'>Upload Minuted File</p>
                            </div>
                        </div>
                    }

                    <div className='side-nav-item incoming-icon' onClick={outArrowClick}>
                        {out && <FontAwesomeIcon icon={faAngleDown} className='arrow-icon' size='lg' />}
                        <FontAwesomeIcon icon={faAngleRight} className='arrow-icon' id={out ? 'hide-arrow' : null} size='lg' />
                        <p>Outgoing Correspondence</p>
                    </div>

                    {out &&
                        <div className='upload-wrap'>
                            <div className='upload-minute' onClick={outClick}>
                                <FontAwesomeIcon icon={faFilePen} className='up-arrow' size='lg' />
                                <p className='file-text'>Outgoing Form</p>
                            </div>
                            <div className='upload-minute' onClick={outfileClick}>
                                <FontAwesomeIcon icon={faCloudArrowUp} className='up-arrow' size='lg' />
                                <p className='file-text'>Upload Outgoing File</p>
                            </div>
                        </div>
                    }

                    <div className='side-nav-item incoming-icon' onClick={transArrowClick}>
                    {trans&&<FontAwesomeIcon icon={faAngleDown} className='arrow-icon' size='lg' />}
                    <FontAwesomeIcon icon={faAngleRight} className='arrow-icon' id={trans ? 'hide-arrow' : null} size='lg' />
                        <p>File Transit</p>
                    </div>

                    {trans &&
                        <div className='upload-wrap'>
                            <div className='upload-minute' onClick={fileClick}>
                                <FontAwesomeIcon icon={faFilePen} className='up-arrow' size='lg' />
                                <p className='file-text'>File Transit Sheet</p>
                            </div>
                            <div className='upload-minute' onClick={returnClick}>
                                <FontAwesomeIcon icon={faFilePen} className='up-arrow' size='lg' />
                                <p className='file-text'>Return Form</p>
                            </div>
                        </div>
                    }

                    {/* <div className='side-nav-item' onClick={diaryClick}>
                        <p>File Diary</p>
                    </div> */}

                    <div className='side-nav-item' onClick={reportClick}>
                        <p>Report</p>
                    </div>

                    <Link to="../login" className='nav-link'>
                        <div className='side-nav-item' onClick={logout}>
                            <p>Logout</p>
                        </div>
                    </Link>
                </div>
                <div className='display-nav-content'>
                    {home ? <Home /> : null}
                    {incoming ? <Incoming /> : null}
                    {infile ? <FileUpload /> : null}
                    {outfile ? <FileOutUpload /> : null}
                    {minfile ? <FileMinUpload /> : null}
                    {outgoing ? <Outgoing /> : null}
                    {file ? <TransitSheet /> : null}
                    {returnTrans ? <ReturnTransit /> : null}
                    {diary ? <FileDiary /> : null}
                    {report ? <Report /> : null}
                    {addUser ? <AddUser /> : null}
                    {view ? <ViewUsers /> : null}
                </div>
            </div>
            <Footer />
        </div>
    )

}
