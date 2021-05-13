import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Form = ({setMoneda,  setCriptomoneda }) => {

    // state del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar estadounidense' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra esterlina' },
        { codigo: 'AUD', nombre: 'Dolar australiano' },
        { codigo: 'NZD', nombre: 'Dolar neozelandes' },
        { codigo: 'SEK', nombre: 'Corona sueca' },
        { codigo: 'CHF', nombre: 'Franco Suizo' },
        { codigo: 'MXN', nombre: 'Peso mexicano' },
        { codigo: 'COP', nombre: 'Peso colombiano' },
        { codigo: 'ARS', nombre: 'Peso argentino' },
        { codigo: 'CLP', nombre: 'Peso chileno' },
        { codigo: 'PEN', nombre: 'Sol' },
        { codigo: 'VEF', nombre: 'Bolivar' }
    ];

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);


    // cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        // pasar los datos al componente principal
        guardarError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Form;