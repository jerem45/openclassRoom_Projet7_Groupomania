import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHeart } from "@fortawesome/free-solid-svg-icons";
import {  faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
export default function Like(props) {
//recuperation de la props detail des post avec la data 
const getRequestHome = props.getRequestHome
      // state like dislike
const [userLike,setUserLike] =useState([{
like:0,
likeActive:false,
}])
const [userDislike,setUserDislike] =useState([{
  dislike:0,
  dislikeActive:false,
  }])

function isLiked (){
const newLike = [...userLike]
newLike[0].likeActive = !userLike[0].likeActive
newLike[0].like = userLike[0].likeActive ? userLike[0].like +1 : userLike[0].like -1
setUserLike(newLike)
}
function isDisliked (){
  const newUserDislike = [...userDislike]
  newUserDislike[0].dislikeActive = !userDislike[0].dislikeActive
  newUserDislike[0].dislike = userDislike[0].dislike ? userDislike[0].dislike -1 : userDislike[0].dislike +1
  setUserDislike(newUserDislike)
}

    //  gestion des states likes et dislikes
const handleLiked = (e)=>{
 if(userDislike[0].dislikeActive){
  isLiked()
  isDisliked()
 }
 isLiked()
  sendLike()
}

const handleDisLiked = (e)=>{
 if(userLike[0].likeActive){
 
  isDisliked() 
  isLiked() 
 }
isDisliked()
sendDislike()
}
//axios----------------update des like&dislike
const sendLike =(event)=>{

  axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}api/post/${props.objetctId}/like`,
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      data: {
        likes: userLike[0].like,
        userId : props.userData
      },
    })
      .then((res) => {
        if (res.status === 201) {
          console.log(userLike[0].like);
          console.log(userDislike[0].dislike);
          getRequestHome()
  
          } else {
            console.log(
              "erreur lors de l'envoi du formulaire redirection impossible"
            );
          }
      })
      .catch((err) => {
        console.log(err);
      });
}
const sendDislike =(event)=>{

  axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}api/post/${props.objetctId}/dislike`,
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      data: {
        dislikes: userDislike[0].dislike,
        userId : props.userData
      },
    })
      .then((res) => {
        if (res.status === 201) {
          getRequestHome()
  
          } else {
            console.log(
              "erreur lors de l'envoi du formulaire redirection impossible"
            );
          }
      })
      .catch((err) => {
        console.log(err);
      });
}
  return (
<div className='d-flex justify-content-center'>
    <button 
    className='btn-liked-color me-3 text-danger'
    onClick={()=>handleLiked()}>
        <FontAwesomeIcon icon={faHeart} 
         className="me-1" />{props.liked} 
    </button>
    <button 
    className='btn-liked-color'
    onClick={()=>handleDisLiked()}>

        <FontAwesomeIcon icon={faHeartBroken} 
         className="me-1" />{props.disliked}
    </button>
</div>
  )
}
