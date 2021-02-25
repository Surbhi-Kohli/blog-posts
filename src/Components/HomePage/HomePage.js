import React from "react";
import axios from 'axios';
import classes from "./HomePage.module.css";
import _ from "lodash";
 import { useLocation } from 'react-router-dom'
import {NavLink} from "react-router-dom";
function HomePage(){
    const location = useLocation();
    const [users,setUsers]=React.useState([]);
    const [filteredUsers,setFilteredUsers]=React.useState([]);
    const [searchQuery,setSearchQuery]=React.useState('');
 //   const delayedQuery = React.useRef(_.debounce((searchQueryParam)=>filterResults(searchQueryParam), 2000));
    console.log("search query is "+searchQuery);
    React.useEffect(()=>{
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res=>{
                  setFilteredUsers(res.data);
                  setUsers(res.data);
                });
    },[])
    React.useEffect(()=>{
       
       filterResults(searchQuery)
    },[searchQuery]);

    function filterResults(searchQueryParam){
        console.log("in filterSearch");
       console.log("with search value as "+searchQuery);
           if(searchQueryParam!="")
           {
         let filteredResults= users.filter(user=>{
               if(user.name.includes(searchQueryParam)||user.company.name.includes(searchQueryParam))
               {
                   return user;
               }
              
           });
           console.log(filteredResults);
          setFilteredUsers(filteredResults);
        }
        else{
            setFilteredUsers(users);
        }
        
    }
return(
 <div className={classes.mainContainer}>
    <div className={classes.filterBox}>
    <div>Search by Company Name/User Name <input placeholder="filter" type="text" onChange={e=>setSearchQuery(e.target.value)}/> </div> </div>
<div className={classes.TableContainer}>
<table> 
  <thead>
    <tr>
    <th>Name</th>
    <th>Company Name</th>
    <th>Blog Posts</th>
    </tr>
   
    </thead><tbody>
    {filteredUsers.map(user=>{
      return (<tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.company.name}</td>
      <td><NavLink  to={{pathname:`/Posts`,search:`?userId=${user.id}&skip=0&limit=10`}}>
      {user.name}/Posts
      </NavLink></td>
       </tr> 
      )
    })}
   </tbody>
</table>
</div>
</div>);
}
export default HomePage;