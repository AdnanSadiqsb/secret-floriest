import React from 'react'
import {Link} from 'react-router-dom'
// import './home.css'
import './productCard.css'
import {Rating} from '@material-ui/lab'

export default function ProductCard({product}) {
  const options={
    size: window.innerWidth<600 ?"small":"medium",
    value:product.total_rating,
    readOnly:true,
    precision:0.5,



}
  return (
   
    <Link className='item-card' to={`/product/${product._id}`}>
        
            
        <div  className='item-image'>

        <img id='item-pic' src={product.images[0].url} alt={product.name} />
        </div>
        <p className='productName'>{product.name}</p>
        <div className='Reviews-cont'>
            <Rating {...options} />
            <p >Reviews({product.numOfReviews})</p>
        </div>
        <div className="price-cont">
            <div>
              <p className='discountPrice'>{product.price-product.price/100*10}</p>
              <p className='ActualPrice'>{product.price}</p>
            </div>
              <p className='status'>In Stock</p>

          </div>

    </Link>
  )
}
