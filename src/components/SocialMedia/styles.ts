import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  .divider{
    height: 48px;
    width:2px ;
    background: #FFF;
  }
`;

export const Link = styled.a.attrs({ target: "_blank" })`
  display: block;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const Avatar = styled.div`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 48px;

  svg {
    width: 2rem;
    height: 2rem;
  }

  .avatar{
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const Dropdown = styled.div`
  display: block;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 20px;

  & a{
    text-decoration: none;
    color: #000;
  }

  & p{
    width: 120px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    svg {
    width: 1.2rem;
    height: 1.2rem;
  }
  }
`;