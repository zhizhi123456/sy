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
      url: 'https://shangyongren.com:9098' + url,
      data: {
        ...data,
        ...Willpass
      },
      header,
      method,
      success: function (res) {
        if (res.statusCode === 200) {
          // 成功时调用resolve
          resolve(res.data);
          if (res.data.sub_msg == "访问令牌不匹配" && wx.getStorageSync("myInfo")) {
            wx.hideLoading();
            wx.removeStorageSync("myInfo");
            var num = 4;
            var time = setInterval(() => {
              num = num - 1;
              wx.showToast({
                title: '令牌过期请重新登录\n' + num + '秒后将自动跳转至登录页面',
                icon: 'none',
                duration: 1000
              })
              if (num == 1) {
                clearInterval(time);
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
            }, 1000);
          } else if (res.data.sub_msg == "访问令牌不匹配") {
            wx.hideLoading();
            wx.showToast({
              title: '请登录',
              icon: 'none',
              duration: 3000
            })
          }
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
const _get = (url, data = {}, header = {}) => {
  return request(url, data, header, "GET")
}

const _post = (url, data = {}, header = {}) => {
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