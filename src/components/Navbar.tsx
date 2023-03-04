import React, { memo, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import {
  Menu,
  MenuItem,
  Button as MuiButton,
  useEventCallback,
} from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useDispatch } from "react-redux";
import { logout } from "../shell/reudx/slicers/user";
import UploadVideo from "./Upload";
import ClearIcon from "@mui/icons-material/Clear";
import {
  emptyVideosFromHistory,
  removeVideo,
} from "../shell/reudx/slicers/video";
import "./css/navbar/index.css";
import MenuComponent from "./Menu";
import { useClickOutside } from "../shell/hooks/click-outside/useClickOutside";
const Container = styled.div`
  position: fixed;
  width: 100vw;
  z-index: 1000;
  padding: 0 1rem 0 1rem;
  display: flex;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 3.5rem;
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  padding-left: 0.5rem;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 20px;
`;
const Search = styled.div`
  width: 70%;
  display: flex;
  position: relative;
  height: 2.5rem;
  overflow-y: hidden;
  margin-left: 20%;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const Input = styled.input`
  border: none;
  font-size: 1rem;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const WrapperUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 1.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const SideBar = styled.div`
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 0;
  min-height: 100vh;
  overflow-y: auto;
`;
interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: Props) => {
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
      //documentElement to get the root node of the element
      document.documentElement.style.overflowY = "hidden";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [openSideBar]);

  const [query, setQuery] = useState<string>("");

  const handleClick = useEventCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }
  );
  const handleClose = useEventCallback(() => {
    setAnchorEl(null);
  });

  const dispatch = useDispatch();

  const handleLogout = useEventCallback(() => {
    dispatch(logout());
    dispatch(emptyVideosFromHistory());
    dispatch(removeVideo());
    localStorage.clear();
    handleClose();
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const uploadVideo = useEventCallback(() => {
    setOpenDialog(true);
  });

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <LeftContainer>
          <IconButton onClick={() => setOpenSideBar(!openSideBar)}>
            <ReorderIcon />
          </IconButton>
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
        </LeftContainer>
        <CenterContainer>
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
                className="navbar-search-remove-icon"
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
        </CenterContainer>
        <RightContainer>
          {user ? (
            <WrapperUser>
              <MuiButton onClick={uploadVideo}>
                <VideoCallIcon
                  sx={{
                    color: darkMode ? "white" : "black",
                  }}
                />
              </MuiButton>

              <MuiButton
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: darkMode ? "white" : "black",
                }}
              >
                <AccountCircleOutlinedIcon
                  sx={{
                    color: darkMode ? "white" : "black",
                    marginRight: "2px",
                  }}
                />
                {user?.name}
              </MuiButton>
            </WrapperUser>
          ) : (
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
              }}
            >
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
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
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </SideBar>
        </>
      ) : undefined}
      {openDialog ? <UploadVideo setOpenDialog={setOpenDialog} /> : undefined}
    </>
  );
};

export default memo(Navbar);
