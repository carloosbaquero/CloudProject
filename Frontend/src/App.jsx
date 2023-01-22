import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './screens/Home';
import { SignIn } from './screens/SignIn';
import { Upload } from './screens/Upload';
import { Comments } from './screens/Comments';
import { ProUser } from './screens/ProUser';

function App () {

  const [user, setUser] = useState(null)

  const login = () => {
    setUser({
      id:1,
      name: "Admin"
    })
  }

  const logout = () => setUser(null)

  return (
    <BrowserRouter>
      <Navigation/>

      <Routes>
        {/*<Route element={<ProtectedRoute user={user}/>}>*/}
        <Route path='/upload' element={<Upload/>}/>
        {/* </Route> */}
        <Route index element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/comments/:id' element={<Comments/>}/>
        <Route path='/prouser' element={<ProUser/>}/>
      </Routes>
    
    </BrowserRouter>
  );
    
}

function Navigation() {
  return 
  <nav>
    <ul>
      <li>
        <Link to="/home">Home</Link>
      </li>

      <li>
        <Link to="/upload">Upload</Link>
      </li>

      <li>
        <Link to="/signIn">SignIn</Link>
      </li>
    </ul>
  </nav>
}

export default App;

