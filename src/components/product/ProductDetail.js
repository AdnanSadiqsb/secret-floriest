import React, {useState} from 'react'
import { Fragment } from 'react'
import Carousel from 'react-material-ui-carousel'
import './productDetail.css'
import {useSelector,useDispatch} from 'react-redux'
import { clearErrors, getProductDetilas, newReview } from '../../actions/productAction'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard'
import Loader from '../layout/loader/Loader'
import {useAlert} from 'react-alert'
import MeatData from '../layout/MeatData'
import {addItemsToCart} from '../../actions/cartAction'
import {Dialog, DialogActions,DialogContent, DialogTitle, Button} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
function ProductDetail() {
    const alert= useAlert()
    const {id}= useParams()
    const dispatch= useDispatch()
    
    const {product,loading, error} =useSelector(state=>state.productDetail)
    
    const {success, error:reviewError}=useSelector(state=>state.newReview)
 
    const [quantity, setQuantity]=useState(1)
    const [open, setOpen]=useState(false)
    const [comment, setComment]=useState('')
    const [rating, setRating]=useState(0)
    const increaseQuantity=()=>{
        if(product.stock>quantity)
        {
            const q=quantity
            setQuantity(q+1)

        }
        else{

            alert.info(`only avaliable quantity is ${product.stock}`)
        }
    }
    const submitReviewToggle=()=>{
        open? setOpen(false): setOpen(true)
    }
    const decreaseQuantity=()=>{
        if(quantity>1)
        {
            const q=quantity
            setQuantity(q-1)

        }
    }
    const addToCartHandler=()=>{
        dispatch(addItemsToCart(id,quantity))
        alert.success("item added to cart")

    }
    useEffect(()=>{
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },[])
    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(reviewError)
        {
            alert.error(reviewError)
            dispatch(clearErrors())
        }
        if(success)
        {
            alert.success("review Submitted success fuly")
        }
        dispatch(getProductDetilas(id))
        
        
    },[dispatch, id,alert,error, success, reviewError])
    const options={
        size:"large",

        value:product.total_rating,
        readOnly:true,
        precision:0.5
    

    }
    const reviestate=useSelector(state=>state.newRevie)
    console.log(reviestate)
    const submitReview=()=>{
        const reviewData={
            rating, comment, productId:product._id
        }
        dispatch(newReview(reviewData))
        setOpen(false)
        dispatch({type:NEW_REVIEW_RESET})
       
    }
  return (

        <Fragment>
            {
                loading? <Loader/>:

                <Fragment>
                    <MeatData title={`${product.name} --Ecommerce`}/>
                <div className='productDatail'>
                <div>
                    <Carousel className='carsel'>
                    {
                        product.images &&
                        product.images.map((item,i)=>(
                            
                            <img 
                                className='CarouseImage'
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
        
                        ))
                    }
                </Carousel>
                </div> 
                <div>
                    <div className="deatailBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="deatailBlock-2">
                        <Rating {...options}/>
                        <span className='deatailBlock-2-span'>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="deatailBlock-3">
                        <div className='priceDetail-cont'>

                        <h1>RS:{product.price-product.price/100*10}</h1>
                        <h1>RS:{product.price}</h1>

                        </div>
                        <div className='deatailBlock-3-1'>
                            <div className='deatailBlock-3-1-1'>
                                <button onClick={decreaseQuantity}>-</button>
                                <input type="number" value={quantity} readOnly />
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            {"  "}
                            <button className='btn-more' disabled={product.stock<=0?true:false} onClick={addToCartHandler}>Add To Cart</button>
        
                        </div>
                        <p className='stock-info'>
                            Stock :
                            <b className={product.stock<1 ?"redColor":"greenColor"}>
        
                            {product.stock<1?"OutOfStock":"InStock"}
                            </b>
                        </p>
                        
                    </div>
                    <div className='deatailBlock-4'>
                        Desciption: <p>{product.description}</p>
                    </div>
                    <button className='btn-more btn-submit-review' onClick={submitReviewToggle}>Submit Review</button>
                </div>
            </div>
            
            <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className='submitDialog'>
                        <Rating name='revie-Rating' onChange={(e)=>setRating(e.target.value)} value={Number (rating)}   size="large"/>
                        <textarea className='reviewTextArea' cols={'30'} rows={5} value={comment} onChange={(e)=>setComment(e.target.value)}>

                        </textarea>
                        <DialogActions>
                            <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
                            <Button color='primary' onClick={submitReview}>submit</Button>
                        </DialogActions>
                    </DialogContent>
            </Dialog>
            <div className='items-container'>

            <div className='line'></div>
            <h1 className='heading'>Reviews</h1>
            {product.reviews && product.reviews[0] ?
            (
                <div className='reviews'>
                    {
                        product.reviews.map((review)=>{
                           return <ReviewCard review={review}/>
                        })
                    }
        
                </div>
            )
            :
            (<p className='noReview'>No Reviews Yet</p>)
            }
            </div>
            </Fragment>
            }
        </Fragment>
  )
}

export default ProductDetail
