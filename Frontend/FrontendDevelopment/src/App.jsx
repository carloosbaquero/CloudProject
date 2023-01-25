import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './screens/Home';
import { SignIn } from './screens/SignIn';
import { Upload } from './screens/Upload';
import { Comments } from './screens/Comments';
import { ProUser } from './screens/ProUser';
import { Profile } from './screens/Profile';
import { ErrorPage } from './screens/ErrorPage';

function App () {
  return (
    <BrowserRouter>
      <Navigation/>

      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path='/upload' element={<Upload/>}/>
        </Route>

        <Route index element={<Home/>}/>

        <Route element={<ProtectedRoute/>}>
        <Route path='/home' element={<Home/>}/>
        </Route>

        <Route path='/signIn' element={<SignIn/>}/>

        <Route element={<ProtectedRoute/>}>
        <Route path='/comments/:id' element={<Comments/>}/>
        </Route>

        <Route element={<ProtectedRoute/>}>
        <Route path='/prouser' element={<ProUser/>}/>
        </Route>

        <Route element={<ProtectedRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>

        <Route path='*' element={<ErrorPage/>}/>

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

