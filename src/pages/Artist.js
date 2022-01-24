import React from 'react';
import PropTypes from 'prop-types';

class Artist extends React.Component {
  render() {
    const { artistName } = this.props;
    return (
      <div>
        Resultado de álbuns de:
        {artistName}
      </div>
    );
  }
}

Artist.propTypes = {
  artistName: PropTypes.string.isRequired,
};

export default Artist;
