import React, { useState, useEffect } from "react";
import axios from "axios";
// import Cookies from "js-cookie";
import './Card.css'
import { Link } from "react-router-dom";

function Card() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('jwtToken'));
  
      if (!token) {
        // Handle the case when the token is not available
        // For example, redirect to login or display an error message
        throw new Error("Authentication token not found");
      }
  
      const response = await axios.get("http://localhost:5000/note", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const deletedata = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('jwtToken'));
  
      if (!token) {
        // Handle the case when the token is not available
        // For example, redirect to login or display an error message
        throw new Error("Authentication token not found");
      }
  
      const response = await axios.delete(`http://localhost:5000/note/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      // setNotes(response.data);
      console.log(response)
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderDescription = (description) => {
    const lines = description.split('\n');

    return lines.map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div className="cardheader">
      {notes.map((note) => (
        <div className="cardbox" key={note._id}>
          <h3 className="title">Title : {note.title}</h3>
          <h3 className="title">Description</h3>
          {/* <p>{note.description}</p> */}
          {renderDescription(note.description)}
          <button onClick={()=>{deletedata(note._id)}} className="button">Delete</button>
          <button className="button"><Link className="editbtn" to={`/editnote/${note._id}`}>Edit</Link></button>
        </div>
      ))}
    </div>
  );
}

export default Card;
