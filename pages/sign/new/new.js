// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addsign,
  officeAddress
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
let userinfo = wx.getStorageSync("myInfo");
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upimg: false,
    // 要发送的数据
    info: {
      Token: '',
      TokenType: "",
      Address: "",
      UserID: "",
      CheckinYearMonth: "",
      checkindate: "",
      WorkAreaID: "",
      WorkAreaCentPosi: "",
      CheckinCentPosi: "",
      Checkintime: "",
      ifeffective: "",
      CheckinPicurl: ''
    },
    WorkAreaName: "",
    getto: false,
    date: "",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    show: false,
    show_time: false,
    sections: [],
    type: "",
    address: '',
    jd: "",
    city: '',
    latitude: 0,
    longitude: 0,
    pl: [],
    lat: 0,
    Workposition: ""
  },
  // 时间变化
  getdata() {
    var that = this
    var t = null;
    t = setTimeout(time, 1000); //开始运行
    function time() {
      clearTimeout(t); //清除定时器
      var date = new Date(),
        H = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(),
        i = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(),
        s = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      var data1 = H + ":" + i + ":" + s
      that.setData({
        date: data1
      })
      t = setTimeout(time, 1000); //设定定时器，循环运行     
    }
  },
  getYearMonth() {
    var myDate = new Date();
    var y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var m = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth() + 1); //获取当前月份(0-11,0代表1月)
    var data1 = myDate.toLocaleDateString(); //获取当前日期
    // 获得考勤年月
    var data = y + (m.toString())
    this.setData({
      'info.CheckinYearMonth': data
    })
  },
  // 获取打卡日期
  getday() {
    var date = new Date();
    var Y = date.getFullYear();
    var m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var d = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    // return Y + '年' + m + '月' + d + '日';
    var data1 = Y + '-' + m + '-' + d;
    this.setData({
      'info.checkindate': data1
    })
  },
  // 获取值
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  //点击重新定位
  anew() {
    qqmapsdk = new QQMapWX({
      key: 'EL5BZ-FNQK4-KPBUO-XSOS5-K2P5J-URF7O' //这里自己的key秘钥进行填充
    });
    this.getUserLocation()
  },
  // 判断是否在考勤区域内
  // !定位成功 并获取考勤位置
  arrive() {
    var jd2 = this.data.Workposition
    var jingdu = jd2.split(',')
    var j1 = jingdu[0] - this.data.longitude
    j1 = Math.abs(j1)
    var w1 = jingdu[1] - this.data.latitude
    w1 = Math.abs(w1)
    console.log(j1, w1)
    if (j1 > 0.003 || w1 > 0.003) {
      this.setData({
        getto: false
      })
      return false
    } else {
      this.setData({
        getto: true
      })
      return true
    }
  },
  return () {
    util.returnPrev('sign', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
        rid: options.rid,
        title: options.title
      })
    }
    wx.setNavigationBarTitle({
      title: '考勤打卡'
    })
    // 计时器时间变化
    this.getdata()
    var that = this
    userinfo = wx.getStorageSync("myInfo");
    that.setData({
      "info.Token": userinfo.Token,
      "info.TokenType": userinfo.TokenType,
      "info.UserID": userinfo.ID,
    })
    // 获得办公区域位置
    officeAddress({
      Token: this.data.info.Token,
      TokenType: this.data.info.TokenType,
      UserID: this.data.info.UserID,
    }).then(res => {
      console.log("办公区域")
      console.log(res)
      this.setData({
        "info.WorkAreaID": res.Item.ID,
        "info.WorkAreaCentPosi": res.Item.CenterAddressPosition,
        WorkAreaName: res.Item.WorkAreaName,
        Workposition: res.Item.CenterAddressPosition
      })
    })
    qqmapsdk = new QQMapWX({
      key: 'EL5BZ-FNQK4-KPBUO-XSOS5-K2P5J-URF7O' //这里自己的key秘钥进行填充
    });
    this.getUserLocation()
  },
  //地图定位  授权  获取经纬度   获取地理位置
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          // 不是初始化  且不等于true   授权为fasle
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      // 授权成功
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化页面
          //调用wx.getLocation的API
          vm.getLocation();
        } else { // 为false
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },

  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        var pls = {
          latitude: latitude,
          longitude: longitude
        };
        let pl = vm.data.pl.push(pls); //把第一个值 push 
        // 赋值
        vm.setData({
          address: res.result.address,
          latitude: latitude,
          longitude: longitude,
          // //测试需要
          // lat: vm.data.lat + 0.001
          jd: longitude + ',' + latitude
        })
        vm.arrive()
        console.log(vm.data.jd)
        console.log(vm.data.address, vm.data.pl)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  checkimg() {
    let that = this,
      userinfo = wx.getStorageSync("myInfo");
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['camera'],
      success: res => {
        let tempFilePaths = res.tempFilePaths;
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        wx.uploadFile({
          url: 'https://shangyongren.com:9098/api/Check_in_onattendanceImage/Get_photo',
          filePath: tempFilePaths[0],
          name: 'img_data',
          formData: {
            addres: that.data.address,
            datetime: util.datefomate(new Date()),
            user: userinfo.UserName
          },
          success(res) {
            if (res.statusCode == 200) {
              that.setData({
                'info.CheckinPicurl': "https://shangyongren.com:9098" + res.data.replace(/"/g, "")
              })
              wx.hideToast();
              that.getYearMonth() // 获得考勤年月
              that.getday() // 获取打卡日期
              var jd = that.data.jd
              that.setData({
                'info.Address': "",
                'info.Checkintime': util.datefomate(new Date()),
                "info.CheckinCentPosi": jd,
                "info.ifeffective": true,
                "info.UserID": userinfo.ID,
                "info.Token": userinfo.Token,
                "info.TokenType": userinfo.TokenType,
              })
              console.log(that.data.info)
              // var reach = this.arrive()
              var reach = true
              console.log(reach)
              if (!reach) {
                Toast({
                  message: '不在考勤区域',
                  mask: true
                });
              } else {
                let info = that.data.info;
                util.checkContent(info, that);
                that.setData({
                  info
                })
                console.log(that.data.info)
                addsign(that.data.info).then(res => {
                  console.log(res)
                  if (res.code == 10000) {
                    if (res.value) {
                      wx.showToast({
                        title: '打卡成功',
                        icon: 'success',
                        duration: 3000
                      })
                      util.returnPrev('sign', '', that.data.userid, that.data.caption, that.data.dep, that.data.deptxt,
                        that.data.rid, that.data.title)
                    } else {
                      wx.showToast({
                        title: '打卡失败',
                        duration: 3000
                      })
                    }

                  }
                })
              }
            }
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },
  // 点击签到的时候
  confirm() {
    if (this.data.address) {
      this.checkimg();
    } else {
      wx.showToast({
        title: '请重新定位',
        icon: 'none',
        duration: 3000
      })
    }
    // this.getYearMonth() // 获得考勤年月
    // this.getday() // 获取打卡日期
    // var jd = this.data.jd
    // this.setData({
    //   'info.Address': "",
    //   'info.Checkintime': util.datefomate(new Date()),
    //   "info.CheckinCentPosi": jd,
    //   "info.ifeffective": true,
    //   "info.UserID": userinfo.ID,
    //   "info.Token": userinfo.Token,
    //   "info.TokenType": userinfo.TokenType,
    // })
    // console.log(this.data.info)
    // // var reach = this.arrive()
    // var reach = true
    // console.log(reach)
    // if (!reach) {
    //   Toast({
    //     message: '不在考勤区域',
    //     mask: true
    //   });
    // } else {
    //   let info = this.data.info;
    //   util.checkContent(info, this);
    //   this.setData({
    //     info
    //   })
    //   console.log(this.data.info)
    //   addsign(this.data.info).then(res => {
    //     console.log(res)
    //     if (res.code == 10000) {
    //       if (res.value) {
    //         wx.showToast({
    //           title: '打卡成功',
    //           icon: 'success',
    //           duration: 3000
    //         })
    //         util.returnPrev('sign', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
    //           this.data.rid, this.data.title)
    //       } else {
    //         wx.showToast({
    //           title: '打卡失败',
    //           duration: 3000
    //         })
    //       }

    //     }
    //   })
    // }
  },
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
  onReady: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
})