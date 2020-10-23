// components/x-tabBar/x-tabBar.js
Component({
  /**
   * 组件的属性列表(外界传过来的)
   */
  properties: {
    segmentItems:{
        type:Array, //类型
        value:[] //值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0 // 记录选中的索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 2、定义一个方法给x-tabBarPane.js使用  更改选中索引值
    _setCurrentIdx:function(index){
      this.setData({
        currentIndex:index
      })
    },
    // 1、点击更改选中样式
    _bandlerTap:function(evt){
      let cid = evt.currentTarget.id
      this.setData({ currentIndex:cid})
      //2、 触发一个自定义事件，并且把数据传递出去 this.triggerEvent(事件名称,要传递的参数,事件相关选项)
      // 外界要使用，监听这个自定义事件
      this.triggerEvent("selectChange",{currentIdx:cid},{})
    }
  }
})
