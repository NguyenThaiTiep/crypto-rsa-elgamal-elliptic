import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Poppers from "@material-ui/core/Popper";
import clsx from "clsx";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";

import "./style.scss";

import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  hexToRgb,
} from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#009177",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  dropdown: {
    borderRadius: "3px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb("#000000") + ", 0.26)",
    top: "100%",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: "white",
    WebkitBackgroundClip: "padding-box",
    backgroundClip: "padding-box",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    lineHeight: "1.42857143",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    zIndex: 1300,
    "&:hover": {
      backgroundColor: "primary",
      color: "white",
    },
  },
  popperClose: {
    pointerEvents: "none",
  },
  popperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "unset !important",
      "& > div": {
        boxShadow: "none !important",
        marginLeft: "0rem",
        marginRight: "0rem",
        transition: "none !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
        padding: "0px !important",
        backgroundColor: "transparent !important",
        "& ul li": {
          color: "#ffffff" + " !important",
          margin: "10px 15px 0!important",
          padding: "10px 15px !important",
          "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
            boxShadow: "none",
          },
        },
      },
    },
  },
  paper: {
    maxHeight: "500px",
    overflowY: "scroll",
  },
}));
interface Props {
  className?: string;
  onMobileNavOpen: () => void;
}
const TopBar = (props: Props) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const { className, onMobileNavOpen, ...rest } = props;

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <div className="title-logo-a">
          <RouterLink to="/">
            <span className={"title-logo"}>Nhâp môn an toàn thông tin</span>
          </RouterLink>
        </div>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
