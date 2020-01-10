// pages/project/project.js
import {
  tracklist,
  track,
  userID
} from "../../service/getData";
var util = require("../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    InfoList: [],
    info: {
      UserID: user.ID
    },
    currentDate: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    top: '我的轨迹',
    hadNew: 1,
    me: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.id) {
      wx.setStorageSync('menus', options)
    }
    let that = this;
    wx.showLoading({
      title: "加载中"
    })
    if (options.userid) {
      this.setData({
        top: options.caption + "的轨迹",
        hadNew: 0,
        person: options.caption,
        userid: options.userid,
        deptxt: options.deptxt,
        caption: options.caption,
        dep: options.dep
      })
      if (options.caption == '我') {
        this.setData({
          me: 1,
        })
      }
      userID({
        UserName: options.userid
      }).then(res => {
        if (res) {
          let resarr = JSON.parse(res);
          tracklist({
            UserID: resarr[0].ID
          }).then(res => {
            if (res.code == 10000) {
              let list = res.List;
              list.forEach((item, index) => {
                track({
                  UserID: item.UserID,
                  Todaydate: item.Todaydate
                }).then(dot => {
                  list[index].origin = dot.List[0].addres;
                  list[index].terminus = dot.List[dot.List.length - 1].addres;
                })
              })
              setTimeout(() => {
                that.setData({
                  InfoList: list.reverse()
                })
                wx.hideLoading();
              }, 1000)
            }
          })
        }
      })
    } else {
      if (user) {
        tracklist({
          UserID: user.ID
        }).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            let list = res.List;
            list.forEach((item, index) => {
              track({
                UserID: item.UserID,
                Todaydate: item.Todaydate
              }).then(dot => {
                list[index].origin = dot.List[0].addres;
                list[index].terminus = dot.List[dot.List.length - 1].addres;
              })
            })
            setTimeout(() => {
              that.setData({
                InfoList: list.reverse()
              })
              wx.hideLoading();
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: '请登录',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  // 返回
  return () {
    if (this.data.hadNew || this.data.me) {
      let menus = wx.getStorageSync('menus');
      util.returnMenu2(menus.id, menus.title);
    } else {
      wx.redirectTo({
        url: "/pages/section/section2?name=" + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid
      });
    }
  },
  // 开始时间
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  onClose_time() {
    this.setData({
      show_time: false
    })
  },
  onConfirm_time(e) {
    let info = util.editInfo(e, this, util.datefom(e.detail));
    this.setData({
      info,
      show_time: false
    })
  },
  // 结束时间
  showPopup_endtime() {
    this.setData({
      show_endtime: true
    })
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  onConfirm_endtime(e) {
    let info = util.editInfo(e, this, util.datefom(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  // 按时间段搜索
  seachInfo() {
    wx.showLoading({
      title: "查询中"
    })
    tracklist(this.data.info).then(res => {
      if (res.code == 10000) {
        let info = this.data.info;
        delete info.stardate;
        delete info.enddate;
        let list = res.List,
          that = this;
        list.forEach((item, index) => {
          track({
            UserID: item.UserID,
            Todaydate: item.Todaydate
          }).then(dot => {
            list[index].origin = dot.List[0].addres;
            list[index].terminus = dot.List[dot.List.length - 1].addres;
          })
        })
        setTimeout(() => {
          that.setData({
            InfoList: list,
            info
          })
          wx.hideLoading();
        }, 1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
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