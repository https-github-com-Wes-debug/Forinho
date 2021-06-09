import React, { useState, useEffect } from 'react';
import firebase from '../../../../config/firebase';
import ListTopTopicos from './listTopTopicos';
function BarraDaDireita() {
  const [topicos, setTopicos] = useState([]);

  let listaToptopicos = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection('topicos')
      .limit(3)
      .orderBy('visualizacao', 'desc')
      .get()
      .then(async (resultado) => {
        await resultado.docs.forEach((doc) => {
          listaToptopicos.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setTopicos(listaToptopicos);
      });
  }, []);

  return (
    <>
      {topicos.map((item) => (
        <ListTopTopicos
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

export default BarraDaDireita;
