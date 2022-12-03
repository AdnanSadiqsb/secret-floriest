import React from 'react'
import {Link} from 'react-router-dom'
import {TreeView, TreeItem} from '@material-ui/lab'
import ExpandMoreIcon  from '@material-ui/icons/ExpandMore'
import PostAddIcon  from '@material-ui/icons/PostAdd'
import ImportExportIcon  from '@material-ui/icons/ImportExport'
import ListAltIcon  from '@material-ui/icons/ListAlt'
import DashboardIcon  from '@material-ui/icons/Dashboard'
import PeopleIcon  from '@material-ui/icons/People'
import RateReviewIcon  from '@material-ui/icons/RateReview'
import AddIcon  from '@material-ui/icons/Add'
import './sidebar.css'
function SideBar() {
  return (
    <div className='sideBar'>
        <Link to='/'>
            <h1 className='sidebar-logo'>logo here</h1>
        </Link>
        <Link to='/admin/dashboard'>
            <p>
                <DashboardIcon/> Dashboard
            </p>
        </Link>
        
       
            <TreeView  className='tree-link'
                defaultExpandIcon={<ImportExportIcon/>}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                >
                <TreeItem nodeId='1' label='products'>
                    <Link to='/admin/products'>
                        <TreeItem nodeId='2' label='all' icon={<PostAddIcon/>}/>
                    </Link>
                    <Link to='/admin/product/new'>
                        <TreeItem nodeId='3' label='Create' icon={<AddIcon/>}/>
                    </Link>
                   
                </TreeItem>
            </TreeView>
        
                <Link to='/admin/orders'>
                    <p>
                        <ListAltIcon/> Orders
                    </p>
                </Link>
                <Link to='/admin/users'>
                    <p>
                        <PeopleIcon/> Users
                    </p>
                </Link>
                <Link to='/admin/reviews'>
                    <p>
                        <RateReviewIcon/> Reviews
                    </p>
                </Link>
      


      
    </div>
  )
}

export default SideBar
