import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setCurContest } from '../../store/contests';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import Contest from '../../components/contest/Contest';
import './Contest.scss';
import axios from 'axios';

function ContestPage() {
  const url = useSelector(state => state.root.url);
  const contest = useSelector(state => state.contests.curContest);
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}contests/${id}`);
        dispatch(setCurContest(res.data));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="contestPage">
      <div className="contestPage__background"></div>
      {contest ? <Contest contestId={id}></Contest> : null}
    </div>
  );
}

export default withRouter(ContestPage);
