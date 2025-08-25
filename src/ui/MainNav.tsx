import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
} from "react-icons/hi2";
import { IoBedOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";

const NavWrapper = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* & > li {
    border-bottom: 1px solid;
    border-image: linear-gradient(
        to right,
        transparent 0%,
        var(--color-grey-250) 50%,
        transparent 100%
      )
      1;
  } */
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;

    border-radius: 30em;
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-shadow: 0px 0px 0px transparent;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    color: var(--color-grey-600);
    font-size: 1.4rem;
    font-weight: 400;
    padding: 1.2rem 2.4rem;
  }

  &:hover {
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  }

  &:active {
    transform: translateY(2px) translateX(2px) scale(0.99);
    box-shadow: 2px 2px 6px #c5c5c5, -6px -6px 12px #ffffff;
  }

  &.active {
    color: #a39c5a;
    box-shadow: 2px 2px 6px #c5c5c5, -6px -6px 12px #ffffff;
    transform: translateY(2px) translateX(2px) scale(0.99);
    font-weight: 500;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-600);
    transition: all 0.3s;
  }

  &.active svg {
    color: #a39c5a;
    stroke-width: 1.8;
  }
`;

const MainNav = () => {
  return (
    <NavWrapper>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <AiOutlineDashboard />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/rooms">
            <IoBedOutline />
            <span>Rooms</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
      </NavList>
      <NavList>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </NavWrapper>
  );
};

export default MainNav;
