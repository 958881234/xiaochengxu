 //初始化云函数
 const db = wx.cloud.database()
 // 获取app.js 中的对象
 const app = getApp()

 Page({
   bindGetUserInfo(e){
     console.log(e)
     let userinfo = e.detail.userInfo;
     if(!this.data.logged && userinfo){
       // 1、云函数存用户信息
       db.collection('users').add({
         data:{
           userPhoto:userinfo.avatarUrl,
           nickName:userinfo.nickName,
           signature:'',
           phoneNumber:'',
           weixinNumber:'',
           links:'',
           time:new Date(),
           friendList:[],//好友列表

           isLocation:true, //开启位置共享
           longitude:this.longitude, //经纬度
           latitude:this.latitude,
           location:db.Geo.Point(this.longitude,this.latitude)
         }
       }).then((res)=>{
         console.log(res)
         //2、 云函数 读存的用户信息
         db.collection('users').doc(res._id).get().then((res)=>{
           console.log(res.data)
           app.userInfo = Object.assign(app.userInfo,res.data)
           this.setData({
             userPhoto : app.userInfo.userPhoto,
             nickName:app.userInfo.nickName,
             logged:true,
             id:app.userInfo._id //拿到当前用户id，给跳转个人主页用
           })
         })
       })
     }
   },
  //  获取发送好友申请的信息
   getMessage(){
    db.collection('message').where({
      userId:app.userInfo._id
    }).watch({ //实时监听数据变化
      onChange:function(snapshot){
        if(snapshot.docChanges.length){
          let list = snapshot.docChanges[0].doc.list;
          console.log(list)
          // 微信方法，在索引2的导航显示红点提示信息
          wx.showTabBarRedDot({
            index: 1,
          });
          // 把登录的id 存到全局，给消息使用
          app.userMessage = list
        }else{
          wx.hideTabBarRedDot({
            index: 1,
          });
          app.userMessage = []
        }
      },
      onError:function(err){
        console.log('错误',err)
      }
    })
   },
  //  获取经纬度
   getLocation(){
    wx.getLocation({
      type:'gcj02',
      success:(res)=>{
        this.longitude = res.longitude
        this.latitude = res.latitude
      }
    })
  },
   /**
    * 页面的初始数据
    */
   data: {
     userPhoto:"/assets/images/avatar.png",
     logged:false, //显示头像还是按钮
    disabled:true, // 判断是否现实
    id:''
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
    // 3、让进入当前页 自动检测登录没有
      wx.cloud.callFunction({
        name:'login',
        data:{}
      }).then((res)=>{
        console.log(res)
        // 查询数据库操作
        db.collection('users').where({
          _openid:res.result.openid
        }).get().then((res)=>{
          console.log(res)
          if(res.data.length){ //如果没有这个用户，就让点击登录
            app.userInfo = Object.assign(app.userInfo,res.data[0])
            this.setData({
              userPhoto : app.userInfo.userPhoto,
              nickName:app.userInfo.nickName,
              logged:true,
              id:app.userInfo._id
            });
            this.getMessage(); // 登录成功 调用消息
          }else{
            this.setData({
              disabled:false
            })
          }
          
        })
      })
   },
 
   /**
    * 生命周期函数--监听页面显示,每次进入的时候监听
    */
   onShow: function () {
    this.setData({ // 每次进入页面时，去看下存储的用户信息是否更改，更新显示
      userPhoto:app.userInfo.userPhoto,
      nickName:app.userInfo.nickName,
      id:app.userInfo._id
    })
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