import React,{useState,useRef} from "react";
import "./Home.scss";

import ActionModal from "../actions/actionModal/ActionModal";
import "../actions/actionModal/ActionModal.scss";

import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

import "./Flatpickr.scss";
import Flatpickr from "react-flatpickr";

function Home(props) {
    const [newContest,setNewConstest]=useState({});
    const [errorMsg,setErrorMsg]=useState("");
    const [isUpload,setIsUpload]=useState(undefined);
    const [files,setFiles]=useState([]);

    const newContestModal = useRef(null);
    
    const url = useSelector(state => state.root.url);
    const token = useSelector(state => state.auth.token);
    const useActiveContests = () =>
      useSelector(state => state.contests.activeContests, []);
    const activeContests=useActiveContests();

    const data=activeContests?activeContests.map(el=><li>{el.name+" "+el.endDate}</li>):["nOTHING"]
    
    let history = useHistory();

    const beforeCurrentTime=(date)=>{
        return date.getTime()<new Date().getTime();  
    }

    const createContest=async (e)=>{
        e.preventDefault();

        if(!newContest.name || newContest.name.trim()==="")
            return setErrorMsg("You must specify the name of your contest");
        if(!newContest.topic || newContest.topic.trim()==="")
            return setErrorMsg("You must specify the topic of your contest");
        if(!newContest.endDate)
            return setErrorMsg("Your contest needs an end date");
        if(beforeCurrentTime(newContest.endDate))
            return setErrorMsg("Your contest end date can`t be before now");
        if(isUpload===undefined)
            return setErrorMsg("You need to select a type of image");
        if(isUpload && (!files || files.length!==4))
            return setErrorMsg("You must upload 4 images for the contest");

        let formData=new FormData();
        formData.append("name",newContest.name);
        formData.append("topic",newContest.topic);
        formData.append("endDate",newContest.endDate);
        files.forEach((el,index)=>{
            formData.append(`img_${index}`,el);
        })
        console.log("FORM",formData);

        await sendContest(formData);
    }

    const sendContest=async (data)=>{
        const options = {
            headers: { Authorization: `Bearer ${token}`,'Content-Type':'multipart/form-data' }
          };
            
        let ans=await axios.post(`${url}contests`,
            data, options);

        console.log(ans.data);
        history.push(`/contests/${ans.data.insertedId}`);  
    }

    const onChange=(e)=>{
        const files = Array.from(e.target.files)
        setFiles(files);
    }

    const formatDate=(date)=>{
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    const modalFormBody=(
        <form className="contestModal" onSubmit={(e)=>createContest(e)}>
            <div className="contestModal__row">
                <div className="contestModal__col">
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" 
                            name="name"
                            onChange={(e)=>{setErrorMsg(null);setNewConstest({...newContest,name:e.target.value});}}/>

                </div>
                <div className="contestModal__col">
                    <label htmlFor="date">
                        End Date 
                    </label>
                    <Flatpickr data-enable-time
                            name="date"
                            placeholder="Contest end date"
                            options={{minDate:formatDate(new Date()),minuteIncrement:30}}
                            value={newContest.endDate}
                            onChange={date => {setErrorMsg(null);setNewConstest({...newContest,endDate:new Date(date)}); }} 
                            className="modal__form__input modal__form__input--calendar"
                        />
                </div>
            </div>
            <div className="contestModal__row">
                <div className="contestModal__col">
                    <label htmlFor="topic">
                        Topic
                    </label>
                    <input type="text" name="topic"
                            onChange={(e)=>{setErrorMsg(null);setNewConstest({...newContest,topic:e.target.value});}}/>
                </div>
                <div className="contestModal__col">
                    <label htmlFor="images">
                        Images
                    </label>
                    <div name="images" className="contestModa__row">
                        <label>
                            <input type="radio" value="own" checked={isUpload===true} 
                                onChange={(e)=>{setIsUpload(true);}}/>
                            Own
                        </label>
                        <label>
                            <input type="radio" value="random" checked={isUpload===false}
                                onChange={(e)=>{setIsUpload(false);setErrorMsg(null);setNewConstest({...newContest,images:[]})}} />
                            Random
                        </label>
                    </div>
                    <br/>
                    {isUpload?<input type='file' id='multi' accept="image/*" onChange={onChange} multiple />:null}
                </div>
            </div>
            <div className="contestModal__col">
                {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
                <button className="home__button" type="submit">
                    <img className="home__img" src={require("../../assets/icons/logo.svg")} alt="Top Image logo. A lightbulb inside an image icon"/>
                    NEW TOP IMAGE
                </button>
            </div>
        </form>
    );

    const deactivateModal=()=>{
        setNewConstest({
            name:"",
            type:"",
            endDate:null,
            images:[]
          });
      
          console.log("Deactivate?");
          setErrorMsg("");
          newContestModal.current.toggle();
    }

    return(
        <div className="home">
            <button className="home__button" onClick={()=>newContestModal.current.toggle()}>
                <img className="home__img" src={require("../../assets/icons/logo.svg")} alt="Top Image logo. A lightbulb inside an image icon"/>
                NEW TOP IMAGE
            </button>


            <ActionModal ref={newContestModal}
                modalHeaderTitle="New Top Image"
                modalBody={modalFormBody}
                okCBK={() => {}}
                cancelCBK={()=>{deactivateModal();}}/>
        </div>
    )
}

export default Home;