import React from 'react'
import './products.css'
import {useSelector,useDispatch}  from 'react-redux'
import Loader from '../layout/loader/Loader'
import {clearErrors, getProduct} from '../../actions/productAction'
import ProductCard from '../home/ProductCard'
import { Fragment } from 'react'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { useState } from 'react'
import './products.css'
import { Slider} from '@material-ui/core'
import {FaBars, FaXbox} from 'react-icons/fa'
import {useAlert} from 'react-alert'
import MeatData from '../layout/MeatData'
function Products() {

    const dispatch= useDispatch()
    const alert=useAlert()
    const [currentPage ,setcurrentPage]=useState(1)
    const [price, setPrice]=useState([0,25000])
    const [toggle, setToggle]=useState("toggle")
    const [category,setCategory]= useState("")
    const [ratings, setRatings]=useState(0)
    const setCurrentPageNo=(e)=>{
        setcurrentPage(e)

    }
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice)
        console.log(price)

    }
    const categories=["Shirt", "jeans","Shalwar", "kameez","machine","mobile","laptop"]

    const {products, loading, error, productsCount,resultPerPage,filterProductsLength}=useSelector(state=>state.products)
    const {keyword}= useParams()
    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage,price,category, ratings))


    },[dispatch, keyword, currentPage, price, category, ratings, alert,error])
    
    
    console.log(products)

  return (
    <Fragment>
        {loading ? <Loader/>:
        
        <Fragment>
            <MeatData title={"Products --Ecommerce"}/>

            <div className="fiter-btn" onClick={()=>setToggle("")}>

              <FaBars  />  

            </div>
            <div className='items-container'>

            <div className='line'></div>
            <h1 className='heading'>New Ariavals</h1>
            {
                products.length===0?<h5 className='productHeading' style={{color:'red'}}>Nothing to show !</h5>: 
                <Fragment>
                <div className="products">
                {
                    products && products.map((product)=>{
                        return <ProductCard key = {product._id} product ={product}/>
                    })
                }
                
                 </div>
                </Fragment>
            }
            </div>
            <div className={`filter-container ${toggle}`}>
                <div className="cancel-filter" onClick={()=>setToggle("toggle")}>

                    <FaXbox/>
                </div>
            <div className="filter-box">
                <h5>price</h5>
                <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby='range-slider'
                min={0}
                max={25000}
                
                
                />
                <h5>categories</h5>
                <ul className='category-box'>
                    {categories.map((cat)=>{
                        return <li className='category-link' onClick={()=>setCategory(cat)} key={cat}>
                            {cat}

                        </li>
                    })}
                    <li className='cancel-category-btn' onClick={()=>setCategory(null)}>select all</li>
                </ul>
                <fieldset>
                    <h5>Rating </h5>
                    <Slider
                    value={ratings}
                    aria-labelledby="continous-slider"

                    onChange={(e,newRating)=>{
                        setRatings(newRating)
                    }}
                    min={0}
                    max={5}
                    marks={true}
                    valueLabelDisplay="auto"

                    />
                </fieldset>

                </div>
            </div>
             
           {
            resultPerPage<filterProductsLength &&
            ( <div className="pagination-box ">
            <Pagination 
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="next"
            previousPageText="prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
                />

        </div>)
           }

            

            
           



        </Fragment>
        }
    </Fragment>
  )
}

export default Products
