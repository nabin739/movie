import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';




export default function Counter() {
    let[like,setLike] = useState(0);
    let [dislike,setDislike] = useState(0);
    const incrementlike =()=>{
      
      setLike(like+1)
    
      }
      
    const incrementDislike =()=>{
        setDislike(dislike+1) 
      if(like>0){
        setLike(like-1)
      }
        
    }
    
    return(

    
    <div>
         <IconButton onClick={(incrementlike)}> <Badge badgeContent={like} color="secondary">
        👍
      </Badge></IconButton>
        <IconButton onClick={(incrementDislike) }> <Badge badgeContent={dislike} color="secondary">
        👎
      </Badge></IconButton>
      
    </div>
  );
}
