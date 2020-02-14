// pages/generalcontract/detail/detail.js
import {
  Companytitle,
  projectdel,
  projectone,
  selectCost,
  Ifmakecontactlist,

} from '../../../service/getData.js';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    active: 0,
    steps: [],
    InfoList: [],
    tab: "a",
    section1: ''
  },
  // // 文件
  // up_photo() {
  //   wx.chooseImage({
  //     count: 9,
  //     // sourceType:"camera",
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths;
  //       // console.log(tempFilePaths)
  //     }
  //   })
  // },
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/contractproject/pact/pact"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    // console.log(options.id)
    if (options.tab) {
      this.setData({
        tab: options.tab
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      projectone({
        ID: options.id,
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          // item.ifwinbid = util.whethercontent(item.ifwinbid)
          item.ifmaterialinto = util.whethercontent(item.ifmaterialinto)
          item.ifmaterialcomplete = util.whethercontent(item.ifmaterialcomplete)
          item.iftoexam = util.whethercontent(item.iftoexam)
          item.iftocheck = util.whethercontent(item.iftocheck)
          item.ifprocessinfosubmit = util.whethercontent(item.ifprocessinfosubmit)
          item.ifcompleteinfosubmit = util.whethercontent(item.ifcompleteinfosubmit)
          item.ifbindtoproject = util.whethercontent(item.ifbindtoproject)
          // console.log(item.Ifmakecontact)
          util.outflow(item,this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // console.log(item.projcectCode)
          selectCost({
            mainprojcectCode: item.projcectCode
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              let item = res.List;
              util.listData(item, app.globalData.department)
              this.setData({
                InfoList: item
              })
            }
          })
          if (res.Item.formid) {
            util.workList(this, res.Item.formid, 'project')
          }
          util.checkState(this, res.Item.formid, 'project', item.CurStepbh);
        }
      })
    }
  },
  // 工作流流转
  // 退回上步

  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'project', 'contractproject')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'project', 'contractproject')
  },
  // 删除
  delete() {
    util.expurgate(this,  projectdel, 'contractproject')
  },

})