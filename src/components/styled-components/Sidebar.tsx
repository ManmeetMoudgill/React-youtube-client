import styled from "styled-components";

const SideBarContainer = styled.div`
  min-width: 6rem;
  position: fixed;
  top: 3.5rem;
  left: 0.2rem;
  height: 100%;
  @media (min-width: 320px) and (max-width: 400px) {
    left: 0rem;
  }
  @media (min-width: 401px) and (max-width: 1200px) {
    left: 1rem;
  }
  @media (min-width: 1201px) and (max-width: 2600px) {
    left: 0rem;
  }
`;
const Item = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 7.5px 0px 7.5px 0px;
  &:hover {
    background-color: whitesmoke;
    border-radius: 2rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 1200px) {
    max-width: 3.5rem;
  }
`;
const IconName = styled.div`
  font-size: 1rem;
  @media (min-width: 320px) and (max-width: 1200px) {
    display: none;
  }
`;

export { SideBarContainer, Item, Wrapper, IconName };
