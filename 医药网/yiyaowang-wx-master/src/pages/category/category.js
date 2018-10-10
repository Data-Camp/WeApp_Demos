import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import request from '../../utils/request';

class Category extends Component {


  constructor(props) {
    super(props);
    console.log('======== init');
    this.state = {
      leftArr: [],
      rightArr: [],
      selectIndex: 0,
      scrollTop: 0
    };
  }

  children() {
    return {};
  }

  onLoad() {
    request.fetchFirstCategory()
    .then((result) => {
      console.log('***fetchFirstCategory()', result);
      this.setState({
        leftArr: result.data.data.categoryinfo
      });
      console.log('=====', this.state.leftArr);
    })
    .then((error) => {
      console.log(error);
    });

    request.fetchSecondCategory()
    .then((result) => {
      // console.log('***fetchFirstCategory()', result);
      this.setState({
        rightArr: result.data.data.categoryinfo
      });
      console.log('=====', this.state.rightArr);
    })
    .then((error) => {
      console.log(error);
    });
  }


  requestSecondCategory(fatherid) {
    request.fetchSecondCategory(fatherid)
    .then((result) => {
      // console.log('***fetchFirstCategory()', result);
      this.setState({
        rightArr: result.data.data.categoryinfo,
        scrollTop: 0
      });
      // console.log('=====', this.state.rightArr);
    })
    .then((error) => {
      console.log(error);
    });
  }

  handleTap(e) {
    // console.log(e.currentTarget.id);
    this.setState({
      selectIndex: e.currentTarget.id,
      scrollTop: -10
    });
    let fatherid = this.state.leftArr[e.currentTarget.id].id;
    this.requestSecondCategory(fatherid);
  }


}

export default Category;
