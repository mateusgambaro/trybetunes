import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from '../images/Logo.png';
import '../stylesheets/StyleHdr.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.recoverAndShowUserName();
  }

  async recoverAndShowUserName() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    const path = window.location.pathname; // Referência ao repositório de Gustavo Dolzan
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div className="header">
          <img alt="TrybeTunes Logo" className="logo" src={ Logo } />
          <p className="user-name" data-testid="header-user-name">{user.name}</p>
        </div>
        <nav className="links">
          <Link
            className={ path.includes('/search') ? 'selected' : '' }
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar
          </Link>
          <Link
            className={ path.includes('/favorites') ? 'selected' : '' }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos
          </Link>
          <Link
            className={ path.includes('/profile') ? 'selected' : '' }
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
