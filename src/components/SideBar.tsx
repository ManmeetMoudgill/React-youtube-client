import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import React from "react";
import styled from "styled-components";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
type Props = {};
const SideBarContainer = styled.div`
  min-width: 6rem;
  position: fixed;
  top: 3.5rem;
  border: 2px solid green;
  left: 0.2rem;
  height: 100%;
`;
const Item = styled.div`
  display: flex;
  font-size: 0.8rem;
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
`;
const SideBar = (props: Props) => {
  return (
    <>
      <SideBarContainer>
        <Wrapper>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0.3rem 0rem 0.3rem 0rem",
            }}
          >
            <Item>
              <HomeIcon
                sx={{
                  fontSize: "2rem",
                  marginTop: "0.5rem",
                }}
              />
              Home
            </Item>
          </Link>
          <Link
            to="/subscriptions"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0.3rem 0rem 0.3rem 0rem",
            }}
          >
            <Item>
              <SubscriptionsOutlinedIcon
                sx={{
                  fontSize: "2rem",
                  marginTop: "0.5rem",
                }}
              />
              Subscriptions
            </Item>
          </Link>
          <Link
            to="/history"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0.3rem 0rem 0.3rem 0rem",
            }}
          >
            <Item>
              <HistoryOutlinedIcon
                sx={{
                  fontSize: "2rem",
                  marginTop: "0.5rem",
                }}
              />
              History
            </Item>
          </Link>
        </Wrapper>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
