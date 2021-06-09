import React from 'react';
import './Header.css';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();

  return (
    <nav className="d-flex justify-content-between navbar sticky-top  navbar-expand-lg navbar-dark bg-dark divBar">
      <div className="text-white">
        <a className="navbar-brand " href="/">
          <p className="Nome-Forinho-header">Forinho</p>
        </a>
      </div>

      <div className="opcoes-menu ">
        {useSelector((state) => state.usuarioLogado) > 0 ? (
          <>
            <Link to="/CriarTopico" className="Link-Novo-Topico btn">
              Novo Topico
            </Link>

            <Link onClick={() => dispatch({ type: 'LOG_OUT' })}>
              <BiLogOut size={40} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" aria-current="page">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Header;
