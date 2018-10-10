import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import request from '../../utils/request';
import banner from '../../components/banner/banner';
import navibtns from '../../components/navibtns/navibtns';
import specialitem from '../../components/specialitem/specialitem';

const { any } = PropTypes;

class Home extends Component {
  state: {
    baseData: {}
  }

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    const banArrs = this.state.baseData.index_lb;
    const naviArrs = this.state.baseData.button;
    let listArrs = this.state.baseData.templates.slice(4);
    //console.log('****', listArrs);
    return {
      banner: {
        component: banner,
        props: {
          itemArr: banArrs
        }
      },
      navibtns: {
        component: navibtns,
        props: {
          itemArr: naviArrs
        }
      },
      speciallist: listArrs.map((item) => ({
        component: specialitem,
        key: listArrs.indexOf(item),
        props: {
          content: item.contents[0],
          itemsToTemplate: item.itemsToTemplate
        }
      }))
    };
  }

  onLoad() {
    request.fetchHomeData()
    .then((result) => {
      //console.log('*********', result);

      this.setState({
        baseData: result.data.data
      });
      //console.log('===== state' + result.data.data);
    })
    .then((error) => {
      //console.log(error);
    });
  }

}

export default Home;
