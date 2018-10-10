import { Component, PropTypes } from 'labrador-immutable';

const { array, object } = PropTypes;

class specialitem extends Component {
  static propTypes = {
    content: object,
    itemsToTemplate: array
  };

  static defaultProps = {
    contents: {},
    itemsToTemplate: []
  };

  tap1(e) {
    console.log(' gogo ', e);
  }

}

export default specialitem;
