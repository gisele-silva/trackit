import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import logo from "./logo.png";
import axios from "axios";
import styled from "styled-components";

export default function Cadastro() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [botao, setBotao] = useState(true);

	function registro(conteudo) {
		const solicitar = axios.post(
		  `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`,
		  conteudo
		);
		return solicitar;
	  }

	function cadastrar(conteudo){
		conteudo.preventDefault();

		setBotao(false);

		const body = {
			email,
			name,
			image,
			password
		};
		const req = registro(body);

		req.then(() => navigate("/"));
		req.catch(() =>{
			alert("Erro no preenchimento. Tente novamente.");
			setBotao(true);
		});
	}

	return (
		<>
			<ImgLogo>
				<img src={logo} alt="TrackIt"/>
			</ImgLogo>
			<Container>
				<form onSubmit={cadastrar}>
					<Input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
					<Input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required/>
					<Input type="text" placeholder="nome" value={name} onChange={e => setName(e.target.value)} required/>
					<Input type="url" placeholder="foto" value={image} onChange={e => setImage(e.target.value)} required/>
					<Botao type="submit" disabled={botao===true ? "" : "disabled"}>
						{botao===true ? "Cadastrar" : <Circles type="ThreeDots" color="#FFF" height={50} width={50} />}
					</Botao>
				</form>
				<Link to="/">
					<p>Já tem uma conta? Faça login!</p>
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

const Botao = styled.button`
  width: 94%;
  height: 45px;
  background-color: #52b6ff;
  opacity: 0.6;
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
`;
