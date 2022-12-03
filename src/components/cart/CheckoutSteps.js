import  LocalShippingIcon from '@material-ui/icons/LocalShipping'
import React,{Fragment} from 'react'
import  LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import { Step, StepLabel, Stepper } from '@material-ui/core'
import './checkSteps.css'
function CheckoutSteps({activeSteps}) {
    
    const steps=[
        {
            label: <p>shipping Deatls</p>,
            icon:<LocalShippingIcon/>
        },
        {
            label: <p>Confirm Order</p>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label: <p>Payment</p>,
            icon:<AccountBalanceIcon/>
        },

    ]
    const stepStyle={
        boxSizing:'border-box',
    

    }
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeSteps} style={stepStyle} >
            {steps.map((item, index)=>(
                <Step key={index} active={activeSteps===index? true:false} completed={activeSteps>=index? true:false}>
                    <StepLabel icon={item.icon} style={{color:activeSteps>=index?'tomato':'rgba(0, 0, 0, 0.485)'}} >
                        {item.label}
                    </StepLabel>

                </Step>

            ))}


        </Stepper>

      
    </Fragment>
  )
}

export default CheckoutSteps
