import styled from "styled-components";

export const Container = styled.div`

  .favorite__title{
    margin: 32px 0;
    text-align: center;
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