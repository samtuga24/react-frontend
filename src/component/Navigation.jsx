import React from 'react'
import logo from '../logo/logo.png'
export const Navigation = (props) => {
    const getData = localStorage.getItem("user");
    const parsedData = JSON.parse(getData);
    return (
        <div className='nav-wrapper'>
            <div className='navigation'>

                <div className='nav-logo'>
                    <div className='nav-logo-wrap'>
                        <img src={logo} alt="phma logo" className='logo-icon' />
                    </div>
                    <div className='index-title'>PHMA Records Management Unit</div>
                    <div className='user-name'>{props.firstName}</div>
                </div>
            </div>
        </div>

    )
}
