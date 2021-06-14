import React, {useEffect, useState} from "react"
import styled from 'styled-components';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {useHistory} from "react-router-dom";


const Favorite = () => {
    const [chars, setChars] = useState([]);
    const [charId, setCharId] = useState([]);
    const [favoriteChars, setFavoriteChars] = useState([]);
    const history = useHistory();
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=6/")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChars(data.results);
            });
    }, [])

    const makingNewCharsWithIds = () => {
        chars.map((char, index) => {
            char.id = index;
            setCharId(prevState => [...prevState, char])
        })
    }

    useEffect(() => {
        makingNewCharsWithIds();
    }, [chars])

    useEffect(() => {
        filterChars()
    }, [charId])

    const filterChars = () => {
        const arrayIds = JSON.parse(localStorage.getItem('favourites'));

        const res = arrayIds?.map((favId) => {
            const fil = charId.filter((char) => char.id === favId);
            return fil[0];
        })
        setFavoriteChars(res);
    }
    return (
        <Container>
            {favoriteChars?.map((char, index) => <Flex key={char?.id}>
                    <Wrapper>
                        <PokemonImg alt="pokemon"
                                    src={`https://img.pokemondb.net/artwork/large/${char?.name}.jpg`}
                                    className="pokemons"
                                    onClick={() => history.push(`/${index}`, {url: char.url, name: char.name})}
                        />
                    </Wrapper>
                    <Info>
                        <Name>{char?.name}</Name>
                        <FavoriteIcon/>
                    </Info>
                </Flex>
            )}
        </Container>

    )
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px;
`
const PokemonImg = styled.img`
  width: 100px;
  max-height: 150px;
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  align-items: center;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  margin-bottom: 20px;
`
const Info = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;

`
const Name = styled.span`
  text-align: left;
  display: inline-block;
`
const Wrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Favorite;