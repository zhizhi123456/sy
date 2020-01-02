// pages/aamenu/index1.js
import {
  queryMenu,
  getdep
} from "../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newinfo: 0,
    coord: 1000,
    tabBar: [],
    tab: 0,
    title: '工程管理',
    icon: ['icon-gongchengguanli-', 'icon-web-icon-', 'icon-wode'],
    menuicon: [
      ['icon-zhunbeiliangchan', 'icon-drxx91', 'icon-jindu', 'icon-cailiaojinchang', 'icon-construction', 'icon-jixiao', 'icon-guanyugongsi-jishu', 'icon-zhilianganquan', 'icon-tongji'],
      ['icon-bangong1', 'icon-dingdanchulizhong', 'icon-jixiaokaoping', 'icon-ico_wupinguanli_xiangmuxinxiweihu', 'icon-dingdanchulizhong', 'icon-jixiaokaoping', 'icon-ico_wupinguanli_xiangmuxinxiweihu', 'icon-zhaotoubiao'],
      ['icon-_huabanfuben', 'icon-hetong', 'icon-renwu', 'icon-icon-test1', 'icon-shenqing', 'icon-yonghuxieyi', 'icon-web-icon-', 'icon-zhuce', 'icon-gerenzhongxinyewodexinxi', 'icon-shenqing1', 'icon-bumen.green4', 'icon-renwu']
    ],
    plance: [
      ['', '', 'generalcontract', 'task', '', 'pointsnumber', 'deal', 'subcontract'],
      ['']
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tabBar();
    this.tabBar(1000);
    let userinfo = wx.getStorageSync("myInfo");
    if (userinfo) {
      getdep({
        UserName: userinfo.UserName
      }).then(res => {
        // console.log(res);
        let resData = JSON.parse(res);
        this.setData({
          userinfo,
          dep: resData[0].ID,
          deptxt: resData[0].techofficename
        })
      })
    }
  },
  cut(e) {
    let index = e.currentTarget.dataset.index,
      name = this.data.tabBar[index].name,
      id = this.data.tabBar[index].ID;
    this.setData({
      tab: index,
      title: name
    })
    this.tabBar(id)
  },
  tabBar(pid) {
    wx.showLoading({
      title: "加载中..."
    })
    queryMenu({
      pid
    }).then(res => {
      if (res.code == 10000) {
        if (pid) {
          this.setData({
            menu: res.List
          })
        } else {
          this.setData({
            tabBar: res.List
          })
        }
        wx.hideLoading();
      }
    })
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