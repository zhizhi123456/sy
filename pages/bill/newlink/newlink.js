// pages/bill/newlink/newlink.js
import {
  addBdetail,
  referBdetail,
  amendBdetail
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      getmaterialid: '',
      goodscode: '',
      goodsname: '',
      specifications: ''
    }],
    billid: 0,
    designation: [],
    show: false,
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/bill/detail/detail?tab=c&id=" + this.data.billid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
    })
  },
  // 获取材料明细输入框中的数据并设置给data
  //商品编号
  showPopup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm(e) {
    let materials = util.updateCode(e, this);
    this.setData({
      materials,
      show: false
    })
  },
  // getgname(e) {
  //   let materials = util.updateValue(e, this);
  //   this.setData({
  //     materials
  //   })
  // },
  // getSize(e) {
  //   let materials = util.updateValue(e, this);
  //   this.setData({
  //     materials
  //   })
  // },
  getUnit(e) {
    let materials = util.updateValue(e, this);
    this.setData({
      materials
    })
  },
  getQuantity(e) {
    let materials = util.updateValue(e, this);
    this.setData({
      materials
    })
  },
  getRecord(e) {
    let materials = util.updateValue(e, this);
    this.setData({
      materials
    })
  },
  // 新增领料单材料明细
  confirm() {
    if (this.data.materials[0].goodsname && this.data.materials[0].goodscode && this.data.materials[0].quantity) {
      let materials = this.data.materials;
      materials[0].getmaterialid = this.data.billid;
      this.setData({
        materials
      })
      // console.log(this.data.materials)
      addBdetail({
        adate: JSON.stringify(this.data.materials)
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: "/pages/bill/detail/detail?tab=c&id=" + this.data.billid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
          })
        } else {
          wx.showToast({
            title: '请输入正确信息',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none',
        duration: 1000
      })
    }
  },
  // 编辑材料明细时的返回和确定
  linkreturn() {
    wx.redirectTo({
      url: "/pages/bill/detaillink/detaillink?detailid=" + this.data.materials[0].ID + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
    })
  },
  linkconfirm() {
    // console.log(this.data.materials)
    amendBdetail({
      ID: this.data.materials[0].ID,
      uptdate: JSON.stringify(this.data.materials)
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/bill/detaillink/detaillink?detailid=" + this.data.materials[0].ID + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title,
      })
    }
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
        me: Number(options.me),
        applyT: Number(options.applyT)
      })
    }
    this.setData({
      designation: app.globalData.detaillink,
    })
    // 领料单id
    if (options.id) {
      this.setData({
        billid: options.id,
      })
    }
    // 明细表id
    if (options.detailid) {
      referBdetail({
        ID: options.detailid
      }).then(res => {
        // console.log(res.Item)
        let materials = this.data.materials;
        materials[0] = res.Item;
        this.setData({
          materials
        })
        // console.log(this.data.materials);
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