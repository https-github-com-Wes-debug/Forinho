import React, { useState, useEffect } from 'react';
import './detalheNerdice.css';
import firebase from '../../../config/firebase';

import { BsEyeFill } from 'react-icons/bs';
import Header from '../Header';
import Footer from '../Footer';
import BoxResposta from '../BoxResposta';

function DetalheNedice(props) {
  const [topico, setTopico] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [carregando, setCarregando] = useState(1);

  useEffect(() => {
    if (carregando) {
      firebase
        .firestore()
        .collection('Nerdices')
        .doc(props.match.params.id)
        .get()
        .then((resultado) => {
          setTopico(resultado.data());
          firebase
            .firestore()
            .collection('Nerdices')
            .doc(props.match.params.id)
            .update('visualizacao', resultado.data().visualizacao + 1);
          firebase
            .storage()
            .ref(`imagens/${resultado.data().foto}`)
            .getDownloadURL()
            .then((url) => {
              setUrlImg(url);
              setCarregando(0);
            });
        });
    } else {
      firebase
        .storage()
        .ref(`imagens/${topico.foto}`)
        .getDownloadURL()
        .then((url) => setUrlImg(url));
    }
  }, []);
  return (
    <>
      <Header />
      <div className=" container pt-3">
        {carregando ? (
          <div className="row mt-5">
            <div className="  spinner-border text-danger mx-auto" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div>
            <div className="row ">
              <h1 className="text-center">{topico.titulo}</h1>
              <img
                src={urlImg}
                className="img-banner mx-auto"
                alt="Banner Topico"
              />
              <div className=" my-1 bg-dark div-texto-topico ">
                <p className=" p-3 text-white texto-topico">{topico.texto}</p>
                <div className="row text-white text-end">
                  <span>{topico.username}</span>
                  <span>{topico.data}</span>
                </div>
              </div>
            </div>
            <div className="vizualizacao-detalhe">
              <BsEyeFill size={25} />
              <span className="p-2"> {topico.visualizacao}</span>
            </div>
          </div>
        )}
      </div>
      <dib className="footer-detalhe">
        <Footer />
      </dib>
    </>
  );
}
export default DetalheNedice;
