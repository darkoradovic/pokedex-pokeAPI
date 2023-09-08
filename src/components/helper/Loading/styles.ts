import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  .loader
{
    font-size: 1.2rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15vh 0;
    flex-direction: column;
}

.loader::before
{
    content: '';
    display: block;
    height: 2em;
    width: 2em;
    border: .6em solid #FB6C6C;
    border-radius: 100%;
    margin-bottom: 10px;
    clip-path: polygon( 0 0, 0 40%, 50% 40%, 50% 60%, 0 60%, 0 100%, 100% 100%, 100% 60%, 50% 60%, 50% 40%, 100% 40%, 100% 0 );
    animation: spin .5s infinite ease-in-out;
}

@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}

.loader::after
{
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -1.5em;
    height: 1.2em;
    width: 1.2em;
    background-color: #000;
    border: 4px solid white;
    border-radius: 100%;
}
`;
