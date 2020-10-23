const db = wx.cloud.database()
const app = getApp()
Page({
  // 点赞功能，使用云函数
  _handleLinks(e){
    let id = e.target.dataset.id;
    wx.cloud.callFunction({
      name:"updata",
      data:{
        collection:'users', //更新的数据库名字
        doc:id, //修改的id和数据
        // data:{links:6 }
        data: "{links:_.inc(1) }" // 自增减操作，传字符串到服务端操作
      }
    }).then((res)=>{
      console.log(res)
      // 更新数据操作
      let updated = res.result.stats.updated;
      if(updated){
        let cloneListData = [...this.data.listData]  //克隆一份数组,所有用户
        console.log(cloneListData)
        for(let i=0;i<cloneListData.length;i++){ //循环找到点击的 自增点赞 1
          if(cloneListData[i]._id == id){
            cloneListData[i].links++;
          }
        }
        this.setData({
          listData : cloneListData
        });
      }
    })
  },
  // 初始化数据列表
  getListData(){
    db.collection('users').field({ //要求返回的字段，不用全返回
      userPhoto:true,
      nickName:true,
      links:true
    })
    .orderBy(this.data.current,'desc') // 排序 升序
    .get().then((res)=>{
      this.setData({
        listData:res.data
      })
    })
  },
  // 点击 切换导航，排序
  handleCurrent(e){
    let current = e.target.dataset.current;
    console.log(current)
    if(current == this.data.current){
      return false;
    }
    this.setData({
      current
    },()=>{ // 点击后给个异步回调，重新渲染数据
      this.getListData()
    })
  },
  // 点击图片进入详情
  handleDetail(e){
     let id = e.target.dataset.id
     wx.navigateTo({
       url: '/pages/08-jiaoyouDetail/08-jiaoyouDetail?userId=' + id,
     })
  },
  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    current:'links'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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