import React, { useState } from "react";
import axios from "axios";
import {useLocation,useNavigate} from 'react-router-dom';
import '../index.css';

const PostReels = () => {
  const [formData, setFormData] = useState({
        videoUrl: "",
        caption: "",
        thumbOffset: "",
        date: "",
        time: "",
        frequency: "",
    });
    const [file, setFile] = useState(null);
    //const [filePath, setFilePath] = useState("");
    //const [containerId, setContainerId] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const history = useNavigate();
    console.log('location ',location.state);
    const instagramId = location.state.selectedValue;
    const ig_username = location.state.instagramUsername;
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

  const handleSubmit = async (type,e) => {
    e.preventDefault();

    console.log("values ",formData, "id ", instagramId, " file ", file);
    if (formData.videoUrl === "" && file === null ){
        console.error("Please enter atleast a video URL or choose a localfile");
    }
    else {
        const data = new FormData();
        if (file != null){
            data.append("video",file);
        }
        else {
            data.append("videoUrl", formData.videoUrl);
        }
        data.append("caption", formData.caption);
        data.append("thumbOffset", formData.thumbOffset);
        data.append("instagramId",instagramId);
        try {
            if (file !== null) {
                const response = await axios.post(`${apiUrl}/uploads/upload/`+instagramId+"", data, {
                    headers: {
                            "Content-Type": "multipart/form-data",
                    },
                    
                });
                if(response.status === 200) {
                    alert(`${response.data.message}`);
                    const values = response.data;
                    console.log(values.filePath);
                    data.append("videoUrl",values.filePath);
                }
                else {
                    console.error("file uploading failed...");
                }
            }
            data.append("accountId",instagramId);
            //console.log("got dat ", data.entries());
            data.forEach((d,e) =>{
              console.log(d, " ",e)
            });
            
            if (type ==="post") {
                const response = await axios.post(`${apiUrl}/uploads/uploadReels`, data,{
                        headers: {
                                    "Content-Type": "application/json",
                            },
                });
                console.log(response.data);
                var pubData = new FormData();
                pubData.append("accountId",response.data.accountId);
                pubData.append("containerId", response.data.containerId);
                pubData.append("videoUrl", formData.videoUrl);
                pubData.append("caption", formData.caption);
                pubData.append("coverUrl", "");
                pubData.append("thumbOffset", formData.thumbOffset);
                if (response.data.uploaded) {
                    const publish = await axios.post(`${apiUrl}/uploads/publishReels`, pubData,{
                        headers: {
                                "Content-Type": "application/json",
                        },
                    }

                    );
                    console.log(publish.data);
                    if ((publish.data.PublishedMediaId === undefined) | (publish.data.PublishedMediaId === ""))
                    {
                        alert("Reel could not be published at this moment, try again later");
                    }
                    else {
                      data.append("publishedMediaId", publish.data.publishedMediaId);
                      data.append("permalink", publish.data.permalink );
                      data.forEach((d,e) =>{
                        console.log(d, " ",e)
                      });
                      
                    }   
                    history('/dashboard', {state : data});

                }
            }
            else if (type === "schedule") {
                console.log("insta id ",instagramId);
                var inputData = new FormData();
                const cronTimeString = setCronTimeString(formData);
                inputData.append("videoUrl", formData.videoUrl);
                inputData.append("caption", formData.caption);
                inputData.append("thumbOffset", formData.thumbOffset);
                inputData.append("accountId",instagramId);
                inputData.append("scheduled_date",formData.date);
                inputData.append("scheduled_time",formData.time);
                inputData.append("scheduled_frequency",formData.frequency);
                inputData.append("cronTime",cronTimeString);
                
                console.log("after adding",inputData.entries());
                const token = localStorage.getItem('token');
                const schedule = await axios.post(`${apiUrl}/uploads/schedule`, inputData,{
                    headers: {
                            "Content-Type": "application/json", 'Authorization': token
                    },
                });
                console.log(schedule);
                alert("Cron job scheduled!");

            }
        } catch (error) {
        console.error("Error uploading file", error);
        alert("Error posting Reel");
        }
    }
  };

  return (
    <div>
    <h3>Post Reels to {ig_username} account. </h3>
    <form>
      <label htmlFor="videoUrl">Video Url: </label><input type="text" name="videoUrl" style={{width:'50%'}} onChange={handleChange}/><br/>
      <span><p>OR</p></span>
      <label htmlFor="video" >Choose File:   &nbsp;&nbsp; </label><input type="file" name="video" onChange={handleFileChange}/><br/>
      <label htmlFor="caption" >Caption:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label><input type="text" name="caption" onChange={handleChange}/><br/>
      <label htmlFor="thumbOffset">Thumb Offset: </label><input type="text" name="thumbOffset" onChange={handleChange}/><br/>
      
        <br/>
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
      <button type="submit" onClick={(e) => handleSubmit("post",e)}>Post Reel</button>
      <button type="submit" onClick={(e) => handleSubmit("schedule",e)}>Schedule Reel</button>
    </form>
    </div>
  );
};

export default PostReels;
