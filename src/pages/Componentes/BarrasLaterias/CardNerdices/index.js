import React, { useState, useEffect } from 'react';
import firebase from '../../../../config/firebase';
import ListNerdice from './ListNerdice';
function CardNerdices() {
  const [nerdices, setNerdice] = useState([]);

  let listanerdice = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection('Nerdices')
      .limit(3)
      .orderBy('criacao', 'desc')
      .get()
      .then(async (resultado) => {
        await resultado.docs.forEach((doc) => {
          listanerdice.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setNerdice(listanerdice);
      });
  }, []);

  return (
    <>
      {nerdices.map((item) => (
        <ListNerdice
          key={item.id}
          id={item.id}
          img={item.foto}
          titulo={item.titulo}
          texto={item.texto}
          visualizacoes={item.visualizacao}
          username={item.username}
          tag={item.tag}
        />
      ))}
    </>
  );
}
export default CardNerdices;
