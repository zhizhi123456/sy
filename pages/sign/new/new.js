// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addsign,
  officeAddress
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
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
    },
    WorkAreaName: "",
    getto:false,
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
    console.log(j1,w1)
    if(j1 > 0.003 || w1 > 0.003){
      this.setData({
        getto:false
      })
      return false
    }else{
      this.setData({
        getto:true
      })
      return true
    }
  },
  // 点击签到的时候
  confirm() {
    this.getYearMonth() // 获得考勤年月
    this.getday() // 获取打卡日期
    var jd = this.data.jd
    this.setData({
      'info.Address': "",
      'info.Checkintime': util.datefomate(new Date()),
      "info.CheckinCentPosi": jd,
      "info.ifeffective": true
    })
    var reach  = this.arrive()
    console.log(reach)
    if (!reach) {
      Toast({
        message: '不在考勤区域',
        mask: true
      });
    } else {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      console.log(this.data.info)
      addsign(this.data.info).then(res => {
        console.log(res)
        if (res.code == 10000) {
          if (res.value) {
            wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 3000
            })
            util.returnPrev('sign');
          } else {
            wx.showToast({
              title: '打卡失败',
              duration: 3000
            })
          }

        }
      })
    }
  },
  return () {
    util.returnPrev('sign');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '考勤打卡'
    })
    // 计时器时间变化
    this.getdata()
    this.setData({
      "info.Token": "ww",
      "info.TokenType": "ww",
      "info.UserID": "c30735fb-7b21-4b6e-919c-0039d9c8945f",
    })
    // 获得办公区域位置
    officeAddress({
      Token: this.data.info.Token,
      TokenType: this.data.info.TokenType,
      UserID: this.data.info.UserID,
    }).then(res => {
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
        // console.log(JSON.stringify(res)) //返回值中只会出现小程序已经向用户请求过的权限。
        // {"errMsg":"getSetting:ok","authSetting":{"scope.userLocation":true,"scope.userInfo":true}}  
        //地理位置                     用户信息  
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
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
        // console.log(JSON.stringify(res))
        // {"latitude":31.22352,"longitude":121.45591,"speed":-1,"accuracy":65,"verticalAccuracy":65,"horizontalAccuracy":65,"errMsg":"getLocation:ok"}
        //测试需要(+vm.data.lat)
        // var latitude = res.latitude  + vm.data.lat
        // var longitude = res.longitude  + vm.data.lat
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
        // console.log(res);
        // {status: 0, message: "query ok", request_id: "608944b4-1bd9-11ea-8237-525400fbd66b", result: {…}}
        // message: "query ok"
        // request_id: "608944b4-1bd9-11ea-8237-525400fbd66b"
        // result: {location: {…}, address: "上海市静安区延安中路789号", formatted_addresses: {…}, address_component: {…}, ad_info: {…}, …}
        // status: 0
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        var pls = {
          latitude: latitude,
          longitude: longitude
        };
        let pl = vm.data.pl.push(pls); //把第一个值 push 
        // console.log(vm.data.pl)
        //轨迹保存  请求保存位置 
        // wx.request({
        //   url: 'http://192.168.2.148:88/api/MapTrajectory/Insert',
        //   data: {
        //     Timestamp: '2019-12-5',
        //     token: 'token',
        //     tokentype: 'tokentype',
        //     UserID: "888281ff-31d7-4ad0-8444-40e4f1643263",
        //     Todaydate: '2019-12-5',
        //     Todaytime: util.formatTime(new Date()),
        //     latitude: latitude, //经度与维度
        //     longitude: longitude,
        //     addres: res.result.address //位置上海市静安区延安中路789号
        //   },
        //   dataType: "json",
        //   cache: false,
        //   ContentType: "application/json",
        //   method: 'Post',
        //   success: function (res) {}
        // })
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
})