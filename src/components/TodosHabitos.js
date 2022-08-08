import React, { useContext } from "react";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import HabitosDiarios from "./HabitosDiarios";
import axios from "axios";
import UserContext from "../components/UserContext";

export default function TodosHabitos({ habito, habitoUsuario }) {
	const { usuario } = useContext(UserContext);
	const semana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
	const usuarioLocal = JSON.parse(localStorage.getItem("user"));

	function apagarHabito(id, ajuste) {
		const solicitar = axios.delete(
		  `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
		  ajuste
		);
		return solicitar;
	  }

	function deletarHabito(habito){
		if (window.confirm(`Deseja realmente apagar o hábito?"${habito.name}"?`)){
			const configurar = { headers: { Authorization: `Bearer ${usuario.token || usuarioLocal}` } };
			const id = habito.id;
			const req = apagarHabito(id, configurar);

			req.then(() => habitoUsuario());
			req.catch(() => alert("Ocorreu um erro na exclusão do hábito. Tente novamente."));
		}
	}

	return (
		<Container>
			<Titulo>
				<p>{habito.name}</p>
				<BsTrash color="#666" size="16px" onClick={() => deletarHabito(habito)}/>
			</Titulo>
			<Dias>
				{semana.map((w,i) => (
					<HabitosDiarios key={i} day={w} markedDay={habito.days.includes(i)} />
				))}
			</Dias>
		</Container>
	);
}

const Container = styled.div`
	background-color: #FFF;
    margin: 0 auto 10px auto;
    height: 91px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    p {
        font-size: 20px;
        line-height: 25px;
        color: #666;
    }
`;

const Titulo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Dias = styled.div`
    display: flex;
`;