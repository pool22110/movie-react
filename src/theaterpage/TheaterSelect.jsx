
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../componants/Navbar/navbar'
import styles from './Theater.module.css'

export default function TheaterSelect() {
    const [theaters,settheater] = useState([])
    const {id} = useParams()
    console.log(id)
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/theater/?movie_id='+id)
        .then((response)=>{
          console.log(response.data)
          settheater(response.data)
        })
        // .catch()
        .catch((error)=>{
          console.error("Error fetching movie details",error)
        })
    },[id])
  return (
    <div>
      <Navbar/>
      <center>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>Theater Name</th>
              <th>City</th>
              <th>Date</th>
              <th>Available Seats</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((theater) => (
              <tr key={theater.id}>
                <td>{theater.name}</td>
                <td>{theater.city}</td>
                <td>{theater.movie_timing}</td>
                <td>{theater.available_seats}</td>
                <td>
                  <Link to={{ pathname: `/booking/${theater.name}` }}>
                    <button>Book Seats</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
      </div>
      </center>
    </div>
  )
}
