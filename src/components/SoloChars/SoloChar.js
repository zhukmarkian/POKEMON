import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'


export default function SoloChar() {
    const [char, setChar] = useState([]);
    const [charName, setCharName] = useState();
    const [check, setCheck] = useState(false);
    const [arrayIds, setArrayIds] = useState([]);

    const checkingFav = () => {
        const res = JSON.parse(localStorage.getItem('favourites'));
        const checkChar = res?.filter((id) => id === (char.id - 1))
        if (checkChar?.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    const addFavourite = async (char, index) => {
        char.id = index;
        const response = char.favourite = true;
        await setArrayIds(prevState => [...prevState, char.id])
        if (response) {
            localStorage.setItem(`${char?.id}`, JSON.stringify({id: char.id, name: char.name}));
        }

    }
    const deleteFavourite = (char, index) => {
        char.favourite = false;
        localStorage.removeItem(index)
        localStorage.removeItem('favourites')

    }
    const location = useLocation();
    const fetchUrl = (state) => {
        state && (axios
            .get(`${state?.url}`)
            .then(res => {
                setChar(res.data);
                setCharName(state?.name)
            })
            .catch(err => {
                console.log(err.message);
            }))
    }
    useEffect(() => {
        fetchUrl(location.state)
    }, []);

    useEffect(() => {
        arrayIds.length > 0 && localStorage.setItem('favourites', JSON.stringify(arrayIds));
    }, [arrayIds])

    return (
        <Container>
            <ImgContainer>
                <Avatar src={`https://img.pokemondb.net/artwork/large/${charName}.jpg`} alt="character"/>
                <Name>{charName}</Name>
            </ImgContainer>
            <InfoContainer>
                <Flex>Base Experience <Text>{char?.base_experience} XP</Text></Flex>
                <hr/>
                <Flex>Height<Text>{char?.height} m</Text></Flex>
                <hr/>
                <Flex>Weight<Text>{char?.weight} kg</Text></Flex>
                <hr/>
                <Flex>Types<Info>{char?.types?.map((type) => <Text>{type.type.name},</Text>)}</Info></Flex>
                <hr/>
                <Flex>Abilities<Info>{char?.abilities?.map((ability) =>
                    <Text>{ability.ability.name}</Text>)}</Info></Flex>
                <hr/>
                {checkingFav()
                    ?
                    <BTN onClick={() => {
                        deleteFavourite(char, char.id - 1);
                        setCheck(true)
                    }}><WhiteFavourite/><Words>Remove from Favorites</Words></BTN>
                    :
                    <Box onClick={() => {
                        addFavourite(char, char.id - 1);
                        setCheck(false)
                    }}><WhiteFavourite/><TXT>Add to Favorites</TXT></Box>
                }
            </InfoContainer>
        </Container>

    )
}
const Words = styled.span`
  color: #4b974d;
  font-style: initial;
  font-weight: bold;
  font-size: medium;
`
const BTN = styled.button`

  background: white;
  align-items: center;
  border: 2px solid #7EB57E;
  box-sizing: border-box;
  border-radius: 8px;
  width: 80%;
  margin-left: 10%;
  display: flex;
  justify-content: center;
  padding: 10px;
  color: #4b974d;
`
const WhiteFavourite = styled(FavoriteBorderIcon)`
  color: white;
  margin-right: 20px;
`

const Box = styled.button`
  border: white;
  background: #4b974d;
  align-items: center;
  border-radius: 0.9rem;
  width: 80%;
  margin-left: 10%;
  display: flex;
  justify-content: center;
  padding: 10px;
`
const TXT = styled.span`
  color: white;
  font-style: initial;
  font-weight: bold;
  font-size: medium;
`
const Container = styled.div`
`
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: #F2F2F2;
  flex-direction: column;
`
const Avatar = styled.img`
  width: 30%;
  height: 50%;
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5px;
`
const Text = styled.span`
  margin-right: 10px;
  font-style: initial;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`
const Name = styled.span`
  font-style: initial;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
`
const InfoContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
`
const Info = styled.div`
  span {
    margin-left: 20px;
  }
`