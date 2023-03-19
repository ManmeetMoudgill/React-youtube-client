import React, { memo } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useEventCallback } from "@mui/material";
import "./css/index.css";
import {
  Container,
  Wrapper,
  Logo,
  Img,
  Item,
  Hr,
  Login,
  Button,
  Title,
  WrapperYoutube,
} from "./styled-components/Menu";
interface MenuProps {
  isOpen: boolean;
  setOpenSideBar: (value: boolean) => void;
}

const Menu = ({ isOpen, setOpenSideBar }: MenuProps) => {
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
            <Logo onClick={() => {}}>
              <Img src={"/images/logo.png"} />
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
        <Item
          onClick={() => {
            navigate("/history");
            setOpenSideBar(!isOpen);
          }}
        >
          <HistoryOutlinedIcon />
          History
        </Item>
        {!user ? (
          <>
            <Hr />
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button onClick={() => setOpenSideBar(!isOpen)}>
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
      </Wrapper>
    </Container>
  );
};

export default memo(Menu);
