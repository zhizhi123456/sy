// pages/detail/detail.js
import {
  detailbuilding,
  querybuildingsmall,
  delbuilding,
  qgroupbuilding,
  qgroupbuildingsmall
} from '../../../service/getData';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Workstate: "",
    isnext: true,
    edit: false,
    speak: '',
    show: false,
    info: {},
    active: 0,
    steps: [],
    material_list: [],
    table: "a",
    small: {
      buildingAcceptanceId: "",
      goodscode: "",
      goodsname: "",
      specifications: "",
      unit: "",
      quantity: "",
      demo: "",
      createtime: "请选择",
      updatetime: "请选择",
    },
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },

  // 返回
  return () {
    util.returnPrev('building')
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
    delbuilding({
      ID: this.data.info.ID
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/building/pact/pact"
        })
      }
    })
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/pages/building/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    //只能查询当前页面的 材料
    this.setData({
      'small.buildingAcceptanceId': options.id
    })
    if (options.id) {
      // console.log(options.id)
      // 资料详情options.id
      detailbuilding({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          util.outflow(item,this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          if (res.Item.formid) {
            util.workList(this, res.Item.formid)
            util.checkState(this, res.Item.formid, 'project', item.CurStepbh);
          }

        }
      })
      // console.log()
      // 领料单关联的明细列表
      querybuildingsmall({
        Timestamp: app.globalData.time,
        buildingAcceptanceId: options.id
      }).then(res => {
        // console.log(res)
        let item = res.List;
        util.listData(item, app.globalData.department);
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
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'buildingAcceptance', 'building')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'buildingAcceptance', 'building')
  },
  // 组合查询
  meetplaceblur(e) {
    let small = util.editInfo(e, this, e.detail.value);
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
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
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
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  change() {
    this.setData({
      pull: true,
      show: false,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    util.qgroupsmall(qgroupbuildingsmall, this)
  },
})