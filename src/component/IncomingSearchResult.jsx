import React from 'react'
import { Navigation } from './Navigation'

export const IncomingSearchResult = () => {
  return (
    <div className='outgoing-wrapper'>
    <Navigation />
    <div className='view-outgoing'>
        <div className='outgoing-table'>
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
                <tr onClick={()=>alert("hello world")}>
                    <td className='table-data'>jdskjvk</td>
                    <td className='table-data'>jdskjvk</td>
                    <td className='table-data'>jdskjvk</td>
                    <td className='table-data'>jdskjvk</td>
                    <td className='table-data'>jdskjvk</td>
                    <td className='table-data'>jdskjvk</td>
                </tr>
            </table>
        </div>
    </div>
</div>
  )
}
