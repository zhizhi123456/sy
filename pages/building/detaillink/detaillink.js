// pages/bill/detaillink/detaillink.js
var util = require("../../../utils/util");
import {
  // cancelBdetail,
  // referBdetail,
  // referBill,
  // Returnone,
  // buildingone,
  // Returndel
  detailbuildingsmall,
  detailbuilding,
  delbuildingsmall,
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
      // url: "/pages/building/detail/detail?id=" + this.data.info.getmaterialid + "&table=c"
      url: "/pages/building/detail/detail?id=" + this.data.info.buildingAcceptanceId + "&table=c"
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
    util.expurgateDetail(this,delbuildingsmall,'building',this.data.info.buildingAcceptanceId)
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
      // 请求 detailbuilding
      detailbuildingsmall({
          ID: options.detailid
        }).then(res => {
          console.log(res)
          if (res.code == 10000) {
            let item = res.Item;
            item.ConstructionunitCheck = util.whethercontent(item.ConstructionunitCheck)
            util.handleData(item, this, app.globalData.department)
            this.setData({
              info: item
            })
            // console.log(this.data.info)
            // 请求详细
            return detailbuilding({
              Timestamp: app.globalData.time,
              ID: this.data.info.buildingAcceptanceId
            })
          }
        })
        .then(res => {
          console.log(res)
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