// pages/management/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    userId: '',
    list: [
     {
      nametext: "总包项目",
      img: "icon-_huabanfuben blue3",
      path: "/pages/contractproject/pact/pact"
    }, {
      nametext: "总包合同",
      img: "icon-hetong orange",
      path: "/pages/generalcontract/pact/pact"
    }, {
      nametext: "分包项目",
      img: "icon-web-icon- .blue",
      path: "/pages/subcontract/pact/pact"
    },
    {
      nametext: "费用",
      img: "icon-feiyong2 blue4",
      path: "#"
    },
    {
      nametext: "考勤",
      img: "icon-kaoqin1 red2",
      path: "#"
    },
    {
      nametext: "轨迹",
      img: "icon-guiji1 blue5",
      path: "#"
    },
    {
      nametext: "定位",
      img: "icon-duomeitiicon- green2",
      path: "#"
    },
    {
      nametext: "分包合同",
      img: "icon-fenbaohetong .green",
      path: "/pages/contract/pact/pact"
    },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      name: options.name,
      userId: options.userId
    })
    // console.log(this.data.name,this.data.userId)

  },
  return () {
    wx.navigateBack({
      delta: 1
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