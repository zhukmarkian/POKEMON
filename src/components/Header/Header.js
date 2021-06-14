import React from "react"
import logo from '../../images/path196.png'
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useHistory} from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const HeaderCard = () => {
    const history = useHistory()
    return (
        <Header>
            <ArrowBlack onClick={() => history.push('/')}/>
            <LogoHeader src={logo} alt={'logo'}/>
            <WhiteFavoriteIcon onClick={() => history.push('/favorite')}/>
        </Header>

    )
}
const ArrowBlack = styled(ArrowBackIosIcon)`
  color: white;
  margin-right: 20px;
`
const Header = styled.div`
  height: 70px;
  width: 100%;
  background-color: #201D2A;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LogoHeader = styled.img`
  width: 100px;
  color: white;
  position: fixed;
`
const WhiteFavoriteIcon = styled(FavoriteIcon)`
  color: white;
  margin-left: 65%;
`
export default HeaderCard;