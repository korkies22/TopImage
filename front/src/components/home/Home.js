import React from "react";
import "./Home.scss";

import ActionModal from "../actions/actionModal/ActionModal";
import "../actions/actionModal/ActionModal.scss";

import {useSelector,useDispatch} from "react-redux";


function Home() {
    const url = useSelector(state => state.root.url);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
  
    const dispatch = useDispatch();
    const useActiveContests = () =>
      useSelector(state => state.contests.activeContests, []);
    const activeContests=useActiveContests();
    const useContests = () =>
      useSelector(state => state.contests.contests, []);
    const contests=useContests();

    console.log("CONTESTS",contests);

    const rendered=contests?contests.map(el=><li>{el.name+" "+el.endDate}</li>):["nOTHING"]
    return(
        <div>
            {rendered}
        </div>
    )
}

export default Home;