import React,{useEffect} from "react";
import { Provider } from "react-redux";
import store from "../store/mainStore";
import Router from "./Router";
import "./App.css";

import axios from "axios";

import {useSelector,useDispatch} from "react-redux";
import { setContests, addContest,deleteContest } from "../store/contests";

import socketIOClient from "socket.io-client";
import * as Events from "../util/socketio/events";

function Main() {

  const url = useSelector(state => state.root.url);
  const token=useSelector(state=>state.auth.token);
  const user=useSelector(state=>state.auth.user);
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
        const socket = socketIOClient("http://localhost:4000");
        console.log("Connected to",url);
        socket.on(Events.CONTEST_ADD_EVENT, (data) => 
        {
            console.log("ADD",data);
            dispatch(addContest(data));
        });
        socket.on(Events.CONTEST_DELETE_EVENT, (data) => 
        {
            console.log("DELETE",data);
            dispatch(deleteContest(data._id));
        });
    }

    getData();
    setupSocket();
  },[]);


  return (
      <Router>
      </Router>
  );
}

export default Main;
