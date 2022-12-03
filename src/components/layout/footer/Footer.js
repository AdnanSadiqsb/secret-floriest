import React from 'react'
import './footer.css'

import {ImLocation2} from 'react-icons/im'
import {AiTwotonePhone} from 'react-icons/ai'
import {GrMail} from 'react-icons/gr'
export default function Footer() {
  return (
    <div  >

      <div className="footer-section">
        <div className="footer-container">
            <div className="section1">
                <h3 className='logo'>CLOTHING PALETTE</h3>
                <pre>
                    {
                        `Soffio is a passionate
clothing brand bringing you the fine
combination of both eastern and western
mix under one platform`
                    }

    
                </pre>
            </div>
            <div className="section">
                <p className='link-header'>Use full links</p>
                <ul>
                    <li>Collections</li>
                    <li>Stitched </li>

                    <li>Unstitched</li>
                    <li>Winter Collection</li>
                    <li>Summer Collection</li>


                </ul>


            </div>
            <div className="section">
            <p className='link-header'>Polices</p>
                <ul>
                  
                    <li>Our Blog</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Return Policy</li>
                    <li>FAQ's</li>
                </ul>

            </div>
            <div className="section">
            <p className='link-header'>Location</p>
                <ul>
                    <li className='contact-li'>
                        <AiTwotonePhone/>
                        +92 15-6318530
                    </li>
                    <li className='contact-li'>
                        <ImLocation2/>
                        <pre className='address-text'>{`clothig corpuration
model colony 234 street no
Vehari`}</pre>
                        
                    </li>
                    <li className='contact-li'>
                        <GrMail/>
                        adnansadiqxyz@gmail.com
                    </li>
                    
                </ul>

            </div>
        </div>



      </div>
      <div className="footerline">
        <p>© 2022 Clothing Palette. All Rights Reserved.</p>
      </div>
    </div>
  )
}
