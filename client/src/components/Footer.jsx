import React from 'react'
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsTelephone } from 'react-icons/bs';
import '../styling/components/_footer.scss';
import'../styling/main.scss'

/**
* @author Sara Johansson
* @Description Footer with adress and social media links
*/

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer">
        <div className="row justify-content-center">
          <div className="col-2 mb-3">
            <a href="https://www.twitter.com/" className="icon">
              <BsTwitter/>
            </a>
          </div>
          <div className="col-2 mb-3">
            <a href="https://www.linkedin.com/" className="icon">
            <BsLinkedin/>
            </a>
          </div>
          <div className="col-2 mb-3">
          <a href="https://www.instagram.com/" className="icon">
          <BsInstagram/> 
            </a>
          </div>
          <div className="mobile-icon">
          <a href="https://www.instagram.com/" className="icon">
          <BsTelephone/> 12-34 56 78 91
            </a> 
            <div className='footer-adress'><a>Springavägen 420, 133 37 Rymden</a></div>
          </div>
          <div className='footer-text'><p>&copy; 2023 Filmvisarna</p></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer