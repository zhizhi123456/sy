// pages/generalcontract/detail/detail.js
import {
  detailProjectPay,
  delProjectPay,
  queryProjectPaysmall,
  qgroupProjectPaysmall
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    material_list: [],
    table: "a",
    small: {
      projectname: "",
      companyname: "",
      createman: "",
      begintime: "",
      endtime: "",

    },
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    chuancan:""
  },
  // 文件
  up_photo() {
    wx.chooseImage({
      count: 9,
      // sourceType:"camera",
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths)
      }
    })
  },
  // 返回
  return () {
    util.OAreturn('ProjectPay')
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/ProjectPay/newlink/newlink?id=" + this.data.info.ID + '&projectname=' + this.data.info.projectname
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.table) {
      this.setData({
        table: options.table
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      section7: app.globalData.Principal,
    })
    // util.readRecord('ProjectPaym', options.id, this,'申领')
    if (options.id) {
      detailProjectPay({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          // let mid = res.Item.formid;
          // if (mid) {
          //   util.workList(this, mid, 'ProjectPaym')
          // }
          //  //处理状态判断
          //  util.checkState(this, mid, 'ProjectPaym', item.CurStepbh);
          // 调取明细表
          queryProjectPaysmall({
            projectname: item.projectname
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              let item = res.List;
              util.listData(item, app.globalData.department);
              this.setData({
                material_list: item.reverse()
              })
            }
          })
        }
      })

    }
  },
  // 工作流流转
  // 退回
  // sendback() {
  //   util.Triggerflow(this, 'return', 'ProjectPaym', 'ProjectPay', '', '', '', '', '', '', 'oa')
  // },
  // // 审核通过
  // putin() {
  //   util.Triggerflow(this, 'next', 'ProjectPaym', 'ProjectPay', '', '', '', '', '', '', 'oa')
  // },
  // 删除
  delete() {
    // console.log(this.data.info)
    util.OAexpurgate(this, delProjectPay, 'ProjectPay')
  },
  // 点击图片放大预览
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  
  meetplaceblur(e) {
    let small = util.editInfosmall(e, this, e.detail.value);
    this.setData({
      small
    })
  },
  // 计划开工时间
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  onClose_time() {
    this.setData({
      show_time: false
    })
  },
  onConfirm_time(e) {
    let small = util.editInfosmall(e, this, util.datefomate(e.detail));
    this.setData({
      small,
      show_time: false
    })
  },
  // 计划完工时间
  showPopup_endtime() {
    this.setData({
      show_endtime: true
    })
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let small = util.editInfosmall(e, this, util.datefomate(e.detail));
    this.setData({
      small,
      show_endtime: false
    })
  },
  showPopup6() {
    this.setData({
      show6: true
    });
  },
  onClose6() {
    this.setData({
      show6: false
    });
  },
  onConfirm6(e) {
    let small = util.editInfosmall(e, this, e.detail.value.value);
    this.setData({
      small,
      show6: false,
      // departmenttext: e.detail.value.text
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    // this.setData({
    //   'small.projectname': this.data.info.projectname
    // })
    console.log(this.data.small)
    util.qgroupsmall(qgroupProjectPaysmall, this)
  },

})