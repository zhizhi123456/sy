// pages/aamenu/index2.js
import {
  queryMenu
} from "../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuicon: [
      ['icon-fenbaohetong', 'icon-renminxietiaojiexiehui', 'icon-yonghuxieyi', 'icon-jishuziliao', 'icon-dashujukeshihuaico-', 'icon-gongchengbiangengshenpi'],
      ['icon-renyuandingwei', 'icon-guiji', 'icon-kaoqin1', 'icon-huiyi'],
      ['icon-taizhang', 'icon-schedule', 'icon-tongzhi', 'icon-baogao1'],
      ['icon-baogao3', 'icon-zhongguohangtiantubiaoheji-weizhuanlunkuo-', 'icon-shenqing', 'icon-wj-thwj', 'icon-zaitu', 'icon-chaxun', 'icon-chaxun1'],
      ['icon-shipinjiankong', 'icon-tonghuajilu', 'icon-chufadan', 'icon-tubiaozhizuomoban', 'icon-bianji', 'icon-yinbigongcheng'],
      ['icon-kaohe', 'icon-baobiao2'],
      ['icon-gongchengbiangengshenpi', 'icon-jishuziliao'],
      ['icon-lunkuodasan-'],
      ['icon-chengbenfenxi-', 'icon-shouzhimingxi', 'icon-report', 'icon-yuancailiao', 'icon-feiyong3']
    ],
    plance:[['/pages/contract/pact/pact','/pages/harmonize/pact/pact','','','','/pages/variation/pact/pact'],['/pages/location/location','/pages/track/track',''],['/pages/projectmeet/pact/pact','','/pages/plan/pact/pact',''],['','/pages/bill/pact/pact','','','/pages/employ/pact/pact','','/pages/materialPurchase/pact/pact'],['','/pages/talk/pact/pact','','','','/pages/shelter/pact/pact'],[''],['/pages/variation/pact/pact',''],[''],['/pages/count/pact/pact','/pages/unify/pact/pact','','/pages/quantity/pact/pact','/pages/cost/pact/pact']]
  },
  return () {
    wx.redirectTo({
      url: '/pages/aamenu/index1'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options) {
      this.setData({
        name: options.name,
        tab: options.tab,
      })
      queryMenu({
        pid: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          this.setData({
            menu: res.List
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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