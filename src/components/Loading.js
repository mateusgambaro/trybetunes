import React from 'react';
import '../stylesheets/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <h1>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
