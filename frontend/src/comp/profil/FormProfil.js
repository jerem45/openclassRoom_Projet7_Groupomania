import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';



export default function FormProfil(props) {
  const navigate = useNavigate();
    //state du formulaire
  const [name, setName] = useState("")
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState({selectedFile:null});

 //FUNCTION control des data du form
 

  // recupération des states de app sous forme de props
  const userData = props.userData;
  console.log("userData depuis form profil");
  console.log(userData);

  // axios mise a jour des infos utilisateurs
  const sendImg = () => {
    //function de control  
    const fd = new FormData();
    fd.append("images",imageUrl.selectedFile, imageUrl.selectedFile.name)
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`, 
       data : fd,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData[0].token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
        console.log("requestimg reussie ! ");
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

  const handleLogin = (e) => {
    //function de control  

    e.preventDefault();
    const fd = new FormData();
    fd.append("images",imageUrl.selectedFile, imageUrl.selectedFile.name)
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`, 
       data:{
        name,
        job,
        bio,
       },
       
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData[0].token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          sendImg()
        alert("Profil mis à jour avec succé");
        navigate("/profil");
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

  useEffect(() => {
    console.log("File has been set.")
  },[imageUrl]); 
  console.log(imageUrl.selectedFile);

  return (
    <div className="form__container--profil">
    <form
      className="container my-3 p-3"
      encType="multipart/form-data"
      method="PUT"
      onSubmit={handleLogin}
    >
      <label className="form-label text-capitalize">
        Choisir votre photo de profil
      </label>
      <input
        className="form-control mb-2"
        type="file"
        name="images"
        onChange={handleChange_img}
        required 
      />

      <label className="form-label text-capitalize">votre nom</label>
      <input
        className="form-control mb-2"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChange_name}
        required 
      ></input>

      <label className="form-label text-capitalize">votre Travail</label>
      <input
        className="form-control mb-2"
        type="text"
        id="job"
        name="job"
        value={job}
        onChange={handleChange_job}
        required 
      />

      <label className="form-label text-capitalize">votre Biographie</label>
      <textarea
        className="form-control mb-2"
        placeholder="Ecrit ta biographie ici..." 
        value={bio}
        onChange={handleChange_bio}
        required 
      ></textarea>
      <button className="btn-primary-color mt-3" value="Enregistrer" type="submit" >Enregistrer</button>
    </form>
  </div>
  )
}
