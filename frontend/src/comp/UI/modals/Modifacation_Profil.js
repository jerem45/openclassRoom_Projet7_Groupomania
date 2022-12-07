import React from 'react'
import FormModalProfil from '../../profil/FormModalProfil'
export default function Modifacation_Profil(props) {
  //récupération des props
    const userData=props.userData
    const fetchData = props.fetchData
    const paramsProfil=props.paramsProfil
    console.log("const fetchData = props.fetchData depuis modal");
    console.log(fetchData);
  return (
<div className="modal fade modal-dialog-scrollable" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header d-flex">
        <div className='d-flex flex-column align-items-center justify-content-center container-fluid '> 
        <h1 className="modal-title fs-4 text-capitalize" id="staticBackdropLabel">Bonjour {fetchData[0].name}</h1>
        <h2 className='fs-5 text-capitalize '>{props.title}</h2>
        </div>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <FormModalProfil userData={userData} paramsProfil={paramsProfil} fetchData={fetchData}/>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={props.paramsProfil}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    
  )
}
