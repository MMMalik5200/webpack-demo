import React from "react";
import css from "./App.scss";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import routes from "./router";
// import logo from './assets/img/hz-new-logo80x80.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={css["container"]}>
        <header>
          <h1>这是根组件</h1>
          <div>
            {/* <img src={require('./assets/img/hz-new-logo80x80.png')}/> */}
            {/* <img src={logo} /> */}
          </div>
        </header>

        <BrowserRouter>
          <div className={css["link-box"]}>
            {routes.map((route, index) => (
              <Link to={route.path} key={index} className={css["link"]}>
                {route.name}
              </Link>
            ))}
          </div>
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
