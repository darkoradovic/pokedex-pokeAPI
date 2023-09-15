import styled from "styled-components";
import pokeballBackground from "../../assets/background-pokeball.svg";

interface HeroProps{
  type?: string
  buttonType?: string
  isFavoritePage?: boolean
  isSuccessPage?: string 
}

export const Container = styled.div<HeroProps>`
  display: ${props => props.isSuccessPage === '/success' && 'none'};
  // background: linear-gradient(180deg, #ee8328 0%, #e14318 100%);
  background: ${props => 
   props.type === 'bug' ? 'linear-gradient(180deg, #ceff86 0%, #7bcf00 100%)' :  
   props.type === 'dark' ? 'linear-gradient(180deg, #bbb9c6 0%, #5a566a 100%)'  :
   props.type === 'dragon' ? 'linear-gradient(180deg, #99c8ff 0%, #0076ff 100%)' : 
   props.type === 'electric' ? 'linear-gradient(180deg, #fff299 0%, #ffde00 100%)' : 
   props.type === 'fairy' ? 'linear-gradient(180deg, ##ffc8ff 0%, #ff76ff 100%)' : 
   props.type === 'fighting' ? 'linear-gradient(180deg, ##ffa6bd 0%, #ff215b 100%)' : 
   props.type === 'fire' ? 'linear-gradient(180deg, #ffd699 0%, #ff9900 100%)' : 
   props.type === 'flying' ? 'linear-gradient(180deg, #d0e5ff 0%, #89bdff 100%)' : 
   props.type === 'ghost' ? 'linear-gradient(180deg, ##b8c3ff 0%, #4e6aff 100%)' : 
   props.type === 'grass' ? 'linear-gradient(180deg, #9df896 0%, #1cd80e 100%)' : 
   props.type === 'ground' ? 'linear-gradient(180deg, #ffc49e 0%, #ff6b0d 100%)' : 
   props.type === 'ice' ? 'linear-gradient(180deg, #abf4e8 0%, #2ee4c6 100%)' : 
   props.type === 'normal' ? 'linear-gradient(180deg, #d9dad8 0%, #9fa39d 100%)' : 
   props.type === 'poison' ? 'linear-gradient(180deg, #f9b6ff 0%, #f149ff 100%)' : 
   props.type === 'psychic' ? 'linear-gradient(180deg, #ffc4c1 0%, #ff6c64 100%)' : 
   props.type === 'rock' ? 'linear-gradient(180deg, #efe4bd 0%, #d8bc5a 100%)' : 
   props.type === 'steel' ? 'linear-gradient(180deg, #9edfed 0%, #23a1bd 100%)' : 
   'linear-gradient(180deg, #a1dcff 0%, #14a8ff 100%)'};
  position: relative;
  overflow: hidden;
  background: ${props => props.isFavoritePage && '#060B28'} ;

  &::before,
  &::after {
    content: "";
    display: ${props => props.isFavoritePage ? 'none' : 'block'};
    width: 25rem;
    height: 25rem;
    background: url(${pokeballBackground}) no-repeat;
    background-size: cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -12.5rem;
  }

  &::after {
    right: -12.5rem;
  }

  @media (max-width: 31.25rem) {
    &::before,
    &::after {
      display: none;
    }
  }
`;

export const Content = styled.div`
  margin: 4.5rem 0 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 71.88rem) {
    flex-direction: column;
  }

  @media (max-width: 31.25rem) {
    margin: 3.5rem 0 5rem;
  }
`;

export const CharizardData = styled.div`
  max-width: 26.13rem;

  @media (max-width: 71.88rem) {
    max-width: 37.5rem;
    text-align: center;
  }

  @media (max-width: 31.25rem) {
    text-align: left;
  }
`;

export const CharizardNumber = styled.span`
  font-size: 1.5rem;
  line-height: 135%;
  font-weight: 700;
`;

export const CharizardTypes = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;

  button {
    cursor: default;
  }

  @media (max-width: 71.88rem) {
    justify-content: center;
  }

  @media (max-width: 31.25rem) {
    justify-content: flex-start;
  }
`;

export const CharizardName = styled.h1`
  font-size: 4rem;
  line-height: 135%;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: 31.25rem) {
    font-size: 3rem;
  }
`;

export const CharizardDescription = styled.p`
  font-size: 1rem;
  line-height: 150%;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

export const MoreDetailsButton = styled.button<HeroProps>`
  width: 100%;
  height: 3rem;
  background: #fff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  line-height: 150%;
  font-weight: 700;

  & p{
    color: ${props => 
   props.buttonType === 'bug' ? ' #7bcf00 )' :  
   props.buttonType === 'dark' ? '#5a566a )'  :
   props.buttonType === 'dragon' ? ' #0076ff )' : 
   props.buttonType === 'electric' ? ' #ffde00 )' : 
   props.buttonType === 'fairy' ? ' #ff76ff )' : 
   props.buttonType === 'fighting' ? ' #ff215b )' : 
   props.buttonType === 'fire' ? ' #ff9900 )' : 
   props.buttonType === 'flying' ? ' #89bdff )' : 
   props.buttonType === 'ghost' ? ' #4e6aff )' : 
   props.buttonType === 'grass' ? ' #1cd80e)' : 
   props.buttonType === 'ground' ? ' #ff6b0d )' : 
   props.buttonType === 'ice' ? '#2ee4c6 )' : 
   props.buttonType === 'normal' ? ' #9fa39d )' : 
   props.buttonType === 'poison' ? ' #f149ff )' : 
   props.buttonType === 'psychic' ? ' #ff6c64 )' : 
   props.buttonType === 'rock' ? ' #d8bc5a )' : 
   props.buttonType === 'steel' ? ' #23a1bd )' : 
   '#14a8ff )'};
  }
 

  svg {
    width: 1.5rem;
    height: 1.5rem;

    path {
      fill: currentColor;
    }
  }

  @media (max-width: 71.88rem) {
    width: 13rem;
    margin: 0 auto;
  }

  @media (max-width: 31.25rem) {
    width: 100%;
  }
`;

export const Divider = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 13.25rem;
    margin: 0 auto;
  }

  &::before {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
  }

  &::after {
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  svg {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media (max-width: 71.88rem) {
    position: static;
    transform: initial;
    flex-direction: row;
    align-items: center;
    margin: 2rem 0;

    &::before,
    &::after {
      width: 13.25rem;
      height: 1px;
    }

    &::before {
      background: linear-gradient(
        270deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &::after {
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

export const CharizardImg = styled.div`
  img {
   height: 412px;
  }
`;
