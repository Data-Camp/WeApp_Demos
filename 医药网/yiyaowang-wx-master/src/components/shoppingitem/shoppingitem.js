import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';

const { number, func, string } = PropTypes;

class shoppingitem extends Component {
  static propTypes = {
    mainimg3: string,
    productname: string,
    originalprice: string,
    id: string,
    sellStatus: number,
    onAdd: func
  };

  static defaultProps = {
    mainimg3: '',
    productname: '',
    originalprice: '',
    id: '',
    sellStatus: 0
  };

  handleAdd() {
    console.log('add run');
    this.props.onAdd(this.props.id);
  }

  foucusme() {
    console.log('dian wo  a   kuaidian ');
  }

}

export default shoppingitem;
