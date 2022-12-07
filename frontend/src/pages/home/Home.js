/* eslint-disable react/jsx-pascal-case */
import React,{useEffect, useState}from "react";
import EmpptyHome from "../../comp/home/EmpptyHome";
import ActiveHome from "../../comp/home/ActiveHome";
import axios from "axios";

const Home = (props) => {
  //Recuperation props Token Id depuis app
  const userData = props.userData;

  //State de récupération des post Data
  const [userPost, setUserPost]= useState([
    {value : []}
  ])

   //State qui définis l'acces a la fonctionnalité de poster des messages ou non  
   const [access, setAccess]= useState([{value:false}])

  //State de récupération de toutes la Data contenus dans le profil de l'utilisateur
  const [allDataUser,setAllDataUser] = useState([{value:[]}])

      //recupération des post des utilisateurs 
      function getRequestHome() {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_URL}api/post/`,
  
          headers: {
            Authorization: `Bearer ${userData[0].token}`,
          },
        })
          .then((res) => {
            console.log("res depuis home");
            console.log(res);
           function getPostData (){
            const newUserPost = [...userPost]
            newUserPost[0].value= res.data
            setUserPost(
              newUserPost
            )
           }  
        
           getPostData()
          })
          .catch((err) => {
            console.log(err);
          });
      }
  function getUserControlData(){
    axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`,
  
        headers: {
          Authorization: `Bearer ${userData[0].token}`,
        },
      })
        .then((res) => {
       
          //FONCTION qui sert à définir l'affichage de la page
          function accessAuthorize(){
            const newAccess = [...access]
            newAccess[0].value = true
            setAccess(
              newAccess
            )
           }
           //la condition d'affichage 
        if(res.data.name === undefined){
          console.log("Mettre a jour le profil");
        } else{
           accessAuthorize()
        }
  
          //function de récupération des données de l'utilisateur  : name/bio/job/img
  
          function getUserData (){
            const newAllDataUser = [...allDataUser]
            newAllDataUser[0].value = res.data
            setAllDataUser(
              newAllDataUser
            )
          }
            getUserData()
        })
        .catch((err) => {
          console.log(err);
        });
  }
   //didMount
   useEffect(() => {
    getRequestHome();
    getUserControlData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  //JSX

  if(access[0].value === false){
    return (
      <div>   
      <EmpptyHome userPost={userPost} />
      </div>
   
    )
  } else {
    return(
      <div>
        <ActiveHome userData={userData} access={access} userPost={userPost} setUserPost={setUserPost} allDataUser={allDataUser} getRequestHome={getRequestHome} /></div>
    )
  }

};

export default Home;
