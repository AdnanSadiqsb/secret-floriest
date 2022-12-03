import React, { Fragment } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector, useDispatch} from 'react-redux'
import {clearErrors, myOrders} from '../../actions/orderAction'
import MeatData from '../layout/MeatData'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader'
import LaunchIcon from '@material-ui/icons/Launch'
import './myOrder.css'
import { useEffect } from 'react'

function MyOrder() {
    const dispath=useDispatch()
    const alert=useAlert()

    const {loading, error, orders} =useSelector(state=>state.myOrders)
    const {user}= useSelector(state=>state.user)
    const columns=[
        {field:'id',headName:'OrderID',  flex:1, minWidth:300},
        {field:'status',headName:'status',flex:0.5, minWidth:200,
            cellClassName: params=>{
                return params.getValue(params.id, "status")==='Delivered'?'greenColor':'redColor'

            }},
        {field:'itemQuantity',headName:'Items Quantity', type:'number',  flex:0.5,minWidth:150},
        {field:'amount',headName:'Amount', type:'number',flex:0.5, minWidth:200},
        {field:'action', headerName:'Action', flex:0.5, minWidth:200, sortable:false, renderCell:(params)=>{
            return( 
            <Link to= {`/order/${params.getValue(params.id,"id")}`}  >
                    <LaunchIcon/>
            </Link> 
      
            )
        } }
    ]

    const rows=[]
    orders && orders.forEach((item,index)=>{
        rows.push({
            itemQuantity:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice


        })
    })

    useEffect(()=>{
        dispath(myOrders())
        if(error)
        {   
            alert.error(error)
            dispath( clearErrors())

        }

    },[dispath, alert, error])

  return (
    <Fragment>
        <MeatData title={'My Orders'}/>
        {
            loading? (<Loader/>):
            (
                <div className="myOrderPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='MyOrderTable'
                        autoHeight
                    />

                    <h3 id='myOrdersHeading'>{user.name} s Orders</h3>

                </div>
            )
        } 
      
    </Fragment>
  )
}

export default MyOrder
