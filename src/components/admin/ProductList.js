import React from 'react'
import './productList.css'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector, useDispatch} from 'react-redux'
import {clearErrors, getProductAdmin, deleteProduct} from '../../actions/productAction'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {Button} from '@material-ui/core'
import SideBar from './SideBar'
import MeatData from '../layout/MeatData'
import DeleteIcon  from '@material-ui/icons/Delete'
import EditIcon  from '@material-ui/icons/Edit'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
function ProductList() {
    const dispatch =useDispatch()
    const alert=useAlert()
    const {error, products}=useSelector(state=>state.products)
    const {loading, error:deleteError, isDeleted}=useSelector(state=>state.modifyProduct)
    const deleteItem=(id)=>{
        var proceed =window.confirm("Are you sure you want to Delete This?");
        if (proceed) {
            dispatch(deleteProduct(id))
    
            } 
    }

    const columns=[
        {field:'id',headName:'Product ID',  flex:0.5, minWidth:200},
        {field:'name',headName:'Name',flex:0.8, minWidth:30,},
        {field:'stock',headName:'Stock', type:'number',  flex:0.3,minWidth:150},
        {field:'price',headName:'Price', type:'number',flex:0.4, minWidth:150},
        {field:'action', headerName:'Action', flex:0.3, minWidth:150, sortable:false, renderCell:(params)=>{
            return( 
                <Fragment>

                    <Link to= {`/admin/product/${params.getValue(params.id,"id")}`}  >
                        <EditIcon/>
                    </Link>
                    <Button>
                        <DeleteIcon onClick={()=>deleteItem(params.getValue(params.id,'id'))} />
                    </Button> 
                </Fragment>
      
            )
        } }
    ]
    const rows=[]
    products && products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name
        })
    })
    useEffect(()=>{
        if(error)
        {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError)
        {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted)
        {
            alert.success('product Deleted Success fuly')
            dispatch({type:DELETE_PRODUCT_RESET})
            
        }
        dispatch(getProductAdmin())
    },[error, dispatch, alert, deleteError, isDeleted])
  return (
    <div>
      <MeatData title={'All Producta --Admin'}></MeatData>
      <div className="dashboard">
        <SideBar/>
        <div className="productsListConatiner">
            <h1 className='dashbord-heading'>All Products</h1>
            <DataGrid
             rows={rows}
            columns={columns} 
            pageSize={10} 
            disableSelectionOnClick 
            autoHeight
            className='productListTable'>
            

            </DataGrid>
        </div>
      </div>
      
    </div>
  )
}

export default ProductList
