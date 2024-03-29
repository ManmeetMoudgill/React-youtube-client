import React, { memo, useState, useRef, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { Menu, MenuItem, useEventCallback } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useDispatch } from "react-redux";
import { logout } from "../shell/reudx/slicers/user";
import UploadVideo from "./Upload";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "styled-components";
import {
  emptyVideosFromHistory,
  removeVideo,
} from "../shell/reudx/slicers/video";
import "./css/index.css";
import MenuComponent from "./Menu";
import { LinearProgress } from "@mui/material";
import { useClickOutside } from "../shell/hooks/click-outside/useClickOutside";
import {
  Container,
  LeftContainer,
  RightContainer,
  CenterContainer,
  FormComponent,
  UserName,
  Avatar,
  User,
  SideBar,
  Wrapper,
  Img,
  Logo,
  SignInText,
  Button,
  Input,
  Search,
  YoutubeName,
} from "./styled-components/Navbar";
import { useApi } from "../shell/hooks/custom-http";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { useHttpLoading } from "../shell/hooks/use-http-loading";

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state?.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const targetDivRef = useRef<HTMLDivElement | null>(null);
  const { isClickedOutside } = useClickOutside(targetDivRef);

  useEffect(() => {
    if (isClickedOutside) {
      setOpenSideBar((prev) => !prev);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    if (openSideBar) {
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [openSideBar]);

  const [query, setQuery] = useState<string>("");

  const handleClick = useEventCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      document.body.style.padding = "0px !important";
      setAnchorEl(event.currentTarget);
    }
  );
  const handleClose = useEventCallback(() => {
    setAnchorEl(null);
  });

  const dispatch = useDispatch();

  const { makeCall: logOutUser } = useApi({
    url: "/auth/logout",
    method: "POST",
  });
  const handleLogout = useEventCallback(() => {
    logOutUser().then((res) => {
      const data = res as {
        message: string;
        success: boolean;
        status: number;
      };
      if (data.success && data.status === HTTP_RESPONSE_STATUS_CODE.OK) {
        dispatch(logout());
        dispatch(emptyVideosFromHistory());
        dispatch(removeVideo());
        localStorage.clear();
        handleClose();
      }
    });
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const uploadVideo = useEventCallback(() => {
    setOpenDialog(true);
  });

  const navigate = useNavigate();
  const { isLoading } = useHttpLoading();
  return (
    <>
      <Container>
        <LoadingContainer>
          {isLoading ? <LinearProgress color="warning" /> : null}
        </LoadingContainer>
        <LeftContainer>
          <IconButton onClick={() => setOpenSideBar(!openSideBar)}>
            <ReorderIcon />
          </IconButton>
          <Link
            to="/"
            className="link"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Logo>
              <Img src={"/images/logo.png"} />
              <YoutubeName>ManmeetYoutube</YoutubeName>
            </Logo>
          </Link>
        </LeftContainer>
        <CenterContainer>
          <FormComponent
            onSubmit={(e) => {
              e.preventDefault();
              if (!query) {
                return;
              }
              navigate(`/search?q=${query}`);
              setQuery("");
            }}
          >
            <Search>
              <Input
                style={{
                  fontSize: "1.0rem",
                }}
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "2.5rem",
                    top: "0.1rem",
                  }}
                  onClick={() => {
                    setQuery("");
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ) : undefined}
              <IconButton
                sx={{
                  position: "absolute",
                  right: "0.2rem",
                  top: "0.1rem",
                }}
                onClick={() => {
                  navigate(`/search?q=${query}`);
                  setQuery("");
                }}
              >
                <SearchOutlinedIcon />
              </IconButton>
            </Search>
          </FormComponent>
        </CenterContainer>
        <RightContainer>
          {user ? (
            <User
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <VideoCallOutlinedIcon
                className="video-icon"
                onClick={uploadVideo}
              />

              <Avatar
                onClick={handleClick}
                src={user?.img || "/images/user.png"}
              />
              <UserName onClick={handleClick}>{user?.name}</UserName>
            </User>
          ) : (
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
              }}
            >
              <Button>
                <AccountCircleOutlinedIcon />
                <SignInText>SIGN IN</SignInText>
              </Button>
            </Link>
          )}
        </RightContainer>
        {open ? (
          <>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleLogout}>
                <Wrapper>
                  <LogoutIcon />
                  Logout
                </Wrapper>
              </MenuItem>
            </Menu>
          </>
        ) : undefined}
      </Container>
      {openSideBar ? (
        <>
          <SideBar ref={targetDivRef} className="toggle-menu-bar">
            <MenuComponent
              isOpen={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />
          </SideBar>
        </>
      ) : undefined}
      {openDialog ? <UploadVideo setOpenDialog={setOpenDialog} /> : undefined}
    </>
  );
};

export default memo(Navbar);
