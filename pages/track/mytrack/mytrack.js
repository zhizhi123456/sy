// pages/project/project.js
import {
  track
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var item;
// import {} from 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'EL5BZ-FNQK4-KPBUO-XSOS5-K2P5J-URF7O' // 必填
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    track: [],
    hadNew: 1
  },
  return () {
    if (this.data.hadNew || this.data.me) {
      wx.redirectTo({
        url: "/pages/track/track"
      })
    } else {
      wx.redirectTo({
        url: "/pages/track/track?caption=" + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.userid) {
      this.setData({
        hadNew: 0,
        person: options.caption,
        userid: options.userid,
        deptxt: options.deptxt,
        caption: options.caption,
        dep: options.dep
      })
    }
    if (options.caption == '我') {
      this.setData({
        me: 1,
      })
    }
    if (options.UserID) {
      track({
        UserID: options.UserID,
        Todaydate: options.Todaydate
      }).then(res => {
        // console.log(res)
        item = res.List;
        if (res.code == 10000) {
          this.setData({
            track: item,
            polyline: [{
              points: item,
              color: '#008080',
              width: 4,
              arrowLine: true
            }],
            marker: [{
              id: 0,
              height: 20,
              iconPath: '../../../img/mine.png',
              latitude: item[0].latitude,
              longitude: item[0].longitude,
              callout: { //在markers上展示地址名称
                display: 'BYCLICK',
              }
            }, {
              id: 1,
              height: 50,
              iconPath: '../../../img/begin.png',
              latitude: item[0].latitude,
              longitude: item[0].longitude,
              callout: { //在markers上展示地址名称
                content: '起点：' + item[0].addres,
                color: '#fff',
                display: 'ALWAYS',
                padding: 5,
                bgColor: '#008080'
              }
            }, {
              id: 2,
              height: 30,
              iconPath: '../../../img/end.png',
              latitude: item[item.length - 1].latitude,
              longitude: item[item.length - 1].longitude,
              callout: { //在markers上展示地址名称
                content: '终点：' + item[item.length - 1].addres,
                color: '#fff',
                display: 'ALWAYS',
                padding: 5,
                bgColor: '#008080'
              }
            }]
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    // 使轨迹居中
    this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.includePoints({
      padding: [100],
      points: item
    })
    setTimeout(() => {
      item.forEach(site => {
        this.mapCtx.translateMarker({
          markerId: 0,
          autoRotate: true,
          duration: 1000,
          destination: {
            latitude: site.latitude,
            longitude: site.longitude
          }
        })
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.includePoints({
      padding: [100],
      points: item
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