import React from "react";
import styled from "styled-components";
import Header from ".././headerMenu/Header"
import Menu from ".././headerMenu/Menu"

export default function Historico(){
	return (
		<>
			<Header />
			<Container>
				<h2>Histórico</h2>
				<p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
			</Container>
			<Menu />
		</>        
	);
}

const Container = styled.div`
    background-color: #EBEBEB;
	min-height: 800%;
	padding: 98px 20px 110px 20px;
    h2 {
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 15px;
    }
    p {
        font-size: 18px;
        line-height: 22px;
        color: #666;
    }
`;