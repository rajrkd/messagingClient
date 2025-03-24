import React, { useState } from "react";
import axios from "axios";

const UploadReel = () => {
  const [file, setFile] = useState(null);
  //const apiUrl = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`File uploaded: ${response.data}`);
      const values = JSON.stringify(response.data);
      const filePath = values.filePath;
      console.log(filePath);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file");
    }
  };

  return (
    <div>
    <h3>Upload Video</h3>
    <form onSubmit={handleSubmit}>
      <input type="file" name="video" onChange={handleFileChange} required /><br/>
      <button type="submit">Upload Reel</button>
    </form>
    </div>
  );
};

export default UploadReel;
