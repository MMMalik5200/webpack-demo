import React from 'react';
import css from './App.scss';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import routes from './router';
import logo from './assets/img/n-logo.png';

import * as tf from '@tensorflow/tfjs';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // 定义一个线性回归模型。
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // 为训练生成一些合成数据
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    // 使用数据训练模型
    model.fit(xs, ys, { epochs: 10 }).then(() => {
      // 在该模型从未看到过的数据点上使用模型进行推理
      model.predict(tf.tensor2d([5], [1, 1])).print();
      //  打开浏览器开发工具查看输出
    });
  }

  render() {
    return (
      <div className={css['container']}>
        <header>
          <h1>这是根组件</h1>
          <div>
            {/* <img src={require('./assets/img/n-logo.png')} /> */}
            <img src={logo} />
          </div>
        </header>

        <BrowserRouter>
          <div className={css['link-box']}>
            {routes.map((route, index) => (
              <Link to={route.path} key={index} className={css['link']}>
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
