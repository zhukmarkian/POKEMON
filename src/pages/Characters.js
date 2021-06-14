import React, {useEffect, useState} from "react";
import CharCard from "../components/CharCards/CharCard";
import styled from 'styled-components';


function Characters() {
    const [chars, setChars] = useState([]);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=6/")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChars(data.results);
            });
    }, [])
    return (
        <Container><CharCard chars={chars}/></Container>
    )
}

const Container = styled.div`
  max-height: 100vh;
`

export default Characters;
