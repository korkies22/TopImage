import React, { useState,useEffect } from "react";
import { setCurContest } from "../../store/contests";
import { storeAccessKey } from "../../store/accessKey";
import { saveAccessKey } from "../../util/state/localStorageUtil";


import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams, useHistory } from "react-router-dom";

import Contest from "../../components/contest/Contest";
import ActionModal from "../../components/actions/actionModal/ActionModal";
import Loader from "../../components/actions/loader/Loader";

import "./Contest.scss";
import axios from "axios";

function ContestPage() {
  const url = useSelector(state => state.root.url);
  const contest = useSelector(state => state.contests.curContest);
  const token = useSelector(state => state.auth.token);
  const storedAccessKey = useSelector(state => state.accessKey.accessKey)

  let { id } = useParams();
  let history=useHistory();


  const [privateValidation,setPrivateValidation] = useState(false);
  const [offlineMode,setOfflineMode] = useState(false);
  const [accessKey, setAccessKey] = useState();
  const [isLoading,setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Access Key",storedAccessKey);
        setIsLoading(true);
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            "access-key":storedAccessKey
          },
        };
    
        const res = await axios.get(`${url}contests/${id}`,options);
        console.log("RESPONSE",res.data);
        dispatch(setCurContest(res.data));
      } catch (err) {
        if(contest && (contest.private===0) && contest._id===id)
        {
          setIsLoading(false);
          return;
        }
        
        if(err.response && err.response.status!== 403)
          setOfflineMode(true);

        setPrivateValidation(true);

      } finally{
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id,url,dispatch,token]);

  const getData = async ()=>{
    try {
      setIsLoading(true);
      console.log("access key",accessKey);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "access-key":accessKey
        },
      };
  
      const res = await axios.get(`${url}contests/${id}`,options);
      setPrivateValidation(false);

      console.log("Access Key",accessKey);
      saveAccessKey(accessKey);
      dispatch(storeAccessKey(accessKey));


      dispatch(setCurContest(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const modalFormBody=(
    <form className="contestModal">
      <input
        type="text"
        name="accessKey"
        aria-label="accessKey"
        onChange={(e)=>{setAccessKey(e.target.value)}}
      />
    </form>

  )

  return (
    <div className="contestPage">
      {isLoading ? 
        <div className="contestPage__loader">
          <Loader />
        </div> : 
      null}

      {
        privateValidation ? 
        <ActionModal
          modalHeaderTitle={offlineMode?
            `You can´t access private rooms offline :(`:
            `Please enter your access key`}
          modalBody={offlineMode?null:modalFormBody}
          okCBK={offlineMode?null:getData}
          okText ="OK"
          cancelCBK={()=>{history.goBack()}}
          cancelText="Go Back"
        />:null  
      }
      <div className="contestPage__background"></div>
        {contest && !privateValidation ? <Contest contestId={id}></Contest> : null}
      </div>
  );
}

export default withRouter(ContestPage);
