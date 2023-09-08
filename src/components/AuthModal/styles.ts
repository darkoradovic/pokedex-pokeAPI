import styled, {keyframes} from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: ${() => (window.innerHeight < 650 ? "flex-start" : "center")};

  overflow-y: scroll;

  @media (max-width: 62.5rem) {
    align-items: start;
  }

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: #060b28;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2f5aff;
    border-radius: 0.5rem;
    border: 0.25rem solid #060b28;
  }
`;

const modal = keyframes`
  to {
    opacity: initial;
    transform: initial; 
  }
`;

export const Modal = styled.div`
  background: rgba(6, 11, 40, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  position: relative;
  display: grid;
  grid-template-columns: 21rem 3.5rem 34.75rem;
  align-items: end;
  opacity: 0;
  transform: scale(0.8);
  animation: ${modal} 0.4s forwards;
  margin: ${() => (window.innerHeight < 650 ? "12.87rem 1rem 7rem" : "0")};
  max-width: 300px;
  padding: 32px;

  @media (max-width: 62.5rem) {
    width: 100%;
    grid-template-columns: 1fr;
    margin: 14rem 1rem 7rem;
  }

  .login{
    max-width: calc(300px - 64px);
  }

  .login__container{
    max-width: calc(300px - 64px);
    display:  flex;
    flex-direction: column;

    .login__textBox{
        background: none;
  margin-bottom: 10px;
  line-height: 2.4em;
  color: #FFF;
  font-weight: 300;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
  font-size: 19px;
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.65);
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  }

  .login__textBox:focus {
  outline: none;
  border-color: #FFF;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}

.login__textBox::placeholder {
 color: #FFF;
}

.login__btn{
    width: 100%;
    cursor: pointer;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.65);
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-size: 19px;
  font-size: 1rem;
  font-weight: 300;
  line-height: 2.5em;
  margin-top: auto;
  margin-bottom: 15px;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}

.login__btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}

.forgot_password{
    border: none ;
    background: none;
    color: #FFF;
    text-decoration: underline;
}

.register__switch{
    margin-top: 24px;
    display: flex ;
    flex-direction: column;
    align-items: center;

    & span{
        cursor: pointer;
        text-decoration: underline;
    }
}
  }

 
`;
