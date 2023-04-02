import React, { useCallback } from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/redux-setting";
import EllipsisWrapper from "../../components/General/Wrapper/EllipsisWrapper";
import NotificationDropDown from "./NotificationDropDown";

export default function Header() {
  const navigate = useNavigate();

  // State
  const [fullscreens, setFullscreen] = React.useState(true);

  // Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // FullScreen
  const Fullscreen: any = (vale: any) => {
    const elem: any = document.documentElement;
    switch (vale) {
      case true:
        elem.requestFullscreen();
        setFullscreen(false)
        break;
      case false:
        document.exitFullscreen()
        setFullscreen(true)
        break;
    }
  }

  //leftsidemenu
  const openCloseSidebar = () => {
    document.querySelector("body")?.classList.toggle("sidenav-toggled");
  };

  const handleSignOut = useCallback(() => {
    auth.signOut();

    let path = "/authentication/sign-in";
    navigate(path);
  }, [navigate]);

  return (
    <Navbar className="main-header side-header sticky nav nav-item">
      <div className="main-container container-fluid">
        <div className="main-header-left ">
          <div className="responsive-logo">
            <Link to="/" className="header-logo">
              <Box
                component="img"
                src={require("../../assets/img/brand/logo.png")}
                className="mobile-logo logo-1"
                alt="logo"
                sx={{
                  maxHeight: "36px"
                }}
              />
              <Box
                component="img"
                src={require("../../assets/img/brand/logo-white.png")}
                className="mobile-logo dark-logo-1"
                alt="logo"
                sx={{
                  maxHeight: "36px"
                }}
              />
            </Link>
          </div>
          <div
            className="app-sidebar__toggle"
            data-bs-toggle="sidebar"
            onClick={() => openCloseSidebar()}
          >
            <Link className="open-toggle" to="#">
              <i className="header-icon fe fe-align-left"></i>
            </Link>
            <Link className="close-toggle" to="#">
              <i className="header-icon fe fe-x"></i>
            </Link>
          </div>
          <div className="logo-horizontal">
            <Box
              component="img"
              src={require("../../assets/img/brand/logo.png")}
              className="mobile-logo logo-1"
              alt="logo"
              sx={{ maxHeight: "36px" }}
            />
            <Box
              component="img"
              src={require("../../assets/img/brand/logo-white.png")}
              className="mobile-logo dark-logo-1"
              alt="logo"
              sx={{
                maxHeight: "36px"
              }}
            />
          </div>
        </div>

        <div className="main-header-right">
          <Navbar.Toggle
            className="navresponsive-toggler d-lg-none ms-auto"
            type="button"
          >
            <span className="navbar-toggler-icon fe fe-more-vertical"></span>
          </Navbar.Toggle>
          <div className="mb-0 navbar navbar-expand-lg   navbar-nav-right responsive-navbar navbar-dark p-0">
            <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
              <ul className="nav nav-item header-icons navbar-nav-right ">
                <li
                  className="nav-item full-screen fullscreen-button"
                  onClick={() => Fullscreen(fullscreens)}
                >
                  <Link className="new nav-link full-screen-link" to="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="header-icon-svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
                    </svg>
                  </Link>
                </li>

                <NotificationDropDown />

                <Dropdown className=" main-profile-menu nav nav-item nav-link ps-lg-2">
                  <Dropdown.Toggle
                    className="new nav-link profile-user d-flex"
                    variant=""
                  >
                    <Box width="28px" minWidth="fit-content">
                      <img
                        alt=""
                        src={user?.avatar ?? require("../../assets/img/faces/2.jpg")}
                        className=""
                      />
                    </Box>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="menu-header-content p-3 border-bottom">
                      <Box
                        display="flex"
                        className="wd-100p"
                      >
                        <Box className="main-img-user" minWidth="fit-content">
                          <img
                            alt=""
                            src={user?.avatar ?? require("../../assets/img/faces/2.jpg")}
                            className=""
                          />
                        </Box>
                        <div className="ms-3 my-auto">
                          <h6 className="tx-15 font-weight-semibold mb-0" title={user?.name}>
                            <EllipsisWrapper>
                              {user?.name}
                            </EllipsisWrapper>
                          </h6>
                          <span className="dropdown-title-text subtext op-6  tx-12">
                            {user?.email}
                          </span>
                        </div>
                      </Box>
                    </div>
                    <Dropdown.Item className="dropdown-item" href={`/profile`}>
                      <i className="far fa-user-circle"></i>Hồ sơ cá nhân
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href={`/notification`}>
                      <i className="far fa-bell"></i>Thông báo
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" onClick={handleSignOut} >
                      <i className="far fa-arrow-alt-circle-left"></i> Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </Navbar.Collapse>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
