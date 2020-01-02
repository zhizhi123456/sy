// pages/current/current/current.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:["总包项目审批","总包合同审批","费用审批","领料审批","退料审批","分包编号审批","分包项目审批","分包合同审批"]
  },
  return () {
    wx.navigateBack({
      delta: 1
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})