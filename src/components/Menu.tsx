import React, { memo } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useEventCallback } from "@mui/material";
import "./css/index.css";
const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  max-width: 250px;
  overflow-y: scroll;
  animation:slide-in 0.5s ease-in;
  @keyframes slide-in {
    from {
        opacity:0;
    }
    to {
        opacity1;
    }
  
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 0.4rem;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const WrapperYoutube = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0rem 0 1rem 0rem;
`;
interface MenuProps {
  isOpen: boolean;
  setOpenSideBar: (value: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Menu = ({ darkMode, setDarkMode, isOpen, setOpenSideBar }: MenuProps) => {
  const { user } = useSelector((state: RootState) => state?.user);
  const navigate = useNavigate();
  const closeSide = useEventCallback(() => {
    setOpenSideBar(false);
  });

  return (
    <Container>
      <Wrapper>
        <WrapperYoutube>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setOpenSideBar(!isOpen)}
          >
            <ReorderIcon />
          </div>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "1rem",
            }}
          >
            <Logo>
              <Img
                src={
                  "https://github.com/safak/youtube2022/blob/react-video-ui/src/img/logo.png?raw=true"
                }
              />
              ManmeetYoutube
            </Logo>
          </Link>
        </WrapperYoutube>

        <Link
          onClick={closeSide}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link
          onClick={closeSide}
          to="trends"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          onClick={closeSide}
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item onClick={() => navigate("/history")}>
          <HistoryOutlinedIcon />
          History
        </Item>
        {!user ? (
          <>
            <Hr />
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
          </>
        ) : undefined}
        <Hr />
        <Title>BEST OF LAMATUBE</Title>
        <Link
          onClick={closeSide}
          to="category/music"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </Link>
        <Link
          onClick={closeSide}
          to="category/sports"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
        </Link>
        <Link
          onClick={closeSide}
          to="category/gaming"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
        </Link>
        <Link
          onClick={closeSide}
          to="category/movies"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <MovieOutlinedIcon />
            Movies
          </Item>
        </Link>
        <Link
          onClick={closeSide}
          to="category/news"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
        </Link>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>

        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default memo(Menu);
