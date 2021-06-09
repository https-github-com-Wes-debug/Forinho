import React, { useState } from 'react';
import './login.css';
import { RiTerminalFill } from 'react-icons/ri';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msgTipo, setMsgTipo] = useState();
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  function logar() {
    if (!email || !senha) {
      setMsgTipo('erro');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(async (resultado) => {
          await firebase
            .firestore()
            .collection('users')
            .doc(resultado.user.uid)
            .get();
          setMsgTipo('sucesso');
          setTimeout(() => {
            dispatch({
              type: 'LOG_IN',
              usuarioEmail: email,
            });
          }, 2000);
        })
        .catch((erro) => {
          setMsgTipo('erro');
        });
    }
  }

  return (
    <div className="login-content d-flex align-items-center">
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/" />
      ) : null}

      <form className="form-signin mx-auto">
        <h1 className="h3 mb-2 fw-normal H1-login font-weight-bold">Forinho</h1>
        <div className="icon">
          <RiTerminalFill color="black" size={70} />
        </div>
        <div className="form-floating mb-3 ">
          <input
            type="email"
            className="form-control inpult-login my-2"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email</label>
        </div>

        <div className="form-floating mb-3 ">
          <input
            type="password"
            className="form-control inpult-login my-2"
            value={senha}
            name="senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <label for="floatingInput">Senha</label>
        </div>
        <div className="botao mt-3">
          <button onClick={logar} class=" btn btn-lg btn-block " type="button">
            Entrar
          </button>
        </div>
        <div className="text-center my-3">
          {msgTipo === 'sucesso' && (
            <span>
              <strong>WoW!Você está conectado!</strong> &#128640;
            </span>
          )}
          {msgTipo === 'erro' && (
            <span>
              <strong>
                Ops!Verfique se a senha ou usuário estão corretos!
              </strong>
              = &#128546;
            </span>
          )}
        </div>
        <div className="opcoes-login mt-3">
          <Link to="Cadastro" className="mx-2">
            Cadastra-se
          </Link>
          <Link to="recuperarSenha" className="mx-2 ">
            Recuperar Senha
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
