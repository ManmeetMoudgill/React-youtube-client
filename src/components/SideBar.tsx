import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import { memo } from "react";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import {
  SideBarContainer,
  Item,
  Wrapper,
  IconName,
} from "./styled-components/Sidebar";
const SideBar = () => {
  return (
    <>
      <SideBarContainer>
        <Wrapper>
          <Link
            to="/"
            className="link-sidebar"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Item>
              <HomeIcon className="sidebar-icon" />
              <IconName>Home</IconName>
            </Item>
          </Link>
          <Link
            className="link-sidebar"
            to="/subscriptions"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Item>
              <SubscriptionsOutlinedIcon className="sidebar-icon" />
              <IconName>Subscriptions</IconName>
            </Item>
          </Link>
          <Link
            className="link-sidebar"
            to="/history"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Item>
              <HistoryOutlinedIcon className="sidebar-icon" />
              <IconName>History</IconName>
            </Item>
          </Link>
        </Wrapper>
      </SideBarContainer>
    </>
  );
};

export default memo(SideBar);
