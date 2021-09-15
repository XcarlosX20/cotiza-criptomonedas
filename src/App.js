/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import crypto from './img/crypto-min.png';
import Form from './Components/Form';
import Result from './Components/Result';
import axios from 'axios';
import Spinner from './Components/Spinner/Spinner';
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 5px;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Img = styled.img`
max-width: 100%;
margin-top: 4rem;
`;
const Heading = styled.h1`
font-family: Bebas Neue;
Color: #fff;
text-align: left;
font-weight: 700;
font-size: 4rem;
&::after{
  content: '';
  width: 100%;
  height: 6px;
  background-color: #66A2FE;
  display: block;
}
`;
function App() {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [resultado, setResultado] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
   const consultarApi = () => {
    if(moneda === "")return;
    setLoading(true);
    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`)
    .then(res => {
      setResultado(res.data.DISPLAY[criptomoneda][moneda]);
      setLoading(false);
    });

    }
    consultarApi();
  }, [moneda, criptomoneda]);
  return (
    <Container>
      <div>
        <Heading>HOLA HOMOSEXUAL(SANCHEZ)</Heading>
      </div>
      <div>
        <Img src={crypto} width="400px" alt="crypto" />
      </div>
      <div>
        <Form
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        /></div>
      <div>
        {loading ? <Spinner/> : <Result resultado={resultado}/>}
      </div>
    </Container>

  );
}

export default App;
