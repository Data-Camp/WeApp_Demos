import AsyncStorage from 'labrador-storage';
import immutableTransform from '../utils/immutable-transform';

// Redux 数据持久化设置
export default {
  storage: AsyncStorage,
  //blacklist: [], // 可选，你【不想】存储的Redux store数据key列表
  // whitelist: ['todos', 'user'], // 可选，你【只想】存储的Redux store数据key列表
  transforms: [immutableTransform]
};
