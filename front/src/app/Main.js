import React,{useEffect} from "react";
import Router from "./Router";
import "./App.css";

import axios from "axios";

import {useSelector,useDispatch} from "react-redux";
import { setContests, addContest,deleteContest,updateContest } from "../store/contests";

import socketIOClient from "socket.io-client";
import * as Events from "../util/socketio/events";

function Main() {

  const url = useSelector(state => state.root.url);
  const socketUrl = useSelector(state => state.root.socketUrl);
  const token=useSelector(state=>state.auth.token);
  const dispatch = useDispatch();

  useEffect(()=>{
    async function getData() {
      try {
        let res = await axios.get(`${url}contests`,{headers:{Authorization:`Bearer ${token}`}});
        dispatch(setContests(res.data));  
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    }

    function setupSocket(){
      const socket = socketIOClient(socketUrl);
      socket.on(Events.CONTEST_EVENT, (data) => 
      {
        switch(data.action){
        case Events.ACTION_INSERT:
          return dispatch(addContest(data.payload));
        case Events.ACTION_DELETE:
          return dispatch(deleteContest(data.payload));
        case Events.ACTION_UPDATE:
          return dispatch(updateContest(data.payload));
        default :
          return;
        }
            
      });
      return socket;
    }

    getData();
    const socket=setupSocket();

    return ()=> socket.disconnect();
  },[dispatch,socketUrl,token,url]);


  return (
    <Router>
    </Router>
  );
}

export default Main;
