// pages/sceneticket/pact/pact.js
import {
  Role, //角色
  queryticket,
  qgroupticket
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
      ProjectID: "",
      Checkman: "",
      Ranks: "",
      begintime:"",
      endtime:""
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
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    this.setData({
      sections: app.globalData.MainProject,
      section1:app.globalData.states,
      section2: app.globalData.Role,
      section5: app.globalData.Principal,
      section3: app.globalData.costobj,
      section4: app.globalData.costkind,
    })
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
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
   // 部门
   showPopup2() {
    this.setData({
      show2: true
    })
  },
  onClose2() {
    this.setData({
      show2: false
    })
  },
  onConfirm2(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show2: false
    })
  },
  // 费用对象
  showPopup3() {
    this.setData({
      show3: true
    })
  },
  onClose3() {
    this.setData({
      show3: false
    })
  },
  onConfirm3(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show3: false
    })
  },
  // 费用类型
  showPopup4() {
    this.setData({
      show4: true
    })
  },
  onClose4() {
    this.setData({
      show4: false
    })
  },
  onConfirm4(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false
    })
  },
    // 创建人
    showPopup5() {
      this.setData({
        show5: true
      })
    },
    onClose5() {
      this.setData({
        show5: false
      })
    },
    onConfirm5(e) {
      // console.log(e)
      let info = util.editInfo(e, this, e.detail.value.value);
      this.setData({
        info,
        show5: false
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
  //公司名称
  showPopup_o() {
    this.setData({
      show_o: true
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
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
    util.qgroupdeliver(qgroupticket, this)
  },
})