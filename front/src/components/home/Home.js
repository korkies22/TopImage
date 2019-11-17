/*global require*/
/*eslint no-undef: "error"*/

import React, { useState, useRef } from "react";
import "./Home.scss";

import ActionModal from "../actions/actionModal/ActionModal";
import "../actions/actionModal/ActionModal.scss";
import Loader from "../actions/loader/Loader";
import "../actions/loader/Loader.scss";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "../actions/Flatpickr.scss";
import Flatpickr from "react-flatpickr";
import Filter from "../search/filter/Filter";
import FilePreviewList from '../util/filePreviewList/FilePreviewList'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContest, setNewConstest] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isUpload, setIsUpload] = useState(undefined);
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

    if (!newContest.name || newContest.name.trim() === "")
      return setErrorMsg("You must specify the name of your contest");
    if (!newContest.topic || newContest.topic.trim() === "")
      return setErrorMsg("You must specify the topic of your contest");
    if (!newContest.endDate)
      return setErrorMsg("Your contest needs an end date");
    if (beforeCurrentTime(newContest.endDate))
      return setErrorMsg("Your contest end date can`t be before now");
    if (isUpload === undefined)
      return setErrorMsg("You need to select a type of image");
    if (isUpload && (!files || files.length < 2 || files.length > 4))
      return setErrorMsg(
        "You must upload between 2 and 4 images for the contest"
      );

    let formData = new FormData();
    formData.append("name", newContest.name);
    formData.append("topic", newContest.topic);
    formData.append("endDate", newContest.endDate);
    files.forEach((el, index) => {
      formData.append(`img_${index}`, el);
    });
    console.log("FORM", formData);

    await sendContest(formData);
  };

  const sendContest = async data => {
    setIsLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    let ans = await axios.post(`${url}contests`, data, options);

    setIsLoading(false);
    console.log(ans.data);
    history.push(`/contests/${ans.data.insertedId}`);
  };

  const onChange = e => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
              setNewConstest({ ...newContest, name: e.target.value });
            }}
          />
        </div>
        <div className="contestModal__col">
          <label htmlFor="date" className="contestModal__inputLabel">
            End Date
          </label>
          <Flatpickr
            data-enable-time
            aria-label="Date end"
            name="date"
            placeholder="Contest end date"
            options={{ minDate: formatDate(new Date()), minuteIncrement: 30 }}
            value={newContest.endDate}
            onChange={date => {
              setErrorMsg(null);
              setNewConstest({ ...newContest, endDate: new Date(date) });
            }}
            className="modal__form__input modal__form__input--calendar"
          />
        </div>
      </div>
      <div className="contestModal__row">
        <div className="contestModal__col">
          <label htmlFor="topic" className="contestModal__inputLabel">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            aria-label="topic"
            onChange={e => {
              setErrorMsg(null);
              setNewConstest({ ...newContest, topic: e.target.value });
            }}
          />
        </div>
        <div className="contestModal__col">
          <label htmlFor="images" className="contestModal__inputLabel">
            Images
          </label>
          <div name="images" className="contestModal__row">
            <label className="contestModal__inputLabel contestModal__inputLabel--option">
              <input
                type="radio"
                value="own"
                checked={isUpload === true}
                onChange={() => {
                  setIsUpload(true);
                }}
              />
              Own
            </label>
            <label className="contestModal__inputLabel contestModal__inputLabel--option">
              <input
                type="radio"
                value="random"
                checked={isUpload === false}
                onChange={() => {
                  setIsUpload(false);
                  setErrorMsg(null);
                  setNewConstest({ ...newContest, images: [] });
                }}
              />
              Random
            </label>
          </div>
          <br />
          {isUpload ? (
            <button className="contestModal__fileContainer">
              {files && files.length !== 0
                ? `${files.length} files waiting to be send`
                : "Upload your multimedia"}
              <input
                type="file"
                id="multi"
                accept="image/*,video/mp4,video/x-m4v,video/*"
                onChange={onChange}
                multiple
              />
            </button>
          ) : null}
        </div>
      </div>
      <FilePreviewList files={files}></FilePreviewList>
      <div className="contestModal__col">
        {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
        <button className="home__button" type="submit">
          <img
            className="home__img"
            src={require("../../assets/icons/logo.svg")}
            alt="App logo. A lightbulb inside an icon"
          />
          NEW TOP IMAGE
        </button>
      </div>
    </form>
  );

  const deactivateModal = () => {
    setNewConstest({
      name: "",
      type: "",
      endDate: null,
      images: [],
    });

    console.log("Deactivate?");
    setErrorMsg("");
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      {isLoading ? <Loader /> : null}

      <button className="home__button" onClick={() => setIsModalOpen(true)} ref={buttonModal}>
        <img
          className="home__img"
          src={require("../../assets/icons/logo.svg")}
          alt="App logo. A lightbulb inside an icon"
        />
        NEW TOP IMAGE
      </button>

      <Filter contests={contests} hasDate={true}></Filter>

      {isModalOpen ? (
        <ActionModal
          close={() =>{ setIsModalOpen(false);buttonModal.current.focus();}}
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
