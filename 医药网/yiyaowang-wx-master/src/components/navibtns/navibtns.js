import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

const { array } = PropTypes;

class navibtns extends Component {
  static propTypes = {
    itemArr: array
  };

  static defaultProps = {
    itemArr: []
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

}

export default navibtns;
