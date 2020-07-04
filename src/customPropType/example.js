import {PropTypes} from 'react';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired
});
