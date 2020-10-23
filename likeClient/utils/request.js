function request(obj){
  let url = obj.url;
  let data = obj.data || {};
  let success = obj.success;
  let method = obj.method || "GET"; //如果没设置就用get
  wx.request({
    url: url,
    data: data,
    dataType: 'json',
    enableCache: true,
    enableHttp2: true,
    enableQuic: true,
    header: {},
    method: method,
    responseType: 'text',
    timeout: 0,
    success: (result) => {
      if(result.statusCode == 200){
        success(result.data)
      }
    },
    fail: (res) => {},
    complete: (res) => {
      console.log('请求完成：',res)
    },
  })
}
module.exports.request = request;