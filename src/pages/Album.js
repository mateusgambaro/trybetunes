import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../stylesheets/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      resolve: false,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchMusicsUrl();
  }

  fetchMusicsUrl = () => {
    const { match: { params: { id } } } = this.props;

    this.setState({
      loading: true,
    },
    async () => {
      const data = await getMusics(id);

      this.setState({
        loading: false,
        resolve: true,
        data,
      });
    });
  }

  musicRender = () => {
    const { resolve, data } = this.state;

    if (resolve) {
      return (
        <section className="album-info">
          <div className="album-details">
            <img
              className="album-cover"
              src={ data[0].artworkUrl100 }
              alt={ data[0].collectionName }
            />
            <h4 data-testid="album-name">{data[0].collectionName}</h4>
            <p data-testid="artist-name">{data[0].artistName}</p>
          </div>
          <div>
            {data.slice(1).map((musics) => (
              <MusicCard
                key={ musics.trackId }
                musics={ musics }
              />
            ))}
          </div>
        </section>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.musicRender() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
