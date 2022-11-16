import React from 'react'
import { Navigation } from './Navigation'

export const TransitSearchResult = () => {
    return (
        <div className='outgoing-wrapper'>
            <Navigation />
            <div className='view-outgoing'>
                <div className='outgoing-table'>
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
                        <tr>
                            <td className='table-data'>jdskjvk</td>
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
