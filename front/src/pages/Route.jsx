import React from "react";
import { Route as ReactRoute } from "react-router-dom";

const Route = ({ path, component, exact }) => {
  return <ReactRoute key={path} component={component} exact={exact} />;
};

export default Route;
