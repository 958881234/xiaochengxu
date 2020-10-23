
Page({
  //事件绑定： 点击按钮 插入数据到数组
  _handlerTap:function(){
      console.log("xxx")
      this.data.navList.unshift({id:20,name:'测试'}) //改变了数组本身
      this.setData({      // 必须调用setData方法 ，把改变后的数组赋值给属性，更新页面刷新
          navList:this.data.navList
      })
  },
   
/**
 * 页面的初始数据
 */
data: { 
    navList : [],
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
    // console.log("A2:首页-监听页面加载-onLoad-1");
  
    /* 2.请求导航 */ 
    wx.request({
        url: "https://locally.uieee.com/categories",
        success: (res) => { 
          console.log(res);
            this.setData({
                navList: res.data
            });
        },
    });
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {
    // console.log("B2:首页-监听页面初次渲染完成-onReady-3");
  //   setTimeout(function(){})  这里不能用function，要用箭头函数（箭头函数没有this）让他向上找this
  setTimeout(()=>{
      console.log("2秒到了")
      this.data.navList.unshift({id:140,name:'2秒增加的'}) 
      this.setData({      
          navList:this.data.navList
      })
  },2000)

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
    // console.log("C2:首页-监听页面显示-onShow-2");
},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {
    console.log("D2:首页-监听页面隐藏");
},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {
    console.log("E2:首页-监听页面卸载");
},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})