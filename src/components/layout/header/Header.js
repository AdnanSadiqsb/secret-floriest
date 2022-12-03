import React, {useEffect,useState} from 'react'
import './header.css'
import {Link} from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import {FaFacebookSquare} from 'react-icons/fa'
import {AiFillTwitterSquare} from 'react-icons/ai'
import {FaWhatsappSquare} from 'react-icons/fa'
import {FaInstagramSquare} from 'react-icons/fa'
import {BiSearchAlt} from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BsHeart} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
const Header = () => {
  const [navDisplay , setNavDispaly] =useState('nav-show')
  const navigate=useNavigate()
  const [stickyNav, setStickyNav] = useState(false);

  useEffect(() => {
  

      window.onscroll = () => {
        setStickyNav(window.pageYOffset === 0 ? false : true);
        
        return () => (window.onscroll = null);
      };
    
  }, []);
  return (
  <div className="">
      <div className="burger-container">
                <GiHamburgerMenu className='resp-icons' onClick={()=>setNavDispaly('nav-show')}/>
                <h2>Clothing Palette</h2>
                <AiOutlineShoppingCart className='resp-icons'/>
                

        </div>
         
        <div className="main-conatainer">

          <div className="middle-nav">
            <div className="left-section">
              <h1 className='logoHeading'>Clothing Palette</h1>
            </div>
            <div className='flip-section'>
            <div className="middle-section">
              <form action="" className='search-form'>

                <input className='serch-input' type="text" placeholder='Search Product ....' />
                <button className='serch-btn'>
                    
                    <BiSearchAlt className='serch-icon'/>
                </button>
              </form>
            </div>
            <div className="right-section">
              <Link className='auth-link' to="/register">register</Link>
              /
              <Link className='auth-link' to="/login">login</Link>
              <div className="inner-right">
                <BsHeart className='middle-icons' />
                <div>
                    <p>1</p>
                </div>
                <AiOutlineShoppingCart onClick={()=>navigate('/cart')} className='middle-icons'/>
                <div>
                    <p>20</p>
                </div>
              </div>

            </div>
          </div>
   
        </div>
        </div>
        <div className={`bottom-nav  ${navDisplay}`}>
        <MdCancel className='cancel-icon' onClick={()=>setNavDispaly('nav-hide')} />
        <ul>
            <li><Link className='bottom-nav-li-active' to="/">Home</Link></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">Services</a></li>

        </ul>
        <div className="bottom-responsive-section">
            <Link className='auth-link' to="/register">register</Link>
            /
            <Link className='auth-link' to="/login">login</Link>
            <div className="inner-right">
                <BsHeart className='middle-icons' />
                <div>
                    <p>1</p>
                </div>
                <AiOutlineShoppingCart onClick={()=>navigate('/cart')} className='middle-icons'/>
                <div>
                    <p>20</p>
                </div>
            </div>


        </div>
        
        <div className="top-nav-icons social-responsive-links">
            <FaFacebookSquare className='top-icons'/>
            <AiFillTwitterSquare className='top-icons'/>
            <FaWhatsappSquare className='top-icons'/>
            <FaInstagramSquare className='top-icons'/>
        </div>
      </div>
      
    
  </div>
  
  )
}

export default Header
