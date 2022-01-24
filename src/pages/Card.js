import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../stylesheets/Card.css';

class Card extends React.Component {
  render() {
    const { album: {
      artworkUrl100,
      collectionName,
      artistName,
      collectionId } } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="album-card">
          <img src={ artworkUrl100 } alt="Album Art" />
          <div className="album-body">
            <h3>
              { collectionName}
            </h3>
            <p>{artistName}</p>
          </div>
        </div>
      </Link>
    );
  }
}
Card.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default Card;
