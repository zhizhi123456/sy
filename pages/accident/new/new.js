// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  Companytitle,
  getSubItems,
  addaccident,
  detailaccident,
  updateaccident
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      projectcode: '',
      sites: "",
      architect: '',
      timeOfAccident: "",
      Constructionunit: '',
      condition: '',
      Companytitle: '',
    },
    currentDate: new Date().getTime(),
    show_nature: false,
    show_time: false,
    show_endtime: false,
    nature: [],
    show: false,
    show2: false,
    show3: false,
    show4: false,
    section1: []
  },
  // 工程编号及名称
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false
    })
  },
  // 双向绑定 处理数据
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 发生事故时间
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
  //设计单位
  showPopup4() {
    this.setData({
      show4: true
    });
  },
  onClose4() {
    this.setData({
      show4: false
    });
  },
  onConfirm4(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show4: false
    })
  },
  //施工单位
  showPopup2() {
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show2: false
    })
  },
  // 填报单位
  showPopup3() {
    this.setData({
      show3: true
    });
  },
  onClose3() {
    this.setData({
      show3: false
    });
  },
  onConfirm3(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show3: false
    })
  },
  confirm() {
    // console.log(this.data.info)
    // console.log(this.data.info.sites)
    // console.log(this.data.info.projectcode!='请选择')
    if (this.data.info.sites && this.data.info.projectcode) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      addaccident(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('accident')
        }
      })
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.returnPrev('accident')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('accident', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updateaccident(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('accident', this)
      }
    })
  },
  qingqiu() {
    Companytitle().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.Value
      })
      // console.log(s)
      this.setData({
        section1: s,
      })
    })
    getSubItems().then(res=>{
      // console.log(res)
      
      var q = res.List
      var s = q.map(t => {
        return t.subprojectname
      })
      // console.log(s)
      this.setData({
        firms: s,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    this.setData({
      nature: app.globalData.nature
    })
    if (options.id) {
      detailaccident({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item,this)
        this.setData({
          info: item
        })
      })
    }
  },
})