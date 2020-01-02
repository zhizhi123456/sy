// pages/bill/detaillink/detaillink.js
var util = require("../../../utils/util");
import {
  // cancelBdetail,
  // referBdetail,
  // referBill,
  // Returnone,
  // deliverone,
  // Returndel
  detaildeliversmall,
  detaildeliver,
  deldeliversmall,
} from '../../../service/getData';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    speak: '',
    show: false,
    info: {},
    bill: {},
    active: 0,
    steps: [{
      text: 'root2--新建了材料明细',
      desc: '2019年3月29日 13:42'
    }],
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      // url: "/pages/deliver/detail/detail?id=" + this.data.info.getmaterialid + "&table=c"
      url: "/pages/deliver/detail/detail?id=" + this.data.info.delievryid+ "&table=c"
    })
  },
  // add_speak() {
  //   this.setData({
  //     show: true
  //   })
  // },
  // onChange(e) {
  //   this.setData({
  //     show: false,
  //     speak: e.detail.value
  //   })
  // },
  defaultimg(e) {
    let i = e.currentTarget.dataset.name,
      info = this.data.info;
    info.API_Picurl[i] = "../../../img/default-pic.png";
    this.setData({
      info
    })
    // console.log(this.data.info)
  },
  delete() {
    // console.log("1")
    // console.log(this.data.info.ID)
    // console.log( deldeliversmall)
    deldeliversmall({
      ID: this.data.info.ID
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        //?
        wx.redirectTo({
          // url: "/pages/deliver/detail/detail?id=" + this.data.info.getmaterialid + "&table=c"
          url: "/pages/deliver/detail/detail?id=" + this.data.info.delievryid+ "&table=c"
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    // console.log(options.detailid)
    if (options.detailid) {
      // 请求 detaildeliver
      detaildeliversmall({
        Timestamp: app.globalData.time,
        ID: options.detailid
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          this.setData({
            info: res.Item
          })
          // console.log(this.data.info)
          // 请求详细
          return detaildeliver({
            Timestamp: app.globalData.time,
            ID: this.data.info.delievryid
          })
        }
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department)
        this.setData({
          bill: item 
        })
        wx.hideLoading();
      })
    }
  },

})