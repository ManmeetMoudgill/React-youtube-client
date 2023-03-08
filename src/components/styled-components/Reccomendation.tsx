import styled from "styled-components";
const Container = styled.div`
  flex: 1;
`;

const LargeDevicesVideos = styled.div`
  flex: 1;
  flex-direction: column;
  display: none;
  @media (min-width: 1000px) and (max-width: 2600px) {
    display: flex;
  }
`;

const SmallDevicesVideos = styled.div`
  flex: 1;
  flex-direction: column;
  @media (min-width: 320px) and (max-width: 999px) {
    display: flex;
  }
  @media (min-width: 1000px) and (max-width: 2600px) {
    display: none;
  }
`;

export { Container, LargeDevicesVideos, SmallDevicesVideos };
