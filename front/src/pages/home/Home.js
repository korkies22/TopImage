import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Home.scss";

import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout as deleteUserInfo } from "../../util/state/localStorageUtil";
import {logout} from "../../store/auth";
import HomeComponent from "../../components/home/Home";

function Home(props) {

  const dateTimeout = useSelector(state => state.auth.tokenTimeout);
  const dispatch= useDispatch();
  useEffect(() => {
    let timeout=setTimeout(() => {
      deleteUserInfo();
      dispatch(logout());
      props.history.push("/login");
    }, new Date(dateTimeout).getTime() - new Date().getTime() );
    return ()=>{
      clearTimeout(timeout);
    };
  }, [props.history, dateTimeout,dispatch]);
  return (
    <div className="home">
      <HomeComponent/>
    </div>
  );
}

Home.propTypes = {
  history: PropTypes.any,
};
export default withRouter(Home);