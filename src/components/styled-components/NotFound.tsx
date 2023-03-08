import styled from "styled-components";
const Image = styled.img`
  width: 30%;
  height: 30%;
  object-fit: contain;
  transform: translateZ(0);
  animation: animateDown infinite  1.5s;
  @keyframes animateDown {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-20px, 0);
    }
    50% {
      transform: translate(-20px, 20px);
    }
    100% {
      transform: translate(0, 20px);
    }
`;

export { Image };
