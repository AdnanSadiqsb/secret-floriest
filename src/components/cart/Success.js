import React from 'react'
import './success.css'
import successImg from '../../images/success.gif'
import {useNavigate} from 'react-router-dom'
function Success() {
  const naviagate=useNavigate()

  const onClickHandler=()=>{
    naviagate('/orders/me')  
  }

  return (
    <div className='success-cont'>
        <div className="succcess-img">
            <img src={successImg} alt="" />
        </div>
        <button className='succes-btn' onClick={onClickHandler } > view Order</button>
      
    </div>
  )
}

export default Success
