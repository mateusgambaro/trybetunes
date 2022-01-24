import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import NotFound from './NotFound';
import '../stylesheets/Search.css';

class CardList extends React.Component {
  render() {
    const { albumList } = this.props;
    return (
      <div className="album-list">
        {albumList.length === 0 ? <NotFound /> : albumList.map((item) => (<Card
          key={ item.collectionId }
          album={ item }
        />))}
      </div>
    );
  }
}

CardList.propTypes = {
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardList;
