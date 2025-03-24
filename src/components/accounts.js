import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
//import { useFocusEffect } from '@react-navigation/native';



const Accounts = () =>{
    const [instagramAccounts, setInstagramAccounts] = useState('[]');
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(apiUrl);
    useEffect(
        useCallback(() => {
                
            let isActive = true;
            console.log(isActive);
            const fetchAccounts = async () => {
            try{
                const token = localStorage.getItem('token');
                console.log("get token ", token);
                const response = await axios.get('/accounts/igPages',
                    { headers: { 'Content-Type': 'application/json','Authorization': token } });
                console.log("Response ",response.data);
                if (isActive) {
                    setInstagramAccounts(response.data);
                }
            }catch(e) {
                console.log("error while calling");
            }
            };
    
        fetchAccounts();
        return () => {
            isActive =false;
        }
      }, [])
    );
    

      return (
        <div>
          <h3><p> Your Instagram Accounts.</p></h3><br/>
          <ul>
            { 
                instagramAccounts.length ?
                instagramAccounts.map((recipient) => (
              <li key={recipient.ig_id}>{recipient.ig_id}: {recipient.ig_username}</li>
            ))
            : <p>No Accounts found</p>
            
            }
          </ul>
        
        </div>
      );
}
/*

          <ul>
            { 
                instagramAccounts.length ?
                instagramAccounts.map((recipient) => (
              <li key={recipient.ig_id}>{recipient.ig_id}: {recipient.ig_username}</li>
            ))
            : <p>No Accounts found</p>
            
            }
          </ul>
          */
export default Accounts;
