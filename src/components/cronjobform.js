import React, { useState } from "react";
import UploadReel from "./upload";

const CronJobForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    frequency: "",
    instagramAccount: "",
    filePath: ""
  });
  //const apiUrl = process.env.REACT_APP_API_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const setCronTimeString =(props) => {
    console.log(props);
    
    const scheduled_frequency = props.frequency;
    const [year,month,day] = props.date.split("-");
    const [hour, minutes] = props.time.split(":");
    console.log(year, month, day, hour, minutes);
    var cronString = "0 "+minutes + " " +hour + " " + day + " " +month + " * " +year;
    console.log(cronString);
    switch (scheduled_frequency) {
      case "d" :
        cronString =  "0 "+minutes + " " +hour + " * * * *";
        return cronString;
      case "m" :
        cronString =  "0 "+minutes + " " +hour + " "+ day +" * * "+year;
        return cronString;
      case "w" :
        cronString =  "0 "+minutes + " " +hour + " * * MON-FRI " +year;
        return cronString;
      default :
        var dayofweek = scheduled_frequency?scheduled_frequency : "*";
        cronString = "0 "+minutes + " " +hour + " * * " +dayofweek+ " " +year;
        console.log(cronString);
        return cronString;
    } 
    
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data ",formData);
    const cronTimeString = setCronTimeString(formData);
    const jsonString = {"cronTime":cronTimeString};
    const token = localStorage.getItem('token');
    await fetch(`/schedule`, {
      method: "POST",
       headers: { 'Content-Type': 'application/json','Authorization': token } ,
      body: JSON.stringify(jsonString),
    });
    alert("Cron job scheduled!");
  };

  return (
    <div>
    <h2>Post Reels</h2><br/>
    
      <select name="instagramAccount" onChange={handleChange} required>
        <option value="">Select Instagram Account</option>
        <option value="17841419644366416">Rajesh</option>
        <option value="17841466352154266">Kadam</option>
      </select><br/>
      {
        <UploadReel/>
      }
      
      <br/>
      <form onSubmit={handleSubmit}>
      <h4><p>Schedule your post</p></h4>
      <input name="date" type="date" onChange={handleChange} required />
      <input name="time" type="time" onChange={handleChange} required /><br/>
      <select name="frequency" onChange={handleChange}>
        <option value="">Select Frequency</option>
        <option value="d">Daily</option>
        <option value="m">Monthly</option>
        <option value="w">Weekdays</option>
        <option value="0">Sunday</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>    
      </select>
      <br/>
      <button type="submit">Schedule</button>
    </form>
    </div>
  );
};

export default CronJobForm;
