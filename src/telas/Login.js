import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import logo from "./logo.png";
import UserContext from "../components/UserContext";
import Entrar from "../components/servicos";
import styled from "styled-components";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [botao, setBotao] = useState(true);

  useEffect(() => {
    user ? navigate("/today") : setUser(null);
  }, [navigate, user, setUser]);

  function login(conteudo) {
    conteudo.preventDefault();
    setBotao(false);

    const body = { email, senha };
    const entrarUser = Entrar(body);

    entrarUser.then((resposta) => {
      const novoUsuario = {
        id: resposta.data.id,
        name: resposta.data.name,
        token: resposta.data.token,
        image: resposta.data.image
      };
      setUser(novoUsuario);
      localStorage.setItem("user", JSON.stringify(resposta.data.token));
      navigate("/today");
    });
    entrarUser.catch(() => {
      alert(
        "Senha ou email incorreto. Tente novamente ou clique em 'Esqueceu a senha?' para escolher uma outra."
      );
      setBotao(true);
    });
  }

  return (
    <>
      <ImgLogo>
        <img src={logo} alt="" />
      </ImgLogo>
      <Container>
        <form onSubmit={login}>
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(conteudo) => setEmail(conteudo.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(conteudo) => setSenha(conteudo.target.value)}
            required
          />
          <Button type="submit" disabled={botao === true ? "" : "disabled"}>
            {botao === true ? (
              "Entrar"
            ) : (
              <Loader type="ThreeDots" color="#FFF" height={50} width={50} />
            )}
          </Button>
        </form>
        <Link to="/inscrever">
          <h2>Não tem uma conta? Cadastre-se!</h2>
        </Link>
      </Container>
    </>
  );
}

const ImgLogo = styled.div`
  width: 180px;
  height: 180px;
  margin: 15% auto;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex;

  h2 {
    font-size: 14px;
    color: #52b6ff;
    text-align: center;
    text-decoration-line: underline;
  }
`;

const Input = styled.input`
  width: 94%;
  height: 45px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 20px;
  ::placeholder {
    color: #dbdbdb;
  }
`;

const Button = styled.button`
  width: 94%;
  height: 45px;
  background-color: #52b6ff;
  opacity: 0.6;
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
`;
