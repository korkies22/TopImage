import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Contest.scss'
import axios from 'axios'

function Contest(props) {
    const contest = useSelector(state => state.contests.curContest);
    const token = useSelector(state => state.auth.token);
    const email = useSelector(state => state.auth.user.email);
    const url = useSelector(state => state.root.url);
    console.log(contest)

    const [curImageIndex, setCurImageIndex] = useState(0);
    const [curImage, setCurImage] = useState(contest.images[0]);
    console.log('holis', curImage)
    console.log('holis2', contest)

    useEffect(() => {
        curImageSet(curImageIndex)
    }, [contest])

    const parseDate = (dateP) => {
        const date = new Date(dateP)
        return (
            date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        )
    }

    const getImageIndex = () => {
        return contest.images.findIndex((item) => item.url === curImage.url)
    }

    const likePost = async (isDislike) => {
        console.log('ajam ajam')
        const options = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = { isDislike: isDislike }
        try {
            const res = await axios.post(`${url}contests/${props.contestId}/images/${getImageIndex()}/likes`,
                body, options);
            console.log('llega like', res)
        }
        catch (err) {
            console.log(err)
        }
    }

    const curImageSet = (index) => {
        setCurImage(contest.images[index])
        setCurImageIndex(index)
    }

    const hasLiked = () => {
        return (curImage.likedBy || []).findIndex((item) => item === email) !== -1
    }

    const hasDisliked = () => {
        return (curImage.dislikedBy || []).findIndex((item) => item === email) !== -1
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
                    {contest.images.map((el, index) =>
                        <div className="contest__preview" key={el.url}>
                            <button className="contest__card" style={{ 'backgroundImage': 'url(' + el.url + ')' }} onClick={() => curImageSet(index)}></button>
                            <p className="contest__preview--likes">Likes: {el.likes-el.dislikes}</p>
                        </div>
                    )}
                </div>
                <div className="contest__featured">
                    <div className="contest__card contest__card--main" style={{ 'backgroundImage': 'url(' + curImage.url + ')' }}></div>
                    <div className="contest__like">
                        <img className="contest__icon" src={require(`../../assets/icons/like${hasLiked() ? '' : 'U'}.svg`)} onClick={() => likePost(false)}></img>
                        <img className="contest__icon" src={require(`../../assets/icons/dislike${hasDisliked() ? '' : 'U'}.svg`)} onClick={() => likePost(true)}></img>
                        <p className="contest__numLikes">{curImage.likes-curImage.dislikes}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contest;