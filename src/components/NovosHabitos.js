//REvisar 
import React, { useContext, useState } from "react";
import UserContext from "../components/UserContext";
import axios from "axios";
import styled from "styled-components";
import { Circles }  from "react-loader-spinner";

export default function NovosHabitos({box, setBox, habitosDoUsuario}) {
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [days, setDays] = useState([]);
	const [enabled, setEnabled] = useState(true);
	const semana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
	const usuarioLocal = JSON.parse(localStorage.getItem("user"));
    
    function criarHabito(conteudo, ajuste) {
    const solicitar = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
        conteudo,
        ajuste
    );
        return solicitar;
    }

	function selecionarDia(i) {
		(days.includes(i)) ? 
			setDays(days.filter(s => s !== i))
			:
			setDays([...days, i]);
	}
    
	function criarNovoHabito(conteudo) {
		conteudo.preventDefault();

		setEnabled(false);

		const body = {name, days};
		const configurar = { headers: { Authorization: `Bearer ${user.token || usuarioLocal}` } };
		const req = criarHabito(body, configurar);

		req.then(() => {
			habitosDoUsuario();
			setName("");
			setDays([]);
			setEnabled(true);
			setBox(!box);
		});
		req.catch(() => {
			setName("");
			setDays([]);
			setEnabled(true);
			alert("Ocorreu um erro. Tente novamente.");
		});
	}

	return (
		<Container>
			<form onSubmit={criarNovoHabito}>
				<input placeholder="nome do hábito" maxLength="16" onChange={(conteudo) => setName(conteudo.target.value)} value={name} required/>
				<Dias>
					{semana.map((w,i) => (
						<Dia key={i} selected={days.includes(i)} onClick={() => selecionarDia(i)} disabled={enabled===true ? "" : "disabled"} >
							{w}
						</Dia>
					))}
				</Dias>
				<Botao>
					<p onClick={() => setBox(!box)}>
                        Cancelar
					</p>
					<button type="submit" disabled={enabled ? "" : "disabled"} >
						{enabled===true ? "Salvar" : <Circles type="ThreeDots" color="#FFF" height={35} width={35} />}
					</button>
				</Botao>
			</form>
		</Container>
	);
}

const Container = styled.div`
    background-color: #FFF;
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 29px;
    input {
        background-color: #FFFFFF;
        width: 303px;
        height: 45px;
        padding-left: 11px;
        border: 1px solid #D5D5D5;
        font-size: 20px;
        border-radius: 5px;
        margin-bottom: 8px;
        ::placeholder {
        color: #DBDBDB;  
        }
        :focus {
            outline: 0;
            color: #666666;
        }
    }
`;

const Dias = styled.div`
    display: flex;
    margin-bottom: 29px;
`;

const Dia= styled.div`
    background-color: ${props => (props.selected ? "#CFCFCF" : "#FFF")};
    width: 30px;
    height: 30px;
    margin-right: 4px;
    border: 1px solid ${props => (props.selected ? "#CFCFCF" : "#D4D4D4")};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => (props.selected ? "#FFF" : "#DBDBDB")};
    font-size: 20px;
`;

const Botao = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p {
        font-size: 15.976px;
        line-height: 20px;
        color: #52B6FF;
        margin-right: 23px;
    }
    button {
        width: 84px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: none;
        font-size: 16px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;