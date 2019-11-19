import React, { useState,useEffect } from "react";
import { setCurContest } from "../../store/contests";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";

import Contest from "../../components/contest/Contest";
import ActionModal from "../../components/actions/actionModal/ActionModal";
import Loader from "../../components/actions/loader/Loader";

import "./Contest.scss";
import axios from "axios";

function ContestPage() {
  const url = useSelector(state => state.root.url);
  const contest = useSelector(state => state.contests.curContest);
  const token = useSelector(state => state.auth.token);


  let { id } = useParams();
  const [privateValidation,setPrivateValidation] = useState(false); // FIXME: How can we make rooms private without querying the access key first?
  const [accessKey, setAccessKey] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
      
        setIsLoading(true);
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
    
        const res = await axios.get(`${url}contests/${id}`,options);
        dispatch(setCurContest(res.data));
      } catch (err) {
        console.log(err);
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
          modalHeaderTitle="Please Enter your access key"
          modalBody={modalFormBody}
          okCBK={getData}
          okText ="OK"
        />:null  
      }
      <div className="contestPage__background"></div>
      {contest ? <Contest contestId={id}></Contest> : null}
    </div>
  );
}

export default withRouter(ContestPage);
