import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
export const Home = () => {
    const[diaryCount, setDiary] = useState(0);
    const[transitCount, setTransit] = useState(0);
    const[incommingCount, setIncoming] = useState(0);
    const[outgoingCount, setOutgoing] = useState(0);
    const COUNT_DIARY_API_URL = "https://phma-rmu.herokuapp.com/diary-count"
    const COUNT_TRANSIT_API_URL = "https://phma-rmu.herokuapp.com/count-transit"
    const COUNT_INCOMING_API_URL = "https://phma-rmu.herokuapp.com/count"
    const COUNT_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/count-out"

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
    return (
        <div className='home-wrap'>
            <div className='home-content-wrap'>
                <div className='row-1'>
                    <Link to='../outgoing' className='card-link'>
                        <div className='card'>
                            <p>Outgoing Correspondence</p>
                            <p>({outgoingCount})</p>
                        </div>
                    </Link>
                    <Link to='../incoming' className='card-link'>
                        <div className='card'>

                            <p>Incoming Correspondence</p>
                            <p>({incommingCount})</p>
                        </div>
                    </Link>

                </div>
                <div className='row-2'>
                    <Link to='../transit' className='card-link'>
                        <div className='card'>
                            <p>File Transit Sheet</p>
                            <p>({transitCount})</p>
                        </div>
                    </Link>
                    <Link to='../diary' className='card-link'>
                        <div className='card'>
                            <p>File Diary</p>
                            <p>({diaryCount})</p>
                        </div>
                    </Link>

                </div>

            </div>
        </div>
    )
}
