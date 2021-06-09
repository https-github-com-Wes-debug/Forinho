import React, { useState, useEffect } from 'react';
import './Home.css';
import firebase from '../../config/firebase';
import ListTopicos from '../Componentes/listTopicos';
import { useSelector } from 'react-redux';
import Footer from '../Componentes/Footer/index';
import Header from '../Componentes/Header';
import BarraDaDireita from '../Componentes/BarrasLaterias/BarraDaDireita/index';

import CardNerdices from '../Componentes/BarrasLaterias/CardNerdices';

function Home() {
  const [topicos, setTopicos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [carregando, setCarregando] = useState(1);
  const [swaplist, setSwaplist] = useState(1);
  const usuarioUsername = useSelector((state) => state.usuarioUsername);
  let listatopico = [];
  function trocandoFeed() {
    if (swaplist === 1) {
      setSwaplist(0);
    } else {
      setSwaplist(1);
    }
  }
  useEffect(() => {
    if (swaplist === 1) {
      firebase
        .firestore()
        .collection('topicos')
        .orderBy('criacao', 'desc')
        .get()
        .then(async (resultado) => {
          await resultado.docs.forEach((doc) => {
            if (doc.data().tag.indexOf(pesquisa) >= 0) {
              listatopico.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });

          setTopicos(listatopico);
          setCarregando(0);
        });
    } else if (swaplist === 0) {
      firebase
        .firestore()
        .collection('Nerdices')
        .orderBy('criacao', 'desc')
        .get()
        .then(async (resultado) => {
          await resultado.docs.forEach((doc) => {
            if (doc.data().tag.indexOf(pesquisa) >= 0) {
              listatopico.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });

          setTopicos(listatopico);
          setCarregando(0);
        });
    }
  }, [pesquisa, swaplist]);

  return (
    <>
      <Header />
      <div className="btn-trocar text-center mt-3 hidden-button">
        <button onClick={trocandoFeed} className="btn btn-sm btn-detalhes">
          Trocar Feed
        </button>
      </div>
      {carregando > 0 ? (
        <div className="d-flex justify-content-center row">
          <div className="  spinner-border text-danger " role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="page">
          <div className="mt-5 col-12 col-sm-5 col-md-6 col-lg-7  col-xl-8 	col-xxl-9">
            {topicos.map((item) => (
              <ListTopicos
                key={item.id}
                id={item.id}
                img={item.foto}
                titulo={item.titulo}
                texto={item.texto}
                visualizacoes={item.visualizacao}
                username={item.username}
                tag={item.tag}
                tag2={item.tag2}
              />
            ))}
          </div>

          <div className="Resposive">
            <input
              onChange={(e) => setPesquisa(e.target.value)}
              type="text"
              className="form-control text-center mb-2"
              placeholder="Pesquisa"
            />

            <div className="cardNerdices bg-dark barraFixa">
              <h1 className="text-center">Topicos</h1>
              <BarraDaDireita />
            </div>

            <div className="cardNerdices bg-dark barraFixa  ">
              <h1 className="text-center">Nerdices</h1>
              <CardNerdices />
              <div className="btn-trocar text-center">
                <button
                  onClick={trocandoFeed}
                  className="btn btn-sm btn-detalhes"
                >
                  Trocar Feed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="footer ">
        <Footer />
      </div>
    </>
  );
}
export default Home;
