var util = require( '../../utils/util.js' )
Page( {
  data: {
    projects: [ { name: 'FinalScheduler（终极排班系统）', git: "https://github.com/giscafer/FinalScheduler" },
      { name: 'MoveSite（电影狙击手）', git: "https://github.com/giscafer/moviesite" },
      { name: 'Vue-order（订餐系统）', git: "https://github.com/giscafer/Vue-order" },
      { name: 'Ponitor（价格监控）', git: "https://github.com/giscafer/Ponitor" },
      { name: 'angular-webuploader（图片上传控件angular指令）', git: "https://github.com/giscafer/angular-webuploader" }
    ]
  },
  onReady: function() {
    this.clickName();
  },
  clickName: function( e ) {
    var pros = this.data.projects;
    console.log( "#########################################################################################################" )
    console.log( "##                                               其他项目                                               ##" )
    console.log( "##-----------------------------------------------------------------------------------------------------##" )
    pros.forEach( function( item, index ) {
      console.log( "##        ", item.name + ":" + item.git )
    })
    console.log( "##                                                                                                     ##" )
    console.log( "#########################################################################################################" )
  }
})
