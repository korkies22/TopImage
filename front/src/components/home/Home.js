/*eslint no-undef: "error"*/

import React, { useState, useRef } from 'react';
import './Home.scss';

import ActionModal from '../actions/actionModal/ActionModal';
import '../actions/actionModal/ActionModal.scss';
import Loader from '../actions/loader/Loader';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import '../actions/Flatpickr.scss';
import Flatpickr from 'react-flatpickr';
import Filter from '../search/filter/Filter';
import FilePreviewList from '../util/filePreviewList/FilePreviewList';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContest, setNewContest] = useState({ private: false });
  const [useRandom, setUseRandom] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const useContests = () => useSelector(state => state.contests.contests, []);
  const contests = useContests();

  const buttonModal = useRef(null);

  let history = useHistory();

  const beforeCurrentTime = date => {
    return date.getTime() < new Date().getTime();
  };

  const createContest = async e => {
    e.preventDefault();

    if (!newContest.name || newContest.name.trim() === '')
      return setErrorMsg('You must specify the name of your contest');
    if (!newContest.endDate)
      return setErrorMsg('Your contest needs an end date');
    if (beforeCurrentTime(newContest.endDate))
      return setErrorMsg('Your contest end date can`t be before now');
    if (!useRandom && (!files || files.length === 0))
      return setErrorMsg(
        'You must upload something for contest.... I mean anything'
      );
    if (useRandom && newContest.limit === undefined)
      return setErrorMsg('You need to select a type of image');
    if (useRandom && (!newContest.topic || newContest.topic.trim() === ''))
      return setErrorMsg('You must specify the topic of your contest');

    let formData = new FormData();
    formData.append('name', newContest.name);

    if (newContest.topic) formData.append('topic', newContest.topic);
    if (newContest.limit) formData.append('limit', newContest.limit);
    if (newContest.private !== undefined)
      formData.append('private', newContest.private ? '1' : '0');

    formData.append('endDate', newContest.endDate);
    files.forEach((el, index) => {
      formData.append(`img_${index}`, el);
    });

    await sendContest(formData);
  };

  const sendContest = async data => {
    setIsLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    let ans = await axios.post(`${url}contests`, data, options);

    setIsLoading(false);
    history.push(`/contests/${ans.data.insertedId}`);
  };

  const onChange = e => {
    let tempFiles = files.concat(Array.from(e.target.files));
    setFiles(tempFiles);
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const removeFile = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const modalFormBody = (
    <form className="contestModal" onSubmit={e => createContest(e)}>
      <div className="contestModal__row">
        <div className="contestModal__col">
          <label htmlFor="name" className="contestModal__inputLabel">
            Name
          </label>
          <input
            type="text"
            name="name"
            aria-label="name"
            onChange={e => {
              setErrorMsg(null);
              setNewContest({ ...newContest, name: e.target.value });
            }}
          />
        </div>
        <div className="contestModal__col">
          <label htmlFor="date" className="contestModal__inputLabel">
            End Date
          </label>
          <Flatpickr
            aria-label="Date end"
            name="date"
            placeholder="Contest end date"
            options={{
              minDate: formatDate(new Date()),
              minuteIncrement: 10,
              mode: "single",
              dateFormat: "d-m-Y",
            }}
            value={newContest.endDate}
            onChange={date => {
              setErrorMsg(null);
              setNewContest({ ...newContest, endDate: new Date(date) });
            }}
            className="modal__form__input modal__form__input--calendar"
          />
        </div>
      </div>
      <div className="contestModal__row">
        <div className="contestModal__col">
          <label htmlFor="images" className="contestModal__inputLabel contestModal__inputLabel--multimedia">
            Your multimedia
          </label>

          <FilePreviewList
            files={files}
            removeFile={index => removeFile(index)}
          ></FilePreviewList>

          <button className="contestModal__fileContainer">
            {files && files.length !== 0
              ? `Add more`
              : "Add your multimedia"}
            <input
              type="file"
              id="multi"
              accept="image/*,video/mp4,video/x-m4v,video/*"
              onChange={onChange}
              multiple
            />
          </button>

          {/*Use random images*/}
          <label htmlFor="useRandomImg" className="contestModal__inputLabel">
            <input
              name="useRandomImg"
              id="useRandomImg"
              type="checkbox"
              checked={useRandom}
              onChange={e => {
                console.log('llega')
                setNewContest({
                  ...newContest,
                  limit: !useRandom && !newContest.limit ? '1' : undefined,
                });
                setUseRandom(!useRandom);
              }}
            />
            Wanna complete with random images?
          </label>

          {useRandom ? (
            <div>
              <label htmlFor="topic" className="contestModal__inputLabel">
                Topic
                <input
                  type="text"
                  name="topic"
                  aria-label="topic"
                  onChange={e => {
                    setErrorMsg(null);
                    setNewContest({ ...newContest, topic: e.target.value });
                  }}
                />
              </label>

              <label htmlFor="limit" className="contestModal__inputLabel">
                How many? 
                <input
                  type="number"
                  name="limit"
                  value={newContest.limit ? parseInt(newContest.limit) : ''}
                  min="1"
                  step="1"
                  aria-label="limit"
                  onChange={e => {
                    setErrorMsg(null);
                    setNewContest({ ...newContest, limit: e.target.value });
                  }}
                />
              </label>
            </div>
          ) : null}

          {/* Private contests*/}
          <label htmlFor="private" className="contestModal__inputLabel">
            <input
              name="private"
              id="private"
              type="checkbox"
              checked={newContest.private}
              onChange={e =>
                setNewContest({ ...newContest, private: !newContest.private })
              }
            />
            Wanna make your contest private?
          </label>

          {newContest.private?<p className="contestModal__disclaimer">A new access key will be generated and displayed on the top right corner of the contest window. Give this key to those persons that you want to give access to your contest.</p>:null}
        </div>
      </div>
      <div className="contestModal__col">
        {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
        <button className="home__button home__button--internal" type="submit">
          + NEW TOP IMAGE
        </button>
      </div>
    </form>
  );

  const deactivateModal = () => {
    setNewContest({
      name: '',
      type: '',
      endDate: null,
      images: [],
    });

    console.log('Deactivate?');
    setErrorMsg('');
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      {isLoading ? <Loader /> : null}

      <button
        className="home__button"
        onClick={() => setIsModalOpen(true)}
        ref={buttonModal}
      >
        <p className="home__plus">+</p>
        NEW TOP IMAGE
      </button>

      {isModalOpen ? null : (
        <button
          className="home__fab"
          onClick={() => setIsModalOpen(true)}
          ref={buttonModal}
        >
          +
        </button>
      )}

      <Filter contests={contests} hasDate={true}></Filter>

      {isModalOpen ? (
        <ActionModal
          close={() => {
            setIsModalOpen(false);
            if (buttonModal.current) {
              buttonModal.current.focus();
            }
          }}
          modalHeaderTitle="New Top Image"
          modalBody={modalFormBody}
          okCBK={() => {}}
          cancelCBK={() => {
            deactivateModal();
          }}
        />
      ) : null}
    </div>
  );
}

export default Home;
