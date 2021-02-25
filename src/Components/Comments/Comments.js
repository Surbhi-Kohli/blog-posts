import React from "react";
function Comments(props)
{
  return (<div><b>Coments:</b>
     { props.comments.map(d=><div key={d.id}>{d.body}</div>)}</div>);
}
export default Comments;