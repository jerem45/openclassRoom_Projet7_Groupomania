import React,{useState,useEffect} from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';

export default function FormModalProfil(props) {


      //state du formulaire
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState({selectedFile:null});



  // recupération des states de app sous forme de props
  const userData = props.userData;

  // axios mise a jour des infos utilisateurs

  const handleName = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData[0].token}`,
      },
      data: {
        name,
      },
    })
      .then((res) => {
        if (res.status === 200) {
        alert( "Nom mis a jour !");
        <Navigate to="/profil" />

        } else {
          console.log(
            "erreur lors de l'envoi du formulaire redirection impossible"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJob = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData[0].token}`,
      },
      data: {
        job,
      },
    })
      .then((res) => {
        if (res.status === 200) {
        alert("Travail mis à jour !");
        <Navigate to="/profil" />

        } else {
          console.log(
            "erreur lors de l'envoi du formulaire redirection impossible"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBio = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData[0].token}`,
      },
      data: {
        bio,
      },
    })
      .then((res) => {
        if (res.status === 200) {
        alert("Biographie mis à jour !");
        <Navigate to="/profil" />

        } else {
          console.log(
            "erreur lors de l'envoi du formulaire redirection impossible"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImg = (e) => {
    e.preventDefault(); 
    const fd = new FormData();
      fd.append("images",imageUrl.selectedFile, imageUrl.selectedFile.name)
    //   axios.post(`${process.env.REACT_APP_URL}api/profil`,fd)
    //   .then(res=>{
    //     console.log(res);
    //   })
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`,
      data : fd,
      headers: {
        Authorization: `Bearer ${userData[0].token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
        alert("Photo de profil mis à jour !");
        <Navigate to="/profil" />

        } else {
          console.log(
            "erreur lors de l'envoi du formulaire redirection impossible"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange_name = (event) => {
    setName(event.target.value);
  };

  const handleChange_job = (event) => {
    setJob(event.target.value);
  };

  const handleChange_img = (event) => {
    setImageUrl({selectedFile:event.target.files[0]});
  };
  const handleChange_bio = (event) => {
    setBio(event.target.value);
  };
console.log(imageUrl.selectedFile);

  useEffect(() => {
    console.log("File has been set.")
  },[imageUrl]); 

  return (
    <div className="form__container--profil">
    <form
      className="container my-3 p-3"
      encType="multipart/form-data"
      method="PUT"
      onSubmit={handleImg}
    >
      <label className="form-label text-capitalize">
        Choisir votre photo de profil
      </label>
      <input
        className="form-control mb-2"
        type="file"
        name="images"
        onChange= {handleChange_img}
        required 
      />
       <button className="btn-primary-color mt-3" value="Enregistrer" type="submit" >Enregistrer</button>
       </form>

       <form
      className="container my-3 p-3"
      encType="multipart/form-data"
      method="put"
      onSubmit={handleName}
      required
    >
      <label className="form-label text-capitalize">votre nom</label>
      <input
        className="form-control mb-2"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChange_name}
        placeholder="Votre prenom / nom "
        required  minLength="3" maxLength="10" size="10"
      ></input>
       <button className="btn-primary-color mt-3" value="Enregistrer" type="submit" >Enregistrer</button>
    </form>
     
    <form
      className="container my-3 p-3"
      encType="multipart/form-data"
      method="put"
      onSubmit={handleJob}
      required
    >
      <label className="form-label text-capitalize">votre Travail</label>
      <input
        className="form-control mb-2"
        type="text"
        id="job"
        name="job"
        placeholder="Votre poste dans la société Groupomania" 
        value={job}
        onChange={handleChange_job}
        required minLength="3" maxLength="25"
      />
       <button className="btn-primary-color mt-3" value="Enregistrer" type="submit" >Enregistrer</button>
    </form>

    <form
      className="container my-3 p-3"
      encType="multipart/form-data"
      method="put"
      onSubmit={handleBio}
      required

    >
      <label className="form-label text-capitalize">votre Biographie</label>
      <textarea
        className="form-control mb-2"
        placeholder="Ecrit ta biographie ici..." 
        value={bio}
        onChange={handleChange_bio}
        required minLength="10" maxLength="500"
      ></textarea>
       <button className="btn-primary-color mt-3" value="Enregistrer" type="submit" >Enregistrer</button>
    </form>
  </div>
  )
}
