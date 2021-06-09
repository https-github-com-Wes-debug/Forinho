import React, { useState } from 'react';
import './recuperarSenha.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link } from 'react-router-dom';

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  function recuperarSenha() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((resultado) => {
        setMsg('Enviamos um link no seu email para redefinição de senha!');
      })
      .catch((erro) => {
        setMsg('Verifique se o email esta correto.');
      });
  }
  return (
    <>
      <div className="text-center form-login mx-auto d-flex">
        <form className="text-center  mx-auto mt-5">
          <h1 className="mb-3">Recuperar Senha</h1>
          <input
            type="email"
            className="form-control my-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="msg my-4 text-center">
            <span>
              <strong>{msg}</strong>
            </span>
          </div>
          <button
            onClick={recuperarSenha}
            type="button"
            className="btn btn-lg btn-block btn-recuperarSenha"
          >
            Recuperar senha
          </button>
          <div className="text-center mt-3 link-recuperarSenha">
            <Link to="Login">Voltar ao login</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default RecuperarSenha;
