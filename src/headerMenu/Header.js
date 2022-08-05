import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";

export default function Header (){
    const {user} = useContext(UserContext);
    return (
        <Topo>
            <h1>TrackIt</h1>
            <img src={user.img} alt="{user.name}" />
        </Topo>
    )
}

const Topo = styled.div`

    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    z-index: 1;

    h1{
        color: #FFFFFF;
        font-family: 'Playball';
        font-size: 39px;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 50%
    }
`