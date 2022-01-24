import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import Logo from '../images/Logo.png';
import '../stylesheets/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { name } = this.state;
    const user = { name };
    this.setState({ loading: true });
    await createUser(user);
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minLengthForName = 3;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div className="page-login" data-testid="page-login">
        <img alt="TrybeTunes Logo" className="logo" src={ Logo } />
        <form className="login-form">
          <label className="label" htmlFor="login-name-input">
            Nome
            <input
              className="login-name-input"
              type="text"
              name="name"
              value={ name }
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="login-submit-button"
            type="submit"
            data-testid="login-submit-button"
            disabled={ name.length < minLengthForName }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
