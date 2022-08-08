import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from ".././headerMenu/Header"
import Menu from ".././headerMenu/Menu"
import NovasHabilidades from "../components/NovosHabitos";
import TodasHabilidades from "../components/TodosHabitos";
import UserContext from "../components/UserContext";
import axios from "axios";

export default function Habitos() {
	const { user } = useContext(UserContext);
	const [box, setBox] = useState(false);
	const [habitos, setHabitos] = useState([]);
	const localUser = JSON.parse(localStorage.getItem("user"));


	function listarHabito(ajuste) {
	const solicitar = axios.get(
		`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
		ajuste
	);
	return solicitar;
	}

	useEffect(() => {
		userHabitos();
	},[]);
    
	function userHabitos(){
		const configuracao = { headers: { Authorization: `Bearer ${user.token || localUser}` } };
		const req = listarHabito(configuracao);

		req.then(resposta => setHabitos(resposta.data));
		req.catch(() => alert("Tente novamente mais tarde."));
	}

	return (
		<>
			<Header />
			<Container>
				<Titulo>
					<h1>Meus hábitos</h1>
					<div onClick={() => setBox(!box)}>+</div>
				</Titulo>
				{box === true ?
					<NovasHabilidades box={box} setBox={setBox} userHabitos={userHabitos}/>
					:
					""
				}				
				{habitos.length === 0 ? 
					<p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
					</p>
					:
					habitos.map(h => (
						<TodasHabilidades key={h.id} habito={h} userHabitos={userHabitos}/>
					))
					
				}
			</Container>
			<Menu />
		</>
	);
}

const Container = styled.div`
    background: #EBEBEB;
	min-height: 100%;
	padding: 98px 20px 110px 20px;
    
    p {
        font-size: 18px;
        line-height: 22px;
        color: #666;
    }
    h2 {
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;
    }
`;

const Titulo = styled.div`
    font-size: 23px;   
    color: #126BA5; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 29px;
    margin-bottom: 25px;
    
    div {
        background-color: #52B6FF;
        color: #FFF;
        width: 40px;
        height: 35px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;