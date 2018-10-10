import Config from 'Config';
import {guid, log, promiseHandle} from '../utils/util';

class DataRepository {

    /**
     * 添加数据
     * @param {Object} 添加的数据
     * @returns {Promise} 
     */
    static addData(data) {
        if (!data) return false;
        data['_id'] = guid();
        return DataRepository.findAllData().then(allData => {
            allData = allData || [];
            allData.unshift(data);
            wx.setStorage({key:Config.ITEMS_SAVE_KEY, data: allData});
        });
    }

    /**
     * 删除数据
     * @param {string} id 数据项idid
     * @returns {Promise}
     */
    static removeData(id) {
        return DataRepository.findAllData().then(data => {
            if (!data) return;
            for (let idx = 0, len = data.length; idx < len; idx++) {
                if (data[idx] && data[idx]['_id'] == id) {
                    data.splice(idx, 1);
                    break;
                }
            }
            wx.setStorage({key: Config.ITEMS_SAVE_KEY, data: data});
        });
    }

    /**
     * 批量删除数据
     * @param {Array} range id集合
     * @returns {Promise}
     */
    static removeRange(range) {
        if (!range) return;
        return DataRepository.findAllData().then(data => {
            if (!data) return;
            let indexs = [];
            for (let rIdx = 0, rLen = range.length; rIdx < rLen; rIdx++) {
                for (let idx = 0, len = data.length; idx < len; idx++) {
                    if (data[idx] && data[idx]['_id'] == range[rIdx]) {
                        indexs.push(idx);
                        break;
                    }
                }
            }
            
            let tmpIdx = 0;
            indexs.forEach(item => {
                data.splice(item - tmpIdx, 1);
                tmpIdx++;
            });
            wx.setStorage({key: Config.ITEMS_SAVE_KEY, data: data});
        });
        
    }

    /**
     * 更新数据
     * @param {Object} data 数据
     * @returns {Promise} 
     */
    static saveData(data) {
        if (!data || !data['_id']) return false;
        return DataRepository.findAllData().then(allData => {
            if (!allData) return false;
            for (let idx = 0, len = allData.length; i < len; idx++) {
                if (allData[idx] && allData[idx]['_id'] == data['_id']) {
                    allData[idx] = data;
                    break;
                }
            }
            wx.setStorage({key: Config.ITEMS_SAVE_KEY, data: data});
        });
        
    }

    /**
     * 获取所有数据
     * @returns {Promise} Promise实例
     */
    static findAllData() {
        return promiseHandle(wx.getStorage, {key: Config.ITEMS_SAVE_KEY}).then(res => res.data ? res.data : []).catch(ex => {
            log(ex);
        });
    }

    /**
     * 查找数据
     * @param {Function} 回调
     * @returns {Promise} Promise实例
     */
    static findBy(predicate) {
        return DataRepository.findAllData().then(data => {
            if (data) {
                data = data.filter(item => predicate(item));
            }
            return data;
        });
    }
}

module.exports = DataRepository;