import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import logo from "./logo.png"
import UserContext from "../components/UserContext";

export default function Login () {
    const {setUser} = useContext(UserContext);
    const user = localStorage.getItem("user");
    const history = useHistory ();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [botao, setBotao] = useState(true);

    useEffect (() => {
        user ? history.push("/today") : setUser(null);
    }, [history, user, setUser]);

    function login(conteudo){
        conteudo.preventDefault();
        setBotao(false);

        const body = {email, senha};
        const entrar = entrar(body);

        entrar.then (resposta => {
            const novoUsuario = {id: entrar.data.id, name: entrar.data.name, token: entrar.data.token, image: entrar.data.image}
            setUser(novoUsuario);
            localStorage.setItem("user", JSON.stringify(entrar.data.token));
            history.push("/today")
        });
        entrar.catch(() => {
            alert("Senha ou email incorreto. Tente novamente ou clique em 'Esqueceu a senha?' para escolher uma outra.");
            setBotao(true);
        })
    }

    return (
        <>
            <ImgLogo>
                <img src={logo} alt=""/>
            </ImgLogo>
            <Container>
                <form onSubmit={login}>
					<Input type="text" placeholder="email" value={email} onChange={conteudo => setEmail(conteudo.target.value)} required/>
				
                    <Input type="password" placeholder="senha" value={senha} onChange={conteudo => setSenha(conteudo.target.value)} required/>
					
                    <Button type="submit" disabled={button===true ? "" : "disabled"}>
						{button===true ? "Entrar" : <Loader type="ThreeDots" color="#FFF" height={50} width={50} />}
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
`

const Body = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column.
    alignt-items: flex;

    h2{
        font-size: 14px;
        color: #52B6FF;
        text-align: center;
        text-decoration-line: underline;
    }
`

const Input = styled.input`
    width: 94%;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    ::placeholder{
        color: #DBDBDB;  
    }
`

const Button = styled.button`
    width: 94%;
    height: 45px;
    background-color: #52B6FF;
    opacity: 0.6;
    color: #FFF;
    font-size: 20px;
    border-radius: 5px;
`