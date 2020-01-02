// pages/sceneticket/pact/pact.js
import {
  Role, //角色
  queryticket,
  qgroupdeliver
} from '../../../service/getData.js';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    pact: [{
        text: '全部现场罚单',
        value: 0
      },
      {
        text: '我的现场罚单',
        value: 1
      }
    ],
    InfoList: [],
    info: {
      Company: "",
      delievrycode: "",
      projectcode: "",
      delieveryaddress: "",
      goodsclasscode: "",
      receivemanphone: "",
      remark: "",
      createtime: "请选择",
      updatetime: "请选择",
    },
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },
  // 返回
  return () {
    util.returnMenu2(1007,"施工现场");
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    queryticket({
      Timestamp: app.globalData.time,
      ProjectID: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);

        // 对职位职称的处理 传过来是key 要获取 value

        Role().then(res1 => {
          var ress = JSON.parse(res1)
          item.forEach(value => {
            ress.forEach((m) => {
              if (value.Ranks == m.Key) {
                //  console.log(m.Value)
                value.Ranks = m.Value
                // console.log( value.Ranks)
              }
            })
          })
          // 回调函数 请求完毕后赋值
          this.setData({
            InfoList: item.reverse()
          })
          wx.hideLoading();
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    this.setData({
      seach: ""
    })
    this.seachInfo()
  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  // 组合查询关闭与开启
  change() {
    this.setData({
      pull: true,
      show: false
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    util.qgroupdeliver(qgroupdeliver, this)
  },
})