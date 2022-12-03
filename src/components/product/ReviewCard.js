import React from 'react'
import profilePng from '../../images/profile.jpg'
import {Rating} from '@material-ui/lab'

function ReviewCard({review}) {
    

  const options={
        size:window.innerWidth<600 ?"small":"medium",
        value:review.rating,
        readOnly:true,
        precision:0.5}

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        
        <Rating {...options}/>
        <span className='reviewCard-span'>{review.comment}</span>
      
    </div>
  )
}

export default ReviewCard
