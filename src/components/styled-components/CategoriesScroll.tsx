import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  margin-right: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  max-width: 100vw;

  @media (min-width: 320px) and (max-width: 400px) {
    padding-bottom: 0.5rem;
    margin-right: 0rem;
  }
  @media (min-width: 401px) and (max-width: 720px) {
    padding-bottom: 0.1rem;
    margin-right: 2rem;
  }
  @media (min-width: 721px) and (max-width: 1000px) {
    padding-bottom: 0.2rem;
  }
`;

interface ButtonProps {
  isClicked?: boolean;
}
const CategoryButtonItem = styled.button<ButtonProps>`
  width: 5rem;
  height: 2.5rem;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  background-color: ${({ isClicked }) =>
    isClicked ? "lightgray" : "whitesmoke"};
  margin: 0.5rem 1.5rem 0.5rem 0rem;
  padding: 0 1rem 0 1rem;
  border: transparent;
  cursor: pointer;
  border-radius: 0.5rem;

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ isClicked }) => !isClicked && "rgba(0,0,0,0.5)"};
    color: ${({ isClicked }) => !isClicked && "white"};
  }
  @media (min-width: 320px) and (max-width: 1000px) {
    min-width: 5rem;
    font-size: 0.8rem;
    height: 1.6rem;
  }
  @media (min-width: 1001px) and (max-width: 1200px) {
    min-width: 7rem;
    font-size: 0.8rem;
    height: 1.6rem;
  }
  @media (min-width: 1201px) and (max-width: 2600px) {
    min-width: 6rem;
    font-size: 0.8rem;
    height: 2.5rem;
  }
`;

export { Container, CategoryButtonItem };
