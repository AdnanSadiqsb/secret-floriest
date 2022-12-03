import React, {useEffect, useState,Fragment} from 'react'
import './shipping.css'
import MeatData from '../layout/MeatData'
import PinDropIcon from '@material-ui/icons/PinDrop'
import HomeIcon  from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PublicIcon from '@material-ui/icons/Public'
import PhoneIcon  from '@material-ui/icons/Phone'
import TransferWithinAStationIcon  from '@material-ui/icons/TransferWithinAStation'
import {Country, State} from 'country-state-city'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {saveShippingInfo, getShippingInfo} from '../../actions/cartAction'
import CheckoutSteps from './CheckoutSteps'
import {useNavigate} from 'react-router-dom'

function Shipping() {
  const alert=useAlert()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {shippingInfo}=useSelector(state=>state.cart)
  
  useEffect(()=>{
    
    dispatch(getShippingInfo())
  },[dispatch])
  const {isAuthenciate} =useSelector(state=>state.user)
  useEffect(()=>{
    if(!isAuthenciate)
    {
        navigate('/login')
    }

  },[isAuthenciate, navigate])


    
console.log(shippingInfo.address)


    
    const [address, setAddress]=useState(shippingInfo.address)
    const [city, setCity]=useState(shippingInfo.city)
    const [state, setState]=useState(shippingInfo.state)
    const [country, setCountry]=useState(shippingInfo.country)
    const [pinCode, setPinCode]=useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNumber]=useState(shippingInfo.phoneNo)
    
  
  const shippingSubmit=(e)=>{
    e.preventDefault()
    if(phoneNo.length<11 ||phoneNo.length>11)
    {
      alert.show('phone number must be 11 cahracters')
      console.log('erro')
      return
    }
    dispatch(saveShippingInfo({address, city, state, country,pinCode, phoneNo}))
    navigate('/order/confirm')
  }


  return (
    <Fragment>
        <MeatData title={'shipping'}/>
        <CheckoutSteps activeSteps={0}/>
        <div className='shipping-container'>
          <div className="shipping-box">
            <h2 className='shipping-heading'>Shipping Details</h2>
            <form action="" className="shippinForm" onSubmit={shippingSubmit}>
              <div>
                <HomeIcon/>
                <input type="text" placeholder='Address' required value={address} onChange={e=>setAddress(e.target.value)} />
              </div>
              <div>
                <LocationCityIcon/>
                <input type="text" placeholder='loaction' required value={city} onChange={e=>setCity(e.target.value)} />
              </div>
               <div>
                <PinDropIcon/>
                <input type="text" placeholder='pin code' required value={pinCode} onChange={e=>setPinCode(e.target.value)} />
              </div>
               <div>
                <PhoneIcon/>
                <input type="number" size={10} placeholder='03000000000'required value= { phoneNo} onChange={e=>setPhoneNumber(e.target.value)} />
              </div>
               <div>
                <PublicIcon/>
                <select name="" required id="" value={country} onChange={e=>setCountry(e.target.value)}>

                  <option value="">Country</option>
                  {
                    Country&&
                    Country.getAllCountries().map((item)=>(
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                      
                    ))
                  }
                </select>
              </div> 
              {
                country && (
                  <div>

                    <TransferWithinAStationIcon/>
                    <select name="" id="" required value={state} onChange={e=>setState(e.target.value)}>
                    <option value="">state</option>
                    {
                      State.getStatesOfCountry(country).map((item)=>(
                        <option  value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      ))
                    }

                    </select>
                  </div>

                )}
                <input type="submit" value={'Continue'} className='shippinButton' disabled={state? false:true} />
        


            </form>
            </div>
        </div>


    </Fragment>
  )
}

export default Shipping
