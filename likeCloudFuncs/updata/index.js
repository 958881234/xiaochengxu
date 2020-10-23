// *** 点赞功能 ***
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入数据库
const db = cloud.database()
const _ = db.command //预算能力，自增减操作，看文档，前端传来字符串，服务端操作
// 云函数入口函数
exports.main = async (event, context) => {
  // 更新操作
  try {
    // 接收前端传的参数，是字符串就用 js的eval方法 把字符串转成js语句方法
    if(typeof event.data == 'string'){
      event.data = eval('('+event.data+')');
    }
    if(event.doc){
      return await db.collection(event.collection)
      .doc(event.doc)
      .update({
        data: {
         ...event.data
        },
      })
    }else{
      return await db.collection(event.collection)
      .where({...event.where})
      .update({
        data: {
         ...event.data
        },
      })
    }
   
  } catch(e) {
    console.error(e)
  }
}