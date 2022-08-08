import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import styled from "styled-components";
import { AiFillCheckSquare } from "react-icons/ai";

export default function HabitosDoDia({ habit, habitosDeHoje }){

	const { user } = useContext(UserContext);
	const [color, setColor] = useState(false);
	const localUser = JSON.parse(localStorage.getItem("user"));

	function habitoConcluido(id, ajuste) {
	const solicitar = axios.post(
		`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
		{},
		ajuste
	);
	return solicitar;
	}

	function habitoNaoRealizado(id, ajuste) {
	const solicitar = axios.post(
		`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
		{},
		ajuste
	);
	return solicitar;
	}

	function FeitoOuNao(habit){
		const config = { headers: { Authorization: `Bearer ${user.token || localUser}` } };
		const id = habit.id;
		let req = "";

		(habit.done) ? (req = habitoNaoRealizado(id, config)) : (req = habitoConcluido(id, config));

		req.then(() => {
			habitosDeHoje();
			setColor(true);
		});
		req.catch(() => alert("Ocorreu um erro na marcação do hábito. Tente novamente."));
	}

	return (
		<> 
			<Content>
				<div>
					<h1>{habit.name}</h1>
					<p>Sequência atual: <Sequence color={habit.done && color}>{habit.currentSequence} {habit.currentSequence===1 ? "dia" : "dias"}</Sequence></p>
					<p>Seu recorde: <Sequence color={habit.highestSequence>0 && habit.highestSequence===habit.currentSequence}>{habit.highestSequence} {habit.highestSequence===1 ? "dia" : "dias"}</Sequence></p>
				</div>
				<Check color={habit.done} onClick={() => FeitoOuNao(habit)}/>
			</Content>
		</>
	);
}

const Content = styled.div`
    margin: 0 auto;
    height: 94px;
    background: #FFF;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    div {
        width: max-content;
    }
    h1 {
        font-size: 20px;
        color: #666;
        margin-bottom: 3px;
    }
    p {
        font-size: 13px;
        color: #666;
        margin-bottom: 2px;
    }
`;

const Check = styled(AiFillCheckSquare)`
  font-size: 89px;
  color: ${props => (!props.color) ? "#EBEBEB" : "#8FC549"};
`;

const Sequence = styled.span`
    color: ${props => (!props.color) ? "#666" : "#8FC549"};
`;