Component({
    /**
     * *组件属性列表*/
    properties:{
        xList:Object, //接收父组件的值 或 数组(外界传来的)
        index:Number
    },
    /**
     * *组件初始数据*/
    data:{ //组件内部数据，自己的
        isDelete:false
    },
     /**
     * *组件方法列表*/
    methods:{
        // 长按 晃悠
        _deleteItem:function(){
            console.log("长按执行")
            this.setData({
                isDelete:true
            })
        },
        _handerDelete:function(){
            wx.showModal({
                title: '是否删除',
                content: '这是一个模态弹窗，删除啦！！',
                success:(res)=> {
                  if (res.confirm) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000
                      })
                      this.setData({
                        isDelete:false
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    this.setData({
                        isDelete:false
                    })
                  }
                }
              })
        }
    }
})