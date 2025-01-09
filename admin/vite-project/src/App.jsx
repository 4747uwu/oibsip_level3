import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import {useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/Inventory'
import AdminOrders from './pages/AdminOrder'
import { useEffect } from 'react'
import Inventory from './pages/inventoryOfStuff'

export const backendUrl = 'http://localhost:5000'



const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      { token === '' ? <Login setToken={setToken}/> :
      <>
        <Navbar setToken={setToken}/>
        <hr/>

        <div className='flex w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add token = {token}/>}/>
              <Route path='/list' element={<List token = {token} />}/>
              <Route path='/adminOrder' element={<AdminOrders/>}/>
              <Route path='/InventoryStuff' element={<Inventory/>}/>
             

            </Routes>
          </div>
        </div>
      </>

      }
        
      
    </div>
  )
}

export default App
