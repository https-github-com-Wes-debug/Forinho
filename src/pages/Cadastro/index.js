import React, { useState } from 'react';
import './cadastro.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { GrTerminal } from 'react-icons/gr';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Cadastro(user) {
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');
  const [msgTipo, setMsgTipo] = useState('');

  const dispatch = useDispatch();

  function cadastrar() {
    setMsgTipo(null);
    if (!email || !senha || !nome || !username) {
      setMsgTipo('erro');
      setMsg('Você precisa informar o email e senha para fazer o cadastro!');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((data) => {
        firebase
          .firestore()
          .collection('users')
          .doc(data.user.uid)
          .set({ nome: nome, username: username, imagemPerfil: '' });
      })
      .then((resultado) => {
        setMsgTipo('sucesso');
        dispatch({ type: 'LOG_IN', usuarioEmail: email });
      })
      .catch((erro) => {
        setMsgTipo('erro');
        switch (erro.message) {
          case 'Password should be at least 6 characters':
            setMsg('A senha deve ter pelo menos 6 caracteres!');
            break;
          case 'The email address is already in use by another account.':
            setMsg('Este email já está sendo utilizado por outro usuário!');
            break;
          case 'The email address is badly formatted.':
            setMsg('O formato do seu email é inválido!');
            break;
          default:
            setMsg('Não foi possivel cadastrar. Tente novamente mais tarde!');
            break;
        }
      });
  }
  return (
    <div className=" page-cadastro d-flex align-items-center justify-content-center">
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/" />
      ) : null}

      <form className="form-cadastro mx-auto ">
        <h1 className="h3 H1-login mb-2 text-black font-wight-bold">Forinho</h1>
        <div className="icon">
          <GrTerminal size={70} />
        </div>
        <div className="form-floating my-2 inpult-login">
          <input
            type="text"
            className="form-control  my-2"
            name="PrimeiroNome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label for="floatingInput">Nome</label>
        </div>
        <div className="form-floating mb-2 inpult-login">
          <input
            type="text"
            className="form-control  my-2"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="floatingInput">Username</label>
        </div>

        <div className="form-floating mb-2 inpult-login">
          <input
            type="email"
            className="form-control    my-2"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email</label>
        </div>
        <div className="form-floating inpult-login">
          <input
            type="password"
            className="form-control  my-2"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label for="floatingPassword">Senha</label>
        </div>
        <div className="d-flex justify-content-center btn-cadastro mt-3">
          <button
            onClick={cadastrar}
            type="button"
            className="btn btn-lg btn-block mt-2 mb-3 "
          >
            Cadastrar
          </button>
        </div>
        <div className="msg-login text-black text-center my-2">
          {msgTipo === 'sucesso' && (
            <span>
              <strong>WoW!Usuario cadastrado com sucesso!</strong> &#128640;
            </span>
          )}
          {msgTipo === 'erro' && (
            <span>
              <strong>{msg}</strong>&#128546;
            </span>
          )}
        </div>

        <div className="link opcoes-login">
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
export default Cadastro;
