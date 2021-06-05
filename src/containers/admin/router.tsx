import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
} from "react-feather";

import ApartmentIcon from "@material-ui/icons/Apartment";

import { Redirect, Route, Router, Switch } from "react-router-dom";

import React, { useEffect } from "react";
import { ElGamal } from "./outlets/ElGamal";
import RSA from "./outlets/RSA";
import Elliptic from "./outlets/Elliptic";

export const routes = [
  {
    href: "/crypto-rsa-elgamal-elliptic/rsa",
    icon: BarChartIcon,
    title: "Hệ mật RSA",
    component: RSA,
  },
  {
    href: "/crypto-rsa-elgamal-elliptic/elgamal",
    icon: UserIcon,
    title: "Hệ mật ElGamal",
    component: ElGamal,
  },
  {
    href: "/crypto-rsa-elgamal-elliptic/elliptic",
    icon: ApartmentIcon,
    title: "Đường cong Elliptic",
    component: Elliptic,
  },
];
const RouteAdminItem = (route: any) => {
  useEffect(() => {
    console.log("aaag");
  }, []);
  return <Route exact path={route.href} component={route.component}></Route>;
};
export const RouteAdmin = () => {
  useEffect(() => {
    console.log(routes);
  }, []);
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route
          exact
          path={route.href}
          component={route.component}
          key={i}
        ></Route>
      ))}
      <Redirect
        path="/crypto-rsa-elgamal-elliptic"
        to="/crypto-rsa-elgamal-elliptic/rsa"
      />
    </Switch>
  );
};
