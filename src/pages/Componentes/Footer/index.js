import React from 'react';
import './footer.css';
import { AiFillGithub } from 'react-icons/ai';
const Footer = () => (
  <div className="bg-dark footer">
    <h1 className="Nome-forinho-footer">Forinho</h1>
    <div className="footer-div">
      <p className="texto-footer">
        Desenvolvido por:<br></br>
      </p>
      <br></br>
      <p className="texto-footer">
        <em>Francisco Marcello</em>
        <a href="https://github.com/lulamolusco2" target=" _blank">
          <AiFillGithub size={30} color="firebrick" />
        </a>
      </p>

      <p className="texto-footer block">
        <em> Wesllen Vinicius</em>
        <a href="https://github.com/Wes-debug" target=" _blank">
          <AiFillGithub size={30} color="firebrick" />
        </a>
      </p>

      <a href=""></a>
    </div>
  </div>
);
export default Footer;
