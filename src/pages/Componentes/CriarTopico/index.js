import React, { useState } from 'react';
import './criarTopico.css';
import firebase from '../../../config/firebase';
import 'firebase/auth';
import { useSelector } from 'react-redux';
import Header from '../Header';

function CriarTopico() {
  const [titulo, setTitulo] = useState('');
  const [carregando, setCarregando] = useState('');
  const [texto, setTexto] = useState('');
  const [foto, setFoto] = useState('');
  const [tag, setTag] = useState('');
  const [OndePostar, setOndePostar] = useState('');
  const [tag2, setTag2] = useState('');
  const [msgTipo, setMsgTipo] = useState('');

  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const storage = firebase.storage();
  const db = firebase.firestore();

  function cadastrarTopico() {
    setMsgTipo(null);
    setCarregando(1);
    if (!titulo || !texto || !tag || !OndePostar || !tag2) {
      setMsgTipo('erro');
      setCarregando(0);
    } else if (OndePostar === 'Nerdices') {
      storage
        .ref(`imagens/${foto.name}`)
        .put(foto)
        .then(() => {
          db.collection('Nerdices')
            .add({
              titulo: titulo,
              texto: texto,
              username: usuarioEmail,
              foto: foto.name,
              publico: 1,
              tag: tag,
              tag2: tag2,
              visualizacao: 0,
              data: new Date().toLocaleDateString('pt-BR', options),
              criacao: new Date(),
            })
            .then(() => {
              setMsgTipo('sucesso');
              setCarregando(0);
              setTexto('');
              setTitulo('');
            })

            .catch((erro) => {
              setMsgTipo('erro');
              setCarregando(0);
            });
        });
    } else {
      storage
        .ref(`imagens/${foto.name}`)
        .put(foto)
        .then(() => {
          db.collection('topicos')
            .add({
              titulo: titulo,
              texto: texto,
              username: usuarioEmail,
              foto: foto.name,
              tag: tag,
              tag2: tag2,
              visualizacao: 0,
              data: new Date().toLocaleDateString('pt-BR', options),
              criacao: new Date(),
            })
            .then(() => {
              setMsgTipo('sucesso');
              setCarregando(0);
              setTexto('');
              setTitulo('');
            })

            .catch((erro) => {
              setMsgTipo('erro');
              setCarregando(0);
            });
        });
    }
  }

  return (
    <>
      <Header />
      <div className="page-novo-topico ">
        <div className="text-center mt-1 ">
          <h3>Novo Topico</h3>
        </div>
        <div className="px-5">
          <form className="form-novo-topico bg-dark text-white mx-auto">
            <div className="form-group form-criar-topico mx-auto">
              <label className="my-1">Título:</label>
              <input
                className="form-control bg-dark text-white my-1"
                type="text"
                aria-label="Search"
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
              />
            </div>
            <div className="row my-2">
              <div className="form-group  form-criar-topico col-sm-3">
                <label className="my-1 pe-1">Onde Postar: </label>
                <select
                  className="bg-dark text-white p-1"
                  name="tags"
                  onChange={(e) => setOndePostar(e.target.value)}
                >
                  <option selected></option>
                  <option value="Nerdices">Nerdices</option>
                  <option value="Topicos">Feed</option>
                </select>
              </div>
              <div className="form-group  form-criar-topico col-sm-3">
                <label className="my-1 pe-1">1-Tag:</label>
                <select
                  className="bg-dark text-white p-1"
                  name="tags"
                  onChange={(e) => setTag(e.target.value)}
                >
                  <option selected> </option>
                  <option value="Informática">Informática</option>
                  <option value="Política">Política</option>
                  <option value="Filmes">Filmes</option>
                  <option value="Animes">Animes</option>
                </select>
              </div>
              <div className="form-group  form-criar-topico col-sm-3 ">
                <label className="my-1 pe-1">2-Tag:</label>
                <select
                  className="bg-dark text-white  p-1 "
                  name="tags"
                  onChange={(e) => setTag2(e.target.value)}
                >
                  <option selected> </option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="LongaMetragem">Longa Metragem</option>
                  <option value="CurtaMetragem">Curta Metragem</option>
                </select>
              </div>
            </div>
            <div className="form-group textarea-texto  form-criar-topico mx-auto">
              <label className="my-1">Texto:</label>
              <textarea
                className="form-control bg-dark text-white my-1"
                onChange={(e) => setTexto(e.target.value)}
                value={texto}
              />
            </div>
            <div className="form-group form-criar-topico mx-auto">
              <label className="my-1">Imagem:</label>
              <input
                type="file"
                className="form-control bg-dark text-white my-1"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files[0])}
              />
            </div>

            <div className="msg-login text-black text-center my-3 mx-auto">
              {msgTipo === 'sucesso' && (
                <span>
                  <strong>WoW!</strong>Topico criado!&#128640;
                </span>
              )}
              {msgTipo === 'erro' && (
                <span>Não foi possível criar o topico! &#128546;</span>
              )}
            </div>
            <div className="d-flex justify-content-center row">
              {carregando > 0 ? (
                <div className="  spinner-border text-danger " role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                <div className="btn-cadastro-topico mt-1 ">
                  <button
                    type="button"
                    onClick={cadastrarTopico}
                    className="btn btn-lg btn-block   mb-3 "
                  >
                    Cadastrar Topico
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CriarTopico;
