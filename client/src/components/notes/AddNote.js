import React, { useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './AddNote.css'
function AddNote({user,setLoginUser}) {
  
  let navigate = useNavigate();
  const [title,setTitle]=useState()
  const [description,setDescription]=useState()
  // const [note,setNote]=useState({title:"",description:""})
  const data={title,description}
  // console.log(data)
  const addUserDetails = async() => {
    try {
      const token = JSON.parse(localStorage.getItem('jwtToken'));
  
      if (!token) {
        // Handle the case when the token is not available
        // For example, redirect to login or display an error message
        throw new Error("Authentication token not found");
      }
  
      const response = await axios.post("https://quicknotes-server.onrender.com/note",data, {
        headers: {
          Authorization: `bearer ${token}`
        },
      });
      // setNotes(response.data);
          // alert("Data Added!")
    navigate('/');
    console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something Went Wrong! or Fill all box")
    }
}
  return (
    <div>
      <Navbar user={user} setLoginUser={setLoginUser}/>
      <div className="adding reg">
            <h1>Add Note</h1>
            <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}}  placeholder="Enter title"></input><br/>
            <textarea className="textarea" name="description" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter Detail" />
            <div className="button" onClick={()=>{addUserDetails()}}>Add Data</div>

        </div>
    </div>
  )
}

export default AddNote
