import DataService from '../../datas/DataService';
import {getDateStr} from '../../utils/util';
import {LEVEL} from '../../datas/Config';

Page({
    data: {
        item: '',
        levelSelectData: [LEVEL.normal, LEVEL.warning, LEVEL.danger],
    },

    onLoad(option) {
        const {id} = option;
        let item = DataService.findById(id).then((item) => {
            item['addDate'] = getDateStr(new Date(item['addDate']));
            this.setData({
                item: item
            });
        });
    }
});