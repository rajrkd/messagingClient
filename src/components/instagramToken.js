import React, { useState } from 'react';

const InstagramToken = ({ token }) => {
    const [instagramAccessToken, setInstagramAccessToken] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/messages/instagram-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ instagramAccessToken }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={instagramAccessToken}
                onChange={(e) => setInstagramAccessToken(e.target.value)}
                placeholder="Enter Instagram Access Token"
                required
            />
            <button type="submit">Save Instagram Token</button>
        </form>
    );
};

export default InstagramToken;
