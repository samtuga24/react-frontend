import React from 'react'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Footer = () => {

    return (
        <div className='footer'>
            <div className='foot-wrap'>
                <div className='author'>
                    <p>samwus</p>
                    <div className='footer-detail'>
                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                    <p className='footer-email'>owusu684@gmail.com</p>
                    </div>

                    <div className='footer-detail'>
                    <FontAwesomeIcon icon={faPhone} className='icon' />
                    <p className='footer-email'>(+233) 249628340</p>
                    </div>
                </div>
                <div className='copyright'>&copy;PHMA-rmu {new Date().getFullYear()}</div>
            </div>

        </div>
    )
}
