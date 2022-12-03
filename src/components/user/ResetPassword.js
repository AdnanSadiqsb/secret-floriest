import React ,{useState, Fragment, useEffect} from 'react'
import './ResetPassword.css'
import Loader from '../layout/loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, resetPassword} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import MeatData from '../layout/MeatData'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon  from '@material-ui/icons/Lock'
import {useParams} from 'react-router-dom'
function ResetPassword() {
    const dispatch = useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const [password,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const {loading, error, success}= useSelector(state=>state.forgetPassword)
    const {token}= useParams()
    const resetPasswordSubmit=(e)=>{
        e.preventDefault()
        const myFrom= new FormData()
        myFrom.set("password",password)
        myFrom.set("confirmPassword",confirmPassword)
        dispatch(resetPassword(token, myFrom))
    }

    useEffect(()=>{

         
            if(error){
                alert.error(error)
                dispatch(clearErrors)
            }
            if(success)
            {
                alert.success("Passowrd updated Successfully")
                navigate('/login')
                
            }
    
        },[error, dispatch, alert, success, navigate])

  return (
    <Fragment>
       
    <MeatData title={`change password`}/>
{loading?<Loader/>:
(
<div className="resetPasswordContainer">
    <div className="resetPasswordBox">
        <h2 className='resetPasswordHeading'>Update Password</h2>
        <form  className="resetPasswordForm" encType="multipart/form-data" onSubmit={resetPasswordSubmit}>
        
 
            <div className="resetPassword">
                <LockOpenIcon/>
                <input type="password" name="password" placeholder='new Password' required value={password} onChange={(e)=>setNewPassword(e.target.value)} />
            </div>
            <div className="resetPassword">
                <LockIcon/>
                <input type="password" name="password" placeholder='confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>
            <input className='resetPasswordBtn' type="submit" value={"change Password"} />
        </form>
    </div>
</div>

)}
</Fragment>

  )
}

export default ResetPassword
