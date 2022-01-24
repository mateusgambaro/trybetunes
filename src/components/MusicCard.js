import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../stylesheets/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange() {
    const { musics } = this.props;
    this.setState({ loading: true });
    await addSong(musics);
    this.setState({ loading: false, checked: true });
  }

  render() {
    const { musics: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="track-card">
        <div className="track">
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          id={ trackId }
          onChange={ this.handleChange }
          checked={ checked }
        />

      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
