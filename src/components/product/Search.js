import React from 'react'
import { useState, Fragment } from 'react'
import './search.css'
import {useNavigate} from 'react-router-dom'
import MeatData from '../layout/MeatData'
function Search({history}) {
    const [keyWord, setKeyWord]=useState("")
    const navigate=useNavigate()
    const serchSubmitHandler=(e)=>
    {
        console.log("hlo")
        e.preventDefault()
        if(keyWord.trim()){
            navigate(`/products/${keyWord}`)

        }
        else{
           navigate("/products") 
        }

    }
  return (
    <Fragment>
        <MeatData title={"Product Detail --Ecommerce"}/>

        <form className='searchBox' onSubmit={serchSubmitHandler}>
            <input type="text" placeholder='Serch a Product...' onChange={(e)=>{
                setKeyWord(e.target.value)
            }}/>
            <input type="submit" name="Search" value="Search" id="" />
            

        </form>
    </Fragment>
  )
}

export default Search
