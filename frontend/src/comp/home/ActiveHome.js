import React,{useState} from 'react'
import Header from '../UI/header/Header'
import AllPost from './AllPost';
import Button from '../UI/button/Button';
import axios from "axios";

export default function ActiveHome(props) {

     //Recuperation des states
  const userData = props.userData;
  const userPostValue=props.userPost[0].value
  const userPost = props.userPost
  const setUserPost = props.setUserPost
  const allDataUser= props.allDataUser[0].value
  console.log(allDataUser);
  console.log("userPostValue");
  console.log(userPostValue);
  //state du poste cree par l'utilisateur
  const [post,setPost] = useState()

  //Requête get des poste
  const getRequestHome = props.getRequestHome

//axios----------------post des POSTS
const getUserControlData =(event)=>{
  event.preventDefault()
  axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}api/post/`,
      headers: {
        Authorization: `Bearer ${userData[0].token}`,
      },
      data: {
       post : post,
       userId: userData[1].id,
       userName: allDataUser.name,
       userJob: allDataUser.job,
       userImg : allDataUser.imageUrl,
      },
    })
      .then((res) => {
        if (res.status === 200) {
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

  //fonction de récupération de la valeur de l'input
  function handlePostUser(e){
    setPost(
      e.target.value
    )
    }



// boucle pour afficher les posts
const cards = Object
.keys(userPostValue)
.map(key=> <AllPost key={key} detail={userPostValue[key]} userData={userData[1].id} token={userData[0].token} getRequestHome={getRequestHome} userPost={userPost} setUserPost={setUserPost}/>)

  return ( 
    <div className="d-flex flex-column ">
           <Header userId={userData} />
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <div className="container-fluid">
      <form 
      className="p-3 mb-3 bg-grey-1"
      action=""
      encType="multipart/form-data"
      onSubmit={getUserControlData}
      method = "post"
      >
        <label htmlFor="inputEmail" className="form-label fs-6 fst-italic">Je rédige mon poste...</label>
        <input
        className='form-control'
          type="text"
          name="post"
          id="post"
          placeholder="Je poste mon message..."
          required
          minLength="10"
          maxLength="150"
          size="10"
          onChange={((e)=>handlePostUser(e))}
        />
        <input type="reset" value="Effacer" className='mt-2 btn-primary-color fw-bold fst-italic' />
        <div className="container-fluid d-flex justify-content-end">
          <Button 
        className="justify-content-end btn-secondary-color fw-bold mt-2" 
        value="POSTER"  
        type="submit"
        />
        </div>
      </form>
    </div>
      <div className="container d-flex flex-column-reverse p-2 mt-3">
       {cards}
            <h2>Le file d'actualité</h2>
      </div>
    </div>
  </div>
  )
}
