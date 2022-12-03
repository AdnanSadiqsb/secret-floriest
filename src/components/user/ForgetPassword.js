import React ,{useState, Fragment, useEffect} from 'react'
import './forgotPassword.css'
import Loader from '../layout/loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, forgetPassword} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import MeatData from '../layout/MeatData'

import  MailOutlineIcon  from '@material-ui/icons/MailOutline'

function ForgetPassword() {

    const dispatch = useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const [email, setEmail]=useState("")
    const {loading, error, message}= useSelector(state=>state.forgetPassword)
    const forgotPasswordSubmit=(e)=>{
        e.preventDefault()
        const myFrom= new FormData()
        myFrom.set("email",email)

        dispatch(forgetPassword(myFrom))
    }
    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(message)
        {
            alert.success(message)
        }
    }, [dispatch, error, alert, message,navigate])
  return (
    <Fragment>
       
        <MeatData title={'forget Password'}/>
    {loading?<Loader/>:
    (
    <div className="forgotPasswordContainer">
    <div className="forgotPasswordBox">
        <h2 className='forgotPasswordHeading'>Forgot Password</h2>
    <form  className="forgotPasswordForm" encType="multipart/form-data" onSubmit={forgotPasswordSubmit}>

              <div className='forgotPasswordEmail'>
                  <MailOutlineIcon/>
                  <input type="email" name="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />

              </div>

              <input className='forgotPasswordBtn' type="submit" value={"send Mail"} />




          </form>

    </div>
    </div>

    )}
    </Fragment>
  )
}

export default ForgetPassword
