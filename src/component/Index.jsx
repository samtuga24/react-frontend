import React from 'react'
import logo from '../logo/logo.png'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'
export const Index = () => {
    return (
        <div className='index-wrapper'>
            <div className='index-wrapper'>
                <div className='index-nav'>
                    <div className='index-logo'>
                        <div className='logo-wrap'>
                            <img src={logo} alt="phma logo" className='logo-icon' />
                        </div>
                        <div className='index-title'>PHMA Records Management Unit</div>
                    </div>
                    <div className='index-list'>
                        <div className='sign-in'>
                            <Link to="login" className='nav-link'>Sign in</Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    )
}
