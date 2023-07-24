import React from 'react'
import './Home.css'
import Navbar from './Navbar'
import Card from './Card'
function Home({user,setLoginUser}) {
  return (
    <div className='homeheader'>
      <Navbar user={user} setLoginUser={setLoginUser}/>
      <Card/>
      
    </div>
  )
}

export default Home
