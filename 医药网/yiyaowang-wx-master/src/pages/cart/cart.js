import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import request from '../../utils/request';
import shoppingitem from '../../components/specialitem/specialitem';
import * as cartActions from '../../redux/cart';

const { object, func } = PropTypes;

class Cart extends Component {
  static propTypes = {
    baseData: object,
    addTodo: func
  };

  static defaultProps = {
    baseData: {}
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    const listArrs = this.state.baseData.products;
    console.log(this.handleAdd);
    return {
      shoppinglist: listArrs.map((item) => ({
        component: shoppingitem,
        key: item.areaitemid,
        props: {
          // info: item.productInfo,
          mainimg3: item.productInfo.mainimg3,
          productname: item.productInfo.productname,
          originalprice: item.productInfo.originalprice,
          id: item.productInfo.id,
          sellStatus: item.productInfo.sellStatus,
          onAdd: this.handleAdd
        }
      }))
    };
  }


  onLoad() {
    request.fetchCartData()
    .then((result) => {
      // console.log('***fetchCartData()', result);
      this.setState({
        baseData: result.data.data.venders[0]
      });
      // console.log('===== state' + this.state.itemArr);
    })
    .then((error) => {
      console.log(error);
    });
  }

  handleAdd = (id) => {
    this.props.addTodo(id);
  }


}

export default connect(
  ({ todos }) => ({ todos }),
  (dispatch) => bindActionCreators({
    addTodo: cartActions.add
  }, dispatch)
)(Cart);
