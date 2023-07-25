import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditNote.css';

function EditNote({ user, setLoginUser }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('jwtToken'));

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(`https://quicknotes-server.onrender.com/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data)
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const saveData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('jwtToken'));

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const updatedNote = { title, description };

      const response = await axios.put(`https://quicknotes-server.onrender.com/note/${id}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // alert('Data saved');
      navigate('/');
      console.log(response);
    } catch (error) {
      console.error('Error saving data:', error);
      alert("Something Went Wrong! or Fill all box")
    }
  };

  return (
    <div>
      <Navbar user={user} setLoginUser={setLoginUser} />
      <div className="adding reg">
        <h1>Edit Note</h1>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        /><br />
        <textarea
          className="textarea"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Detail"
        />
        <div className="button" onClick={saveData}>
          Save Data
        </div>
      </div>
    </div>
  );
}

export default EditNote;
