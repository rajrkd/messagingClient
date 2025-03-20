import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/Dashboard';
import Webhook from './components/Webhook';
import CronJonForm from './components/cronjobform';
import UploadReel from './components/upload';
import Accounts from './components/instagramAccounts';
import PostReels from './components/postReels';
import FBLogin from './components/fbLogin';
//
const App = () => {

 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/fblogin" element={<FBLogin/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/webhook" element={<Webhook/>} />
        <Route path="/schedule" element={<CronJonForm/>} />
        <Route path="/uploads" element={<UploadReel/>} />
        <Route path="/accounts" element={<Accounts/>} />
        <Route path="/postReels" element={<PostReels/>} />
      </Routes>
    </Router>
   
  );
  
};

export default App;
