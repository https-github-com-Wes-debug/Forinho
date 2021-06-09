import React, { useState, useEffect } from 'react';
import './listResposta.css';
import firebase from '../../../config/firebase';

function ListRespostas() {
  const [respostas, setRespostas] = useState([]);
  let listaResposta = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection('Respostas')
      .orderBy('data', 'desc')
      .get()
      .then(async (resultado) => {
        await resultado.docs.forEach((doc) => {
          listaResposta.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setRespostas(listaResposta);
      });
  }, [listaResposta]);
  return (
    <>
      {respostas.map((val) => {
        return (
          <div className="tweetBox bg-dark mb-5 p-2 text-white mt-2">
            <div className="tweetBox__input">
              <img src="https://yt3.ggpht.com/ytc/AAUvwnh1iotPKCf7o_L6BhrU8klhUsstHCuX0I4-Jwzlow=s900-c-k-c0x00ffffff-no-rj" />

              <p className="text_resposta">{val.texto}</p>
            </div>
            <div className="text-end row">
              <span>{val.Usuario}</span>
              <span>{val.data}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ListRespostas;
