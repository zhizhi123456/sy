// pages/detail/detail.js
import {
  ReturnMaterialone,
  ReturnMaterialdel,
  Returnall
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    speak: '',
    show: false,
    info: {},
    active: 0,
    steps: [],
    material_list: [],
    table: "a",
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/returnmaterial/pact/pact"
    })
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  add_speak() {
    this.setData({
      show: true
    })
  },
  onChange(e) {
    this.setData({
      show: false,
      speak: e.detail.value
    })
  },
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
    ReturnMaterialdel({
      Timestamp: app.globalData.time,
      ID: this.data.info.ID
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/returnmaterial/pact/pact"
        })
      }
    })
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/pages/returnmaterial/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      // 资料详情
      ReturnMaterialone({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          item.ifwinbid = util.whethercontent(item.ifwinbid)
          item.ifmaterialinto = util.whethercontent(item.ifmaterialinto)
          item.ifmaterialcomplete = util.whethercontent(item.ifmaterialcomplete)
          item.iftoexam = util.whethercontent(item.iftoexam)
          item.iftocheck = util.whethercontent(item.iftocheck)
          item.ifprocessinfosubmit = util.whethercontent(item.ifprocessinfosubmit)
          item.ifcompleteinfosubmit = util.whethercontent(item.ifcompleteinfosubmit)
          item.ifbindtoproject = util.whethercontent(item.ifbindtoproject)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          if (res.Item.formid) {
            util.workList(this, res.Item.formid)
          }
          util.checkState(this, res.Item.formid, 'losematerial', item.CurStepbh);


        }
      })
      console.log()
      // 领料单关联的明细列表
      Returnall({
        losematerialid: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          this.setData({
            material_list: res.List.reverse()
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
    if (options.table) {
      this.setData({
        table: options.table
      })
    }
  },
  // 工作流流转
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'losematerial', 'returnmaterial')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'losematerial', 'returnmaterial')
  },

})