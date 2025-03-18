import React, {useEffect} from 'react';
import axios from 'axios';

const Webhook = () => {
    //const [instagramAccessToken, setInstagramAccessToken] = useState('');

    useEffect(() => {
        const webhookConn = async () => {
          console.log("reached");  
          const response = await axios.get('http://localhost:5000/webhook');
          console.log("Response ",response.data);
          
        };
    
        webhookConn();
      }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           // body: JSON.stringify({ instagramAccessToken }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <button type="submit">Post Webhook</button>
        </form>
    );
};

export default Webhook;
