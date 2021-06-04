import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { role } from "../../settings/role";
import { NotFoundPage } from "../pages/404";
import { AboutPage } from "../pages/about";
import { AdminPage } from "../pages/admin";
import { HomePage } from "../pages/home";

// todo
const nameApp = "Nhập môn an toàn thông tin";
export const routes = [
  {
    path: "/admin",
    roleDefine: [],
    public: true,
    component: AdminPage,
    name: "Nhập môn an toàn thông tin",
  },
];
const setTitleDocument = (name?: string) => {
  document.title = name || nameApp;
};

export const RoutesApp = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <RouteItem key={index} {...route} />
      ))}

      <Redirect to="/admin"></Redirect>
    </Switch>
  );
};

export const RouteItem = (props?: any) => {
  return <Route {...props}>{setTitleDocument(props.name)}</Route>;
};
