import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';


const Dashboard = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const history = useNavigate();
  //const apiUrl = process.env.REACT_APP_API_URL;
 //console.log(apiUrl);

  //const [message, setMessage] = useState('');
  //const [cronTime, setCronTime] = useState('');

  useEffect(() => {
    const fetchRecipients = async () => {
      const token = localStorage.getItem('token');
      console.log("fetch token ", token);
      const response = await axios.get(`/accounts/igAccounts`,
        { headers: { 'Content-Type': 'application/json','Authorization': token } });
      console.log("Response ",response.data);
      setRecipients(response.data);
    };

    fetchRecipients();
  }, []);

  const handleAddFacebookAccount = async (e) => {
    e.preventDefault();
    //const token = localStorage.getItem('token');
    history('/addFacebook');
    //await axios.post('http://localhost:5000/accounts/add-igAccount', { instagram_id: instagramId, ig_username: instagramUsername }, { headers: { 'Authorization': `Bearer ${token}` } });
    //setInstagramId('');
    //setInstagramUsername('');
  };
  const handlePostReel = async (e) => {
    e.preventDefault();
    //const token = localStorage.getItem('token');
    console.log("radio value ",selectedValue);
    selectedValue ? history('/postReels',{state : {selectedValue,instagramUsername}}) 
    : alert("please select an Instagram account to post.");
  };
/*
  const handleScheduleMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    history('/schedule');
  };
  */
  const handleGetAccounts = async (e) => {
    e.preventDefault();   
   // const token = localStorage.getItem('token');
    var accountIds = [];
    for (var i=0; i < recipients.length; i++){
      accountIds[i] = recipients[i].ig_id;
    } 
    console.log("igac ",accountIds);
    localStorage.removeItem('accountIds');
    localStorage.setItem('accountIds',JSON.stringify(accountIds));
    history('/accounts');
  };

  const handleChangeAccount= (event) => {
    //event.preventDefault();
    console.log("document ",document.dashboard.accts.value);
    
    var values = event.target.value;
    setSelectedValue(values.split("-")[0]);
    setInstagramUsername(values.split("-")[1]);
   // document.dashboard.accts.checked = true;
  }
 
 // <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />

  return (
    <div>
      <h2>Dashboard</h2>
      <form name="dashboard">
          <button id="fb" type="submit" onClick={handleAddFacebookAccount}>Add Facebook Account</button>
          <button id="post" type="submit" onClick={handlePostReel}>Post Reels</button>
          
          <button id="add" type="submit" onClick={handleGetAccounts}>Add Instagram Accounts</button>
      
      <h3><p> Your Linked Instagram Accounts.</p></h3>
      <ul>
            { 
              recipients.length ?
              recipients.map((recipient) => (
              <li key={recipient.ig_id}>
              <label key={recipient.ig_id}>
          <input
            style={{ width: "auto", display: "inline-block" }}
            type="radio"
            name="accts"
            onChange={(e) =>handleChangeAccount(e)}
            value={recipient.ig_id +"-" +recipient.ig_username}
            
          />
          {recipient.ig_username}
        </label></li>
              
            ))
            : <p>No Accounts found</p>
            
            }
          </ul>
          
            </form>
    </div>
  );
};
export default Dashboard;
/**
 * <table border={3} width={'50%'}>
            <thead><tr><th></th><th> Instagram Id</th>
            <th> Instagram Username</th>
            </tr></thead><tbody>
            {
              recipients.length ?
              recipients.map((recipient,idx) => (
            <tr key={idx}>
            <td><input type="radio" name='accts' value={recipient.ig_id} 
                 checked={ selectedValue === recipient.ig_id}
                 onChange={(event) => handleChangeAccount(event)}/>
                  
            </td>
            <td>{recipient.ig_id}</td><td> {recipient.ig_username}</td>
            </tr>
            ))

            : <tr><td>Loading ...</td></tr>

            }{recipient.ig_id}: {recipient.ig_username}</li>
            </tbody>
            </table>
           
 */
//<!--button id="schedule" type="submit" onClick={handleScheduleMessage}>Schedule Reels</button-->
 //checked={ selectedValue === recipient.ig_id}
                  //onChange={(event) => handleChangeAccount(event)} 
//onClick={(event) => handleClickAccount(event)}/>
//<label htmlFor={recipient.ig_id} className="radio-label">{idx}</label>
