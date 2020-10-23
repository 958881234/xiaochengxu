// ****** 
// ** 爬取 其他网站内容

// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require("request-promise") //引入库
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let course_id = event.course_id
  // 1 确定接口信息  爬取其他网站评论
// https://m.ke.qq.com/cgi-bin/comment_new/course_comment_list?cid=375599&count=10&filter_rating=0&filter_reply=0&page=0&bkn=1245732520&r=0.1761
//https://m.ke.qq.com/m-core/comment.html?_bid=167&_wv=2147487745&course_id=375599

  // 2 借助模块 向指定接口发送网络请求，获取数据，返回出去
  let options = {
    uri:' https://m.ke.qq.com/cgi-bin/comment_new/course_comment_list',
    qs:{
      count:10,
      cid:course_id,  //375599,
      page:0
    },
    headers:{
      // 'referer':'https://m.ke.qq.com/m-core/comment.html?_bid=167&_wv=2147487745&course_id=375599'
      'referer':`https://m.ke.qq.com/m-core/comment.html?_bid=167&_wv=2147487745&course_id=${course_id}` // 使用字符串模板传参  ${course_id}
    },
    json:true
  };
  let result = await rp(options).then(res=>{
    return res
  }).catch(err=>{
    console.log(err)
  })
  return result;
}