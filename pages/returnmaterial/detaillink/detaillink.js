// pages/bill/detaillink/detaillink.js
import {
  cancelBdetail,
  referBdetail,
  referBill,
  Returnone,
  ReturnMaterialone,
  Returndel
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
    // steps: [{
    //   text: 'root2--新建了材料明细',
    //   desc: '2019年3月29日 13:42'
    // }],
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      // url: "/pages/returnmaterial/detail/detail?id=" + this.data.info.getmaterialid + "&table=c"
      url: "/pages/returnmaterial/detail/detail?table=c&id=" + this.data.info.losematerialid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption = ' + this.data.caption + ' & dep = ' + this.data.dep + ' & deptxt = ' + this.data.deptxt + ' & userid = ' + this.data.userid : "")
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
    Returndel({
      Timestamp: app.globalData.time,
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
          // url: "/pages/returnmaterial/detail/detail?id=" + this.data.info.getmaterialid + "&table=c"
          url: "/pages/returnmaterial/detail/detail?table=c&id=" + this.data.info.losematerialid + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : '')
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.showLoading({
      title: '加载中',
    });
    // console.log(options.detailid)
    if (options.detailid) {
      // 资料详情
      Returnone({
        Timestamp: app.globalData.time,
        ID: options.detailid
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {

          this.setData({
            info: res.Item
          })
          // console.log(this.data.info)
          return ReturnMaterialone({
            Timestamp: app.globalData.time,
            ID: this.data.info.losematerialid
          })
        }
      }).then(res => {
        // console.log(res)
        this.setData({
          bill: res.Item
        })
        wx.hideLoading();
      })
    }
  },

})