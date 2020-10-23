// components/x-Citem/x-Citem.js
Component({
  // 组件内部监听页面的生命周期
  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log('页面被展示')
    },
    hide: function() {
      // 页面被隐藏
      console.log('页面被隐藏')
    },
    resize: function(size) {
      // 页面尺寸变化
      console.log('页面尺寸变化')
    }
  },
  // 组件生命周期
  lifetimes:{
    created:function(){
      console.log('组件被创建-new')
    },
    attached:function(){
      console.log('组件被添加到界面中-new')
    },
    detached:function(){
      console.log('组件界面当中移除-new')
    }
  },
  created:function(){
    console.log('组件被创建')
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
