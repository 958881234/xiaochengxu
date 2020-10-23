// components/x-tabBarPane/x-tabBarPane.js
Component({
  options:{
    multipleSlots:true // 在组件定义时 选项中启用多个 slot支持
  },
  externalClasses:["segment-cls"], // 设定外部使用类名规范
  /**
   * 组件的属性列表
   */
  properties: {
    segmentItems:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIdx:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 滑动下面 切换上面
    _handlerChange:function(evt){
      console.log(evt.detail.current)
      // 1 获取分选择器组件对象本身  页面设置的id
      let segBar = this.selectComponent("#x-sp-sb")
      // 2 调用对应方法 -- 在x-tabBar.js中定义的
      segBar._setCurrentIdx(evt.detail.current)
    },
    // 点击头部切换下面
    _handlerSelectChange:function(evt){
      console.log(evt)
      let idx = parseInt(evt.detail.currentIdx) 
      this.setData({
        currentIdx : idx
      })
    }
  }
})
