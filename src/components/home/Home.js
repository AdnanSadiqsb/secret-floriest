import React, { Fragment, useEffect } from 'react'
import {FaMouse} from 'react-icons/fa'
import './home.css'
import Product from './ProductCard'
import MeatData from '../layout/MeatData'
import {clearErrors, getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/loader/Loader'
import {useAlert} from 'react-alert'
import Carousel from '../carousel/Carousel'
export default function Home() {
  const alert=useAlert()
  
  
  const dispatch= useDispatch()
  
  const {loading,error, products,productsCount}=useSelector(state=>state.products)
  
  useEffect(()=>{
    if(error)
    {
      alert.error(error)
      dispatch(clearErrors)
    }
  
    dispatch(getProduct())
  },[dispatch,error,alert])
  return (
    <Fragment>
      {loading
      ?
      <Loader/>
      :
      
    <Fragment>
    <MeatData title="Home  --Ecommerce"/>
      <div className="banner">
          <p>welcome to our Online Store</p>
          <h1>FIND AMAZING PRODUCTS BELOW !</h1>
          <a href="#container">
              <button>scroll <FaMouse/></button>
          </a>
      </div>
      <div className='items-container' id='container' >

        <div className='line'></div>
        <h1 className='heading'>New Ariavals</h1>
        <div className="items-section" >
        {
          products && products.map(product=>{
          
            return <Product product={product} key={product._id}/>
          })
        }


        </div>
      </div>
      <Carousel/>

    </Fragment>}
  </Fragment>
)}
