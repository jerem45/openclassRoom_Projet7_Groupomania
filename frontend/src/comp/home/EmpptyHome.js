import React from 'react'
import Header from '../UI/header/Header'
import { Link } from 'react-router-dom'
import AllPost from './AllPost'


export default function EmpptyHome(props) {

const userPost = props.userPost[0].value
const profilFormUrl = "/profil_form/";

    // boucle pour afficher les posts
 
    const cards = Object
    .keys(userPost)
    .map(key=> <AllPost key={key} detail={userPost[key]} displayLike={false}/>)


  return (
      <div>
      <Header />
      <div className='container mt-4 d-flex align-items-center'>
        <span className="fst-italic fw-bold text-center text-secondary-color">
        Pour poster des messages merci de mettre à jour votre profil
           <span className='fs-6 text-decoration-none '><Link to={profilFormUrl} className="text-primary-color"> Modifier Mon Profil</Link>
          </span> 
        </span> 
      </div>
             
      
      <div className="container d-flex flex-column-reverse p-2 mt-3">
       {cards}
            <h2>Le file d'actualité</h2>
      </div>
    </div>
  )
}
