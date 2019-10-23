import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout as deleteUserInfo } from "../../util/state/localStorageUtil";
import {logout} from "../../store/auth";
import Nav from "../../components/schedule/nav/Nav";
import Main from "../../components/schedule/main/Main";
function Schedule(props) {

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
    <div className="schedulePage">
      <Nav></Nav>
      <Main></Main>
    </div>
  );
}

Schedule.propTypes = {
  history: PropTypes.any,
};
export default withRouter(Schedule);