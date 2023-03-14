import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import React, { memo, useCallback } from "react";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import {
  SideBarContainer,
  Item,
  Wrapper,
  IconName,
} from "./styled-components/Sidebar";
import { useFilters } from "../shell/providers/filter-provider/filter-provider";
const SideBar = () => {
  const { setFilters, filters } = useFilters();

  const emptyPaginationAndTag = useCallback(() => {
    setFilters({
      ...filters,
      tag: "",
      page: 1,
    });
  }, [filters, setFilters]);
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
            <Item onClick={emptyPaginationAndTag}>
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
            <Item onClick={emptyPaginationAndTag}>
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
            <Item onClick={emptyPaginationAndTag}>
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
