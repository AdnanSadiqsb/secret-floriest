import React from 'react'
import SideBar from "./SideBar";
import './dashboard.css'
import {Link} from 'react-router-dom'
import {Doughnut, Line, Chart} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {clearErrors, getProductAdmin} from '../../actions/productAction'
import {useAlert} from 'react-alert'
function Dashboard() {
    const alert=useAlert()
    const dispatch=useDispatch()
    const {error, products } =useSelector(state=>state.products)
    let outofStock=0;
    products && products.forEach((item)=>{
        if(item.stock===0)
        {
            outofStock +=1
        }
    })

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())

        }
        dispatch(getProductAdmin())
    },[dispatch, error, alert])
    const lineState={
        labels:["initial Amount ","Amount Earned"],
        datasets:[
            {
                label:"total Amount",
                backgroundColor:"tomato",
                hoverBackgroundColor:"rgb(197,72,49)",
                data:[0,34]
            }
        ]

    }

    const doughuntState={
        labels:["out of stock", "in stock"],
        datasets:[
            {
                backgroundColor:['red','#6717B0'],
                hoverBackgroundColor:['#4g5000','$35014f'],
                data:[outofStock,products.length-outofStock]
            }
        ]
    }



  return (
    <div className='dashboard'>
        <SideBar/>
        <div className="dashboardContainer">
            <h1 className='dashbord-heading'>Dashboard</h1>
            <div className="dashboardSummary">
                <div>
                    <p>
                        total Amount <br/> 3000
                    </p>
                </div>
                <div className="dashbordsummarybox-2">
                    <Link to='/admin/products'>
                        <p>products</p>
                        <p>{products && products.length}</p>
                    </Link>
                    <Link to='/admin/orders'>
                        <p>orders</p>
                        <p>8</p>
                    </Link>
                    <Link to='/admin/users'>
                        <p>User</p>
                        <p>100</p>
                    </Link>
                </div>
            </div>
            <div className="dashboardCharts">

            <div className="linechart-1">

                <Line  data={lineState}/>

            </div>
            <div className="dountChart-1">
                <Doughnut data={doughuntState}/>
            </div>
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard
