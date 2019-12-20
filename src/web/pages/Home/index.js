import React from 'react';
import css from './index.scss';

export default class Home extends React.Component {
  componentDidMount() {
    const isHas = [1, 2, 3].includes(2);

    console.log(isHas);
  }

  render() {
    return (
      <div className={css['container']}>
        <div className={css['text']}>
          <p>这是Home组件</p>
        </div>
      </div>
    );
  }
}
