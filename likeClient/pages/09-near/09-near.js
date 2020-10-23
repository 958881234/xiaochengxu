const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({
    getLocation(){
      wx.getLocation({
        type:'gcj02',
        success:(res)=>{
          const longitude = res.longitude
          const latitude = res.latitude
          this.setData({
            longitude,
            latitude
          });
          this.getNearUsers()
        }
      })
    },
    //获取附近好友-云开发的
    getNearUsers(){
      db.collection('users').where({
        location:_.geoNear({
          geometry:db.Geo.Point(this.data.longitude,this.data.latitude),
          minDistance:0,
          maxDistance:5000
        }),
        isLocation:true //有个开启共享开关
      }).field({
        longitude:true,
        latitude:true,
        userPhoto:true
      }).get().then((res)=>{
        console.log(res.data)
        // 微信地图功能，把头像渲染到地图
        let data = res.data;
        let result = [];
        if(data.length){
          for(let i=0;i<data.length;i++){
            
            if(data[i].userPhoto.includes('cloud://')){ // 处理头像，如果是临时图片，自定义头像
              wx.cloud.getTempFileURL({
                fileList:[data[i].userPhoto],
                success:res=>{
                  result.push({
                    iconPath:res.fileList[0].tempFileURL,
                    id:data[i]._id,
                    longitude:data[i].longitude,
                    latitude:data[i].latitude,
                    width:30,height:30
                  });
                  this.setData({
                    markers:result
                  });
                }
              })
            }else{
              result.push({
                iconPath:data[i].userPhoto,
                id:data[i]._id,
                longitude:data[i].longitude,
                latitude:data[i].latitude,
                width:30,height:30
              });
            }
          }
          this.setData({
            markers:result
          });
        }
      })
    },
    markertap(e){
      wx.navigateTo({
        url:"/pages/08-jiaoyouDetail/08-jiaoyouDetail?userId="+e.markerId
      })
    },
  /**
   * 页面的初始数据
   */
  data: {
    longitude:'', //经纬度
    latitude:'',
    markers:[] //用户头像显示在地图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocation()
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