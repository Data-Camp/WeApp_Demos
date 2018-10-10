
Page({
    data: {
        items: [
            {name: '预留', checked: 'true'},
            {name: '以患带患'}
        ],
        sexs: [
            {name: '男', checked: 'true'},
            {name: '女'}
        ]
    },
    formBindsubmit(e){
        var valueArr = e.detail.value;
        console.log(valueArr);
    }
})