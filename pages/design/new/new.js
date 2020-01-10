// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  adddesign,
  detaildesign,
  updatedesign
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      designman:"",
      designtaskname:'',
      descire:'',
      difficulevel:'',
      begindate:'',
      enddate:'',
      taskdays:'',
      ifcomplete:'',
      score:''
    },
    currentDate3: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_nature: false,
    show_time: false,
    show_time1: false,
    nature: [],
    sections: ['未完成','已完成'],
    section1: [],
    show1: false,
    hadMy:0
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工单位
  showPopup1() {
    this.setData({
      show1: true
    })
  },
  onClose1() {
    this.setData({
      show1: false
    })
  },
  onConfirm1(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false
    })
  },
  // 施工单位
  showPopup2() {
    this.setData({
      show: true
    })
  },
  onClose2() {
    this.setData({
      show: false
    })
  },
  onConfirm2(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false
    })
  },
  // 交底日期
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
  // 交底日期
  showPopup_time1() {
    this.setData({
      show_time1: true
    })
  },
  onClose_time1() {
    this.setData({
      show_time1: false
    })
  },
  onConfirm_time1(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time1: false
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.designman&&this.data.info.begindate&&this.data.info.enddate&&this.data.info.ifcomplete) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
 
      info.ifcomplete = util.whether(info.ifcomplete)
     
      this.setData({
        info
      })
      adddesign(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
         this.return()
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
    if (this.data.hadMy) {
      wx.redirectTo({
        url: '/pages/design/pact/pact?hadMy=' + this.data.hadMy
      })
    } else {
      util.returnPrev('design')
    }
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    if (this.data.hadMy) {
      wx.redirectTo({
        url: '/pages/design/detail/detail?hadMy=' + this.data.hadMy+'&id='+this.data.id
      })
    } else {
      util.returnPrev('design', this)
    }
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    info.ifcomplete = util.whether(info.ifcomplete)
    this.setData({
      info
    })
    updatedesign(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
       this.editreturn()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.hadMy) {
      this.setData({
        hadMy: options.hadMy
      })
      // console.log(this.data.hadMy)
    }
    if (options.id) {
      this.setData({
         id:options.id
      })
      detaildesign({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item,this)
        item.ifcomplete = util.whethercontent1(item.ifcomplete)
        this.setData({
          info: item
        })
      })
    }
    var a = app.globalData.Principal
    a = a.map(s=>{
      return s.text
    })
    this.setData({
      section1:a
    })
  },


})