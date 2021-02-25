import React from "react";
import { useLocation,useHistory,useParams ,NavLink} from 'react-router-dom'
import axios from 'axios';
import Card from "../Card/Card";
import Comments from "../Comments/Comments";
import classes from "./Posts.module.css";
import forward from "../../assets/forward-button2.png";
import previous from "../../assets/rewind-button.png";
function Posts(){
    const location=useLocation();
    const history=useHistory();
    const [state,setState]=React.useState({userId:0,skip:0,limit:0,postId:0});
    const [data,setData]=React.useState([]);
    const [filteredData,setFilteredData]=React.useState([]);
     const [comments,setComments]=React.useState([]);
    let { id,comment } = useParams();
    console.log(location);
    const {userId,skip,limit,postId}=state;
   React.useEffect(()=>{
       console.log("mounting useEffect of posts and id in params is ",id);
      
        const params = new URLSearchParams(location.search);
        let uid=0,skip=0,limit=0;
        for (const param of params) {
            console.log(param);
              if(param[0]=="userId")
              {
                  uid=param[1];
              }
              else if(param[0]=="skip")
              {
                 skip=param[1];
              }
              else if(param[0]=="limit")
              {
                limit=param[1];
              }
              console.log("in loop")
          }
          if(id)
          setState({userId:uid,skip,limit,postId:id});
          else 
          setState({userId:uid,skip,limit,postId});
        
    },[id])
    React.useEffect(()=>{
          if(limit!=0)
          {   console.log("limit is non-zero");
             loadData();
          }
          else{
              console.log("in else");
              
              if(id)
              {  console.log("param id is ",id);
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res)=>{console.log(res.data);
                
                setFilteredData(res.data);})
            .catch(err=>console.log(err));
              }
          }
      
    },[userId,skip,limit])
   function loadData(){
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&skip=${skip}&limit=${limit}`)
    .then(res=>{
         console.log(res);
         setData(res.data);
         setFilteredData(res.data);
         console.log("skip is changed to ",skip);
         history.replace({pathname:`/Posts`,search:`?userId=${userId}&skip=${skip}&limit=${limit}`,state:{isActive: true}})
         console.log(history);
        })
     .catch(err=>{
         console.log(err);
     })
   } 
   let decrementSkip=()=>{
    if(skip>0)
    setState({userId,skip:+(skip-1),limit});
   }
   let fetchComments=()=>{
       axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
       .then((res)=>{console.log(res);
        setComments(res.data);})
       .catch(err=>console.log(err));
   }
   let filterPosts=(e)=>{

        let val=e.target.value;
        let filterResult;
        if(!id)
        {
         filterResult=data.filter(d=>{
            if(d.title.includes(val))
            return d;
        })
        }
        else{
            filterResult=data.filter(d=>{
                if(d.title.includes(val)||d.body.includes(val))
                return d;
            })
        }
        setFilteredData(filterResult);
   }
   let deletePost=(postID,userID)=>{
       axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}/`)
       .then(res=>{console.log(res);
        setState({userId:userID,skip:0,limit:10,postId:postID});
            loadData();
       })
       .catch(err=>console.log(err));
   }
   let cards=null;
   if(filteredData.length)
   {
       cards= filteredData.map(d=>{
           if(!id)
        return  (<div key={d.id} className={classes.card}><NavLink className={classes.nav} to={{pathname:`/Posts/${d.id}`}} ><Card  data={d}/></NavLink></div>);
        else return (<div key={d.id} className={classes.card}>
        <Card data={d}/>
        <button onClick={(id)=>deletePost(id,d.userId)}>Delete Post</button>
        {comments.length==0?(<div onClick={fetchComments}><b>Fetch Comments:</b></div>):(<Comments comments={comments} postId={id}/>)}
        </div>)
    });
   }
   else
   {
       if(!id)
       cards=(<div className={classes.card}>
                    <NavLink className={classes.nav}  key={filteredData.id} to={{pathname:`/Posts/${filteredData.id}`}} >
                    <Card data={filteredData}/>
                    </NavLink></div>);
   
        else  
        cards=(<div className={classes.card}><Card  key={filteredData.id} data={filteredData}/> <button onClick={(id)=>deletePost(id,filteredData.userId)}>Delete Post</button>{comments.length==0?(<div onClick={fetchComments}><b>Fetch Comments:</b></div>):(<Comments comments={comments} postId={id}/>)}</div>);
    } 
  
   
 return (<div> 
     <div className={classes.Pagination}>
     <div> Search by Post Title { id?"And Body":''}: <input type="text" onChange={(e)=>filterPosts(e)}/></div>
     {id?'':(<div>
    <img src={previous} onClick={decrementSkip}/>  
      <b>Page:{skip}</b>
      <img src={forward} onClick={e=>setState({userId,skip:+(skip+1),limit})}/>
     </div>)}
     </div>
     <div className={classes.Cards}>{cards}</div>
     </div>)
}
export default Posts;