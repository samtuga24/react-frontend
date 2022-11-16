import React from 'react'
import { Navigation } from './Navigation'

export const OutgoingSearchResult = () => {
    return (
        <div className='outgoing-wrapper'>
            <Navigation />
            <div className='view-outgoing'>
                <div className='outgoing-table'>
                    <table className='table-width'>
                        <tr>
                            <th>Reference Number</th>
                            <th>Date Received For Dispatch</th>
                            <th>Date Dispatched</th>
                            <th>Subject</th>
                            <th>Addressee</th>
                            <th>Mode Of Dispatch</th>

                        </tr>
                        <tr>
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
