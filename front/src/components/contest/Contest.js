import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Contest.scss'
import axios from 'axios'

function Contest(props) {
    const contest = useSelector(state => state.contests.curContest);
    const token = useSelector(state => state.auth.token);
    const url = useSelector(state => state.root.url);
    console.log(contest)

    const [curImage, setCurImage] = useState(contest.images[0]);

    const parseDate = (dateP) => {
        const date = new Date(dateP)
        return (
            date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        )
    }

    const getImageIndex = () => {
        return contest.images.findIndex((item) => item.url === curImage.url)
    }

    const likePost = async () => {
        const options = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            await axios.post(`${url}contests/${props.contestId}/images/${getImageIndex()}/likes`,
                null, options);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="contest">
            <h2 className="contest__name">{contest ? contest.name : null}</h2>
            <div className="contest__header">
                <p>Topic: {contest.topic}</p>
                <p>Fecha de fin: {parseDate(contest.endDate)}</p>
            </div>
            <div className="contest__main">
                <div className="contest__list">
                    {contest.images.map((el) =>
                        <div className="contest__preview" key={el.url}>
                            <button className="contest__card" style={{ 'backgroundImage': 'url(' + el.url + ')' }} onClick={() => setCurImage(el)}></button>
                            <p className="contest__preview--likes">Likes: {el.likes}</p>
                        </div>
                    )}
                </div>
                <div className="contest__featured">
                    <div className="contest__card contest__card--main" style={{ 'backgroundImage': 'url(' + curImage.url + ')' }}></div>
                    <div className="contest__like">
                        <img className="contest__icon" src={require("../../assets/icons/likeU.svg")} onClick={likePost}></img>
                        <img className="contest__icon" src={require("../../assets/icons/dislikeU.svg")}></img>
                        <p className="contest__numLikes">{curImage.likes}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contest;