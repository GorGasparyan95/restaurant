import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "../pages/Route";
import routes from "../pages/config";

const RouterProvider = () => {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, component, exact }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
      </Switch>
    </Router>
  );
};

export default RouterProvider;
