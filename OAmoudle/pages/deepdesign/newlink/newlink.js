// pages/bill/newlink/newlink.js
import {
  addDeepddetail,
  referDeepddetail,
  amendDeepddetail
} from "../../../../service/getData";
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      inwarehouseID: '',
    }],
    billid: 0,
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/deepdesign/detail/detail?id=" + this.data.billid + "&tab=c"
    })
  },
  getgcode(e) {
    util.updateValue(e, this);
  },
  getgname(e) {
    util.updateValue(e, this);
  },
  getSize(e) {
    util.updateValue(e, this);
  },
  getUnit(e) {
    util.updateValue(e, this);
  },
  getQuantity(e) {
    util.updateValue(e, this);
  },
  // 新增领料单材料明细
  confirm() {
    let materials = this.data.materials;
    materials[0].inwarehouseID = this.data.billid;
    materials[0].createman = userinfo.UserName;
    materials[0].createtime = util.format(new Date());
    materials[0].updateman = "";
    materials[0].updatetime = "";
    this.setData({
      materials
    })
    addDeepddetail(this.data.materials[0]
      //   {
      //   // adate: JSON.stringify(this.data.materials)
      // }
    ).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '新建成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/OAmoudle/pages/deepdesign/detail/detail?id=" + this.data.billid + "&tab=c"
        })
      } else {
        wx.showToast({
          title: '请输入正确信息',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  // 编辑材料明细时的返回和确定
  linkreturn() {
    wx.redirectTo({
      url: "/OAmoudle/pages/deepdesign/detaillink/detaillink?detailid=" + this.data.materials[0].ID
    })
  },
  linkconfirm() {
    let materials = this.data.materials;
    materials[0].updateman = userinfo.UserName;
    materials[0].updatetime = util.format(new Date());
    this.setData({
      materials
    })
    // console.log(this.data.materials)
    amendDeepddetail(this.data.materials[0]).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/OAmoudle/pages/deepdesign/detaillink/detaillink?detailid=" + this.data.materials[0].ID
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    // 领料单id
    if (options.id) {
      this.setData({
        billid: options.id,
      })
    }
    // 明细表id
    if (options.detailid) {
      referDeepddetail({
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },

})