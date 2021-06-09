import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cadastro from '../src/pages/Cadastro';
import Login from '../src/pages/login';
import CriarTopico from '../src/pages/Componentes/CriarTopico';
import Home from '../src/pages/Home';
import RecuperarSenha from '../src/pages/RecuperarSenha';
import DetalheTopico from '../src/pages/Componentes/DetalheTopico';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/';
import { PersistGate } from 'redux-persist/integration/react';
import DetalheNerdice from '../src/pages/Componentes/DetalheNerdice';
import Perfil from '../src/pages/Perfil';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Cadastro" component={Cadastro} />
          <Route exact path="/recuperarSenha" component={RecuperarSenha} />
          <Route exact path="/CriarTopico" component={CriarTopico} />
          <Route path="/detalheTopico/:id" component={DetalheTopico} />
          <Route path="/detalheNerdice/:id" component={DetalheNerdice} />
          <Route exact path="/perfil" component={Perfil} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
