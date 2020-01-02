var util = require("../utils/util");
/* 
  get
  post
  put
  delete
  patch
  request.get()
  // 导出一个对象，对象中包含get post put delete patch
*/

function request(url, data, header, method) {
  const userinfo = wx.getStorageSync("myInfo");
  // console.log(userinfo)
  if (userinfo) {
    var Willpass = {
      Timestamp: util.format(new Date()),
      Token: userinfo.Token,
      TokenType: userinfo.TokenType
    }
  } else {
    var Willpass = {
      Timestamp: util.format(new Date()),
    }
  }
  return new Promise((resolve, reject) => {
    // 发起请求
    wx.request({
      url,
      data: {
        ...data,
        ...Willpass
      },
      header,
      method,
      success: function (res) {
        if (res.statusCode === 200) {
          // 成功时调用resolve
          resolve(res.data)
        } else {
          reject()
        }
      },
      fail: function (res) {
        reject(res)
      },
      complete: function (res) {},
    })
  })
}


const _get = (url, data={}, header={}) => {
  return request(url, data, header, "GET")
}

const _post = (url, data={}, header={}) => {
  return request(url, data, header, "POST")
}

const _patch = (url, data = {}, header = {}) => {
  return request(url, data, header, "PATCH")
}

const _delete = (url, data = {}, header = {}) => {
  return request(url, data, header, "DELETE")
}

const _put = (url, data = {}, header = {}) => {
  return request(url, data, header, "PUT")
}


export default {
  get: _get, 
  post: _post, 
  put: _put, 
  delete: _delete, 
  patch: _patch
}