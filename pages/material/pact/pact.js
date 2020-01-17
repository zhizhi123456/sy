// pages/generalcontract/pact/pact.js
import {
  querymaterial,
  qgroupmaterial
} from '../../../service/getData.js';
import Toast from 'vant-weapp/dist/toast/toast';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    pact: [{
        text: '全部仓库材料',
        value: 0
      },
      {
        text: '我的仓库材料',
        value: 1
      }
    ],
    InfoList: [],
    info: {
      goodsname: "",
      goodsclasscode: "",
      createtime:"请选择",
      updatetime:"请选择",
    },
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time:false,
    show_endtime:false,
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
  // 返回
  return () {
    util.returnMenu2(1006,'材料管理');
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    // console.log("5")
    wx.showLoading({
      title: '加载中',
    });
    console.log()
    querymaterial({
      goodsname: this.data.seach
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })
  },
    // 组合查询关闭与开启
    change() {
      this.setData({
        pull: true,
        show: true
      })
    },
    onClose() {
      this.setData({
        show: false
      });
    },
  // 组合查询
  seachqur() {
    util.qgroupdeliver(qgroupmaterial,this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    querymaterial().then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },
})