import styled from "styled-components";

export const Container = styled.div`

  .favorite__title{
    margin: 32px 0;
    text-align: center;
  }

  .success__page{
    background-color: #003241;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    & img{
      height: 350px;
    }
  }

`;

export const Filters = styled.div`
    display: flex ;
    align-items: center;
    gap: 24px;
    margin: 48px auto;

    & button{
        min-width: 120px;
    }
`;