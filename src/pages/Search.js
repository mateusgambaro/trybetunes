import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardList from './CardList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../stylesheets/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      loading: false,
      loadingArtist: false,
      artistName: '',
      arrayAlbuns: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      inputValue: target.value,
    });
  }

  async handleClick(inputValue) {
    this.setState({
      loading: true,
    });
    const album = await searchAlbumsAPI(inputValue);
    this.setState({
      loading: false,
      loadingArtist: true,
      artistName: inputValue,
      inputValue: '',
      arrayAlbuns: [...album],
    });
  }

  render() {
    const { inputValue, loading, artistName, loadingArtist, arrayAlbuns } = this.state;
    const minLengthForArtistName = 2;
    const forms = (
      <form className="search-artist-form">
        <label htmlFor="inputValue">
          Nome do Artista
          <input
            className="search-artist-input"
            type="text"
            value={ inputValue }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          className="search-artist-button"
          type="button"
          data-testid="search-artist-button"
          disabled={ inputValue.length < minLengthForArtistName }
          onClick={ () => this.handleClick(inputValue) }
        >
          Pesquisar
        </button>
      </form>
    );
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : forms}
        {!loading && loadingArtist ? `Resultado de álbuns de: ${artistName}` : '' }
        {!loading && loadingArtist ? <CardList albumList={ [...arrayAlbuns] } /> : ''}
      </div>
    );
  }
}

export default Search;
