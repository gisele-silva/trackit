import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "../telas/Login";
import Cadastro from "../telas/Cadastro";
import Habitos from "../telas/Habitos";
import Hoje from "../telas/Hoje";
import Historico from "../telas/Historico"
import UserContext from "./UserContext";
import Porcentagem from "./Porcentagem";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [porcentagem, setPorcentagem] = useState(0);
  return (
    <>
    <UserContext.Provider value={(user, setUser)}>
      <Porcentagem.Provider value={(porcentagem, setPorcentagem)}>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/habitos" element={<Habitos />} />
              <Route path="/hoje" element={<Hoje />} />
              <Route path="/historico" element={<Historico />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Porcentagem.Provider>
    </UserContext.Provider>
    </>
  );  
}
