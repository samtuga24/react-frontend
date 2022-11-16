import React from 'react'
import { Navigation } from './Navigation'
import {useLocation} from 'react-router-dom'


export const DiarySearch = () => {
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);
    const location = useLocation();
    const data = location.state;
    console.log(data)
  return (
    <div className='outgoing-wrapper'>
            <Navigation firstName={parsedData.firstName}/>
            <div className='view-outgoing'>
                <div className='outgoing-table'>
                    <table className='table-width'>
                        <tr>
                            <th>File Reference Number</th>
                            <th>Date Opened</th>
                            <th>File Title</th>
                            <th>Department</th>
                            <th>Unit</th>
                            <th>Previous Reference Number</th>
                            
                        </tr>
                        <tr>
                            <td className='table-data'></td>
                            <td className='table-data'></td>
                            <td className='table-data'></td>
                            <td className='table-data'></td>
                            <td className='table-data'></td>
                            <td className='table-data'></td>
                            
                        </tr>
                    </table>
                </div>
            </div>
        </div>
  )
}
