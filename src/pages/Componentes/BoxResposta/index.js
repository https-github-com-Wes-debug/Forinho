import React, { useState } from 'react';
import './BoxResposta.css';
import firebase from '../../../config/firebase';
import { useSelector } from 'react-redux';
function BoxResposta(props) {
  const [responder, setResponder] = useState('');
  const db = firebase.firestore();
  const usuarioEmail = useSelector((state) => state.usuarioEmail);
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  function Responder() {
    db.collection('Respostas')
      .add({
        texto: responder,
        data: new Date().toLocaleDateString('pt-BR', options),
        Usuario: usuarioEmail,
      })
      .then(() => {
        setResponder('');
      })

      .catch((erro) => {
        alert('erro');
      });
  }

  return (
    <div className="tweetBox bg-dark mb-5 p-2">
      <div className="tweetBox__input">
        <img src="https://yt3.ggpht.com/ytc/AAUvwnh1iotPKCf7o_L6BhrU8klhUsstHCuX0I4-Jwzlow=s900-c-k-c0x00ffffff-no-rj" />
        <textarea
          placeholder="Qual a Boa?"
          onChange={(e) => setResponder(e.target.value)}
          value={responder}
        />
      </div>
      <div className="text-end">
        <button onClick={Responder} className="tweetBox__tweetButton">
          Responder
        </button>
      </div>
    </div>
  );
}

export default BoxResposta;
