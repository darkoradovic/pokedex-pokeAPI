import styled from "styled-components";

export const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
 

  li:first-child {
    margin-right: 1rem;
  }

  li:last-child {
    margin-left: 1rem;
  }

  .page__search{
    display: flex;
    height: 40px;

    .input__page__number{
      height: 40px;
    min-width: 60px;
    background: none;
    border: 0.13rem solid rgb(47, 90, 255);
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.5rem;
    font-family: Montserrat;
    font-size: 1rem;
    line-height: 150%;
    font-weight: 400;
    color: rgb(255, 255, 255);
    outline: none;
  }
  }

 
`;

export const Button = styled.button<{
  selected?: boolean;
  navigation?: boolean;
}>`
  width: ${(props) => (props.navigation ? "2rem" : "2.5rem")};
  height: ${(props) => (props.navigation ? "2rem" : "2.5rem")};
  background: ${(props) => (props.selected ? "#2F5AFF" : "none")};
  border: ${(props) => (props.navigation ? "none" : "0.13rem solid #fff;")};
  border-radius: 0.5rem;

  font-family: "Montserrat";
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Ellipsis = styled.span`
  display: block;
  padding: 0.75rem 0;

  font-family: "Montserrat";
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  color: #fff;
`;

export const SearchButton = styled.button`
  width: 3.5rem;
  height: 100%;
  background: #2f5aff;
  border-radius: 0 0.5rem 0.5rem 0;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;