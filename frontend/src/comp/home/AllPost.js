import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Like from './Like';



export default function AllPost(props) {

  //récupération des states sous forme de props pour le récupération et la comparaison des id
  const [btn,setBtn]=useState(false)
  //State de la modification des post par l'utilisateur
  const [postModif, setPostModif] = useState("");
  //condition affichage modification du poste
  const [clikedBtn, setClikedBtn]=useState(false)

  // récupération des state sous forme de props
  const userData = props.userData
  const detail = props.detail.userId
  const objetctId =props.detail._id

//récupération de la requete axios de récupération de tous les poste en base de données
  const getRequestHome = props.getRequestHome

  //récuperation de la condition d'affichage des like avec le compo parent EmptyHome
  const conditionLike = props.displayLike

  const handleChange_modifPost = (event) => {
    setPostModif(event.target.value);
  };

  //conversion de la date des postes
  const dayName = new Date(props.detail.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});


// function conditionnelle d'affichage  des boutons modifier et supprimer
const addButton = ()=>{
   return(
    <div className='d-flex my-1 p-1'>
      <button className='btn-primary-color' onClick={(()=>setClikedBtn(true))}
      >Modifier</button>
      <button onClick={deletePost}className='btn-secondary-color ms-2'>Supprimer</button>
    </div>
  )
}

// function de controle d'affichage  des boutons modifier et supprimer
  const postAccess = ()=>{
    if(userData===detail){
      const result = true
      setBtn(result)
  }
}

function displayBtn(){
  if (btn === true) {
    return (
      <div className='container-fluid d-flex flex-row justify-content-around'>
          {addButton()}
      </div>
      )
  }
}
// fonction d'affichage conditionnel des like et displike
function displayLike (){
  if(conditionLike !== false){
return <Like userData={userData} token={props.token} objetctId={objetctId} getRequestHome={getRequestHome} liked={props.detail.likes} disliked={props.detail.dislikes}/>
  }
}
//axios modification du poste et !!!on utilise l'objectid dans l'url de la requête!
function putModifPost(e) {
  e.preventDefault();
  axios({
    method: "put",
    url: `${process.env.REACT_APP_URL}api/post/${objetctId}`,
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
       data: {
        post : postModif,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        alert("Poste modifier avec succes !");
        setClikedBtn(false)
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

  //AXIOS supression du du post
  function deletePost() {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL}api/post/${objetctId}`,

      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Poste supprimer avec succes !");
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
  function modifBlock (){
    return(
      <form
       className="container my-3 p-3"
       onSubmit={putModifPost}
    >
      <label className="form-label text-capitalize">Nouveau Post</label>
      <input
        className="form-control mb-2"
        type="text"
        id="post"
        name="post"
        value={postModif}
        onChange={handleChange_modifPost}
        placeholder="écrire vos modifications..."
        required  minLength="10" maxLength="200" size="10"
      /> 
       <button 
       className="btn-primary-color mt-3" 
       value="Enregistrer" 
       type="submit" onClick={putModifPost}>
        Enregistrer
        </button>
        <button className='btn-secondary-color ms-2' onClick={(()=>setClikedBtn(false))}>Fermer</button>
       
    </form>
    )
  }

//Condition de modification du block
  const controlModif = ()=>{
    if(clikedBtn===true){
      return modifBlock()
    } else{
      return <div></div>
    }
    
  }
  //did mount
useEffect(()=>{
postAccess()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  //JSX

  return (
    <div className="container p-2  my-3">
    <div className='container d-flex flex-row justify-content-center align-items-center flex-wrap bg-grey-1'>
      <div className='w-img-post p-0 m-0'>
      <img src={props.detail.userImg} alt="avatar" className='postImg'></img>
      </div>

      <div className='w-auto p-1 ms-4'>
        <div className='text-left'>
         <p className=''>{props.detail.post}</p>
        </div>

        <ul className=' container-fluid d-flex align-items-center post-border flex-wrap'>
         <li className='fw-bold fst-italic  mt-1'>{props.detail.userName}</li>
         <li className='fw-bold fst-italic  ms-3 mt-1'>{props.detail.userJob}</li>
         <li className='fw-bold fst-italic ms-3 mt-1'>{dayName}</li>
        </ul>
        <div className='container-fluid d-flex flex-row justify-content-around'>
            {displayBtn()}
            {displayLike()}
        </div>
        {controlModif()}
     
      </div>
    </div>
   </div>
  )
}
