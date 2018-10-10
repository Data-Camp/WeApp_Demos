
微信小程序Redux绑定
==============
用于在微信小程序为页面绑定Redux Store。

_PS: 代码是基于[react-redux](https://github.com/reactjs/react-redux)修改的_

## 安装
1. clone或者下载代码库到本地:

   ```shell
    git clone https://github.com/charleyw/wechat-weapp-redux
   ```
2. 将`dist/wechat-weapp-redux.js`(或者拷贝minify的也可以)文件直接拷贝到小程序的工程中,例如（下面假设我们把第三方包都安装在libs目录下）:

   ```    shell
    cd wechat-weapp-redux
    cp -r dist/wechat-weapp-redux.js <小程序根目录>/libs
   ```
    上面的命令将包拷贝到小程序的`libs`目录下

## 使用
1. 将Redux Store绑定到App上。

   ```js
    const store = createStore(reducer) // redux store
    
    const WeAppRedux = require('./libs/wechat-weapp-redux/index.js');
    const {Provider} = WeAppRedux;
    
   ```
    **Provider**是用来把Redux的store绑定到App上。

    ```
    App(Provider(store)({
      onLaunch: function () {
        console.log("onLaunch")
      }
    }))
    ```
    provider的实现只是简单的将store加到App这个global对象上,方便在页面中用getApp取出来

    上面这段代码等同于:
    ```
    App({
      onLaunch: function() {
          console.log( "onLaunch" )
        },
        store: store
    })
    ```
2. 在页面的定义上使用connect,绑定redux store到页面上。

   ```js
    const pageConfig = {
      data: {
      },
      ...
    }

   ```
    页面的定义

   ```js
    const mapStateToData = state => ({
      todos: state.todos,
      visibilityFilter: state.visibilityFilter
    })
   ```
    定义要映射哪些state到页面

   ```js
    const mapDispatchToPage = dispatch => ({
      setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
      toggleTodo: id => dispatch(toggleTodo(id)),
      addTodo: text => dispatch(addTodo(text)),
    })
   ```
    定义要映射哪些方法到页面

   ```js      
    const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
   ```
    使用connect将上述定义添加到pageConfig中。

   ```js            
    Page(nextPageConfig);
   ```
    注册小程序的页面

3. 说明

    完成上述两步之后,你就可以在`this.data`中访问你在`mapStateToData`定义的数据了。

    `mapDispatchToPage`定义的action会被映射到`this`对象上。

## Example

详细的使用例子可以参照: [wechat-weapp-redux-todos](https://github.com/charleyw/wechat-weapp-redux-todos)

真机实测版请clone下面这个repo，用小程序开发工具开启预览：
```
git clone -b release https://github.com/charleyw/wechat-weapp-redux-todos.git
```
​    
