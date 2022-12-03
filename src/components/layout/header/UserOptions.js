import React from 'react'
import { Fragment } from 'react'
import { SpeedDial,SpeedDialAction } from '@mui/material';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {logOut} from'../../../actions/userAction'
import {useAlert} from 'react-alert'
import Backdrop  from '@material-ui/core/Backdrop'
import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';

const UserOptions = (user) => {
  const {cartItems}= useSelector((state)=>state.cart)

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const alert=useAlert()
    const options = [
      { icon: <PersonIcon />, name: 'account', fun:account },
        { icon: <ListAltIcon />, name: 'Orders', fun: orders },
        {icon:<ShoppingCartIcon style={{color: cartItems.length>0? 'tomato':'unset'}}/> ,name:`cart(${cartItems.length}) `, fun :cart },
        { icon: <ExitToAppIcon />, name: 'Exit', fun:logout },
      ];

      if(user.user.role==='admin')
      {
        options.unshift({icon: <DashboardIcon />, name: 'Dashboard', fun: dashboard  })
      }
      function dashboard() {
        navigate('/admin/dashboard')
        
      }
      function orders() {
        document.title='orders'
        navigate('/orders/me')
        
      }
      function account() {
        navigate('/account')
        
      }
      function logout() {
        dispatch(logOut())
        navigate('/')
        alert.success("logout succes fuly")

        
      }
      function cart()
      {
        navigate('/cart')
        document.title='cart'
      }

    const [open, setOpen]=useState(false)
  return (
    <Fragment>
      <Backdrop open={open} style={{opacity:"0.8", zIndex:'10'}}/>
      <SpeedDial 
      
      ariaLabel='SpeedDail tool tip'
      className='speedDail'
    
      onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon={
        <img style={{borderRadius:'10%'}} className='speedDailIcon' src={user.user.avatar.url ? user.user.avatar.url:'./Profile.jpg' } alt='Profile pic'/>    
        }
        direction='down'
        >
          {
            options.map((option)=>{
             return <SpeedDialAction tooltipOpen={window.innerWidth<=600?true:false} key={option.name} icon={option.icon} tooltipTitle= {option.name} onClick={option.fun} />

            })
          }

        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
