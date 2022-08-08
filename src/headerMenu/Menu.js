import React, { useContext } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import Porcentagem from "../components/Porcentagem";

export default function Menu () {
    const { porcento } = useContext(Porcentagem);
    return (
        <Rodape>
                <Link to="/Habitos">
                    <Botao>Hábitos</Botao>
                </Link>
                <Link to="/Hoje">
					<BotaoCircular>
						<CircularProgressbar value={porcento} text={"Hoje"} backgroundPadding={5} styles={buildStyles({textAlign:"center", textSize: "22px", textColor: "#FFF", trailColor: "#52B6FF", pathColor: "#FFF"})}/>
					</BotaoCircular>
				</Link>
                <Link to="/Historico">
                    <Botao>Histórico</Botao>
                </Link>
           
        </Rodape>
    )
}

const Rodape = styled.div`
    width: 100%
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const BotaoCircular = styled.button`
    width: 90px;
    height: 90px;
    background-color: #52B6FF;
    border-radius: 50%;
    position: fixed;
    z-index: 2;
    bottom: 8px;
    right: calc(50% - 45px);
`

const Botao = styled.a`
    font-size: 18px;
    display: flex;
    text-align: center;
    color: #52B6FF;
`