import React, { useState, useEffect } from 'react';
import './listTopicos.css';
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import firebase from '../../../config/firebase';

function ListTopicos({
  id,
  img,
  titulo,
  texto,
  visualizacoes,
  username,
  tag,
  tag2,
}) {
  const [urlImagem, setUrlImagem] = useState();
  useEffect(() => {
    firebase
      .storage()
      .ref(`imagens/${img}`)
      .getDownloadURL()
      .then((url) => setUrlImagem(url));
  }, [urlImagem]);
  return (
    <div className="col-md-10 col-lx-9 col-sm-12 card-topico mx-auto bg-dark p-3 text-white">
      <img
        id="banner-topico"
        src={urlImagem}
        className="card-img-top img-cartao"
        alt="Imagem topico"
      />
      <div className="card-body teste">
        <div>
          <div className="d-flex align-items-center">
            <span className="username text-right">
              <strong>{username}</strong>
            </span>
          </div>

          <div className="tags mt-3  ">
            <span className="me-2">#{tag}</span>
            <span>#{tag2}</span>
          </div>

          <hr />
          <h1 className="pt-2">{titulo}</h1>
          <p className="card-text text-justify text-truncate">{texto}</p>

          <div className="row rodape-card d-flex align-items-center ">
            <div className="col-6 mb-2">
              <Link
                to={'/detalheTopico/' + id}
                className="btn btn-sm btn-detalhes"
              >
                + detalhes
              </Link>
            </div>

            <div className="col-6 vizualizacao">
              <span className="p-2"> {visualizacoes}</span>
              <BsEyeFill size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListTopicos;
