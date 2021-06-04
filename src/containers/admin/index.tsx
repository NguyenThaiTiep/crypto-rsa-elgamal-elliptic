import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";

import { Redirect, Route, Switch, useHistory } from "react-router";
import TopBar from "./topbar";
import NavBar from "./navbar";
import { RouteAdmin, routes } from "./router";

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#F4F6F8",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 250,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: theme.spacing(2),
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} style={{ minHeight: 850 }}>
            <RouteAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
