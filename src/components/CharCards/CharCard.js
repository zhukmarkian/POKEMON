import React, {useEffect, useState} from "react"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';


const CharCard = ({chars}) => {
    const history = useHistory();
    const [check, setCheck] = useState(false)
    const [arrayIds, setArrayIds] = useState([])


    const addFavourite = async (char, index) => {
        char.id = index;
        const response =  char.favourite = true;
        await setArrayIds(prevState => [...prevState, char.id])
        if (response) {
            localStorage.setItem(`${char?.id}`, JSON.stringify(char));
        }
        setCheck(!check);
    }

    useEffect(()=>{
        arrayIds.length>0 && localStorage.setItem(`favourites`, JSON.stringify(arrayIds));
    },[arrayIds])

    const deleteFavourite = (char, index) => {
        char.favourite = false;
        localStorage.removeItem(index)
        setCheck(!check)
    }

    return (
        <Conteiner>
            {chars.map((char, index) => <Flex>
                    <Wrapper>
                            <PokemonImg alt="pokemon"
                                        src={`https://img.pokemondb.net/artwork/large/${char.name}.jpg`}
                                        className="pokemons"
                                        onClick={()=>history.push(`/${index}`, {url:char.url, name: char.name})}
                            />
                    </Wrapper>
                    <Info>
                        <Name>{char.name}</Name>
                        {char?.favourite
                            ? <FavoriteIcon onClick={() => deleteFavourite(char, index)}/>
                            : <FavoriteBorderIcon onClick={() => addFavourite(char, index)}/>}
                    </Info>
                </Flex>
            )}

        </Conteiner>

    )
}
const PokemonImg = styled.img`
  width: 100px;
  max-height: 150px;
`
const Conteiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  margin-top: 5%;
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
export default CharCard;
