import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import './perfil.css';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';

function Perfil() {
  const [foto, setFoto] = useState('');
  const usuarioUsername = useSelector((state) => state.usuarioEmail);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mb-5">Perfil</h1>
        <div className="row">
          <div className="col-4">
            <img
              className="avatar-perfil mt-5"
              src="https://i.pinimg.com/736x/77/5e/21/775e21cbe0e92b4ffa4ce09592e54ab5.jpg"
            />
          </div>
          <div className="col-4 mt-5 row">
            <span className="text-black">{usuarioUsername}</span>
            <input
              type="file"
              className="form-control my-1"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
            />
            <button>Trocar foto</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
