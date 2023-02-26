import React, { memo, useState } from "react";
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
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useDispatch } from "react-redux";
import { logout } from "../shell/reudx/slicers/user";
import UploadVideo from "./Upload";
import {
  emptyVideosFromHistory,
  removeVideo,
} from "../shell/reudx/slicers/video";
const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  display: flex;
  margin-left: 20%;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
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

interface Props {
  darkMode: boolean;
}
const Navbar = ({ darkMode }: Props) => {
  const { user } = useSelector((state: RootState) => state?.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
        <Wrapper>
          <Search>
            <Input
              style={{
                fontSize: "1.0rem",
              }}
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton
              onClick={() => {
                navigate(`/search?q=${query}`);
                setQuery("");
              }}
            >
              <SearchOutlinedIcon />
            </IconButton>
          </Search>
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
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
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
      </Container>
      {openDialog ? <UploadVideo setOpenDialog={setOpenDialog} /> : undefined}
    </>
  );
};

export default memo(Navbar);
