import React, { useEffect, useState } from 'react'
import Movies from './Movies'


export default function Movielist(movieTake) {
    

    const [ movie, setMovie] = useState([])

    const getMovies = ()=> {
        fetch("https://65f16e71034bdbecc762902e.mockapi.io/nabin",{
            method:"GET",
        }
    )
    .then((data)=> data.json())
    .then((mvs)=>setMovie(mvs))
    }

    useEffect(()=>{
        getMovies()
    }, [])

  return (

    <div className= "movie-list">
        {
            movie.map((list,index)=>(
                <div key = {index}>
                    <Movies movieTake ={list} getMovies={getMovies} />
                </div>
            )
            )
          }
      
    </div>
  )
}
