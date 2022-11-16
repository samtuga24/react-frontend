import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Footer } from './Footer';
export const Report = () => {
    const[diaryCount, setDiary] = useState(0);
    const[transitCount, setTransit] = useState(0);
    const[incommingCount, setIncoming] = useState(0);
    const[outgoingCount, setOutgoing] = useState(0);
    const COUNT_DIARY_API_URL = "https://phma-rmu.herokuapp.com/diary-count-year"
    const COUNT_TRANSIT_API_URL = "https://phma-rmu.herokuapp.com/count-year-transit"
    const COUNT_INCOMING_API_URL = "https://phma-rmu.herokuapp.com/count-year"
    const COUNT_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/count-year-out"

    useEffect(() => {
        axios.get(COUNT_DIARY_API_URL)
        .then(response => {
            setDiary(response.data);
            
        })
      },[]);

      useEffect(() => {
        axios.get(COUNT_TRANSIT_API_URL)
        .then(response => {
            setTransit(response.data);
            
        })
      },[]);

      useEffect(() => {
        axios.get(COUNT_INCOMING_API_URL)
        .then(response => {
            setIncoming(response.data);
            
        })
      },[]);

      useEffect(() => {
        axios.get(COUNT_OUTGOING_API_URL)
        .then(response => {
            setOutgoing(response.data);
            
        })
      },[]);
    const [quarter, setQuarter] = useState(false);

    const onclick = () => {
        setQuarter(!quarter)
    }

    return (
        <div className='report-wrapper'>
            <div className='report-nav'>
                <div className='annual-report'>
                    <Link to='../annual' className='report'>
                        <div className='annual-button'>
                            <p>Annual Report</p>
                        </div>
                    </Link>
                </div>
                <div className='quarterly-report'>
                    <div className='quarterly-button' onClick={onclick}>
                        <p>Quarterly Report</p>
                    </div>
                    {quarter &&
                        <div className={quarter ? 'quarter-list' : 'hide-quarter'}>
                            <Link to='../quarter' className='report'><div className='quarter'>1st Quarter</div></Link>
                            <Link to='../second-quarter' className='report'><div className='quarter'>2nd Quarter</div></Link>
                            <Link to='../third-quarter' className='report'><div className='quarter'>3rd Quarter</div></Link>
                            <Link to='../fourth-quarter' className='report'><div className='quarter'>4th Quarter</div></Link>
                        </div>
                    }
                </div>
            </div>

            <div className='report-home-wrap'>
                <div className='home-content-wrap'>
                    <div className='row-1'>
                        <Link to='../y-outgoing' className='card-link'>
                            <div className='card'>
                                <p>Outgoing Correspondence</p>
                                <p>({outgoingCount})</p>
                            </div>
                        </Link>
                        <Link to='../y-incoming' className='card-link'>
                            <div className='card'>

                                <p>Incoming Correspondence</p>
                                <p>({incommingCount})</p>
                            </div>
                        </Link>

                    </div>
                    <div className='row-2'>
                        <Link to='../y-transit' className='card-link'>
                            <div className='card'>
                                <p>File Transit Sheet</p>
                                <p>({transitCount})</p>
                            </div>
                        </Link>
                        <Link to='../y-diary' className='card-link'>
                            <div className='card'>
                                <p>File Diary</p>
                                <p>({diaryCount})</p>
                            </div>
                        </Link>

                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}
