import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

const { array, bool, number, string } = PropTypes;

class banner extends Component {
  static propTypes = {
    title: string,
    indicatorDots: bool,
    autoplay: bool,
    interval: number,
    duration: number,
    itemArr: array
  };

  static defaultProps = {
    title: 'noName',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    itemArr: []
  };

  constructor(props) {
    super(props);
    console.log('====== banner', this.props.itemArr);
    this.state = immutable({});
  }

  onReady() {
    console.log('====== banner', this.props.itemArr);
  }

  foo() {
    console.log('foo foo');
  }

}

export default banner;
