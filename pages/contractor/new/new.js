// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addcontractor,
  detailcontractor,
  updatecontractor,
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      Address: '',
      Companytitle: '',
      ConstructionName: "",
      chiefcontactman: '',
      contactway: '',
      intro: '',
      ProjectManager:''
    },
    show_nature1: false,
    section2:[],
    show3:false,
    section2:"",
    section3:''
  },
  projectcodelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  
   // 分包项目属性
   showPopup1() {
    this.setData({
      show_nature1: true
    })
  },
  onClose1() {
    this.setData({
      show_nature1: false
    })
  },
  onConfirm1(e) {
    // console.log(e)
    let info = util.editInfo(e, this, e.detail.value);

    this.setData({
      info,
      show_nature1: false
    })
  },
   // 项目经理
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show3: false
    })
  },
  confirm() {
    console.log(this.data.info)
    if (this.data.info.Companytitle) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      addcontractor(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('contractor')
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
    util.returnPrev('contractor')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('contractor',this)
  },
  editconfirm() {
   
    let info = this.data.info;
    util.checkChange(info, this,app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updatecontractor(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('contractor',this)
      }
    })
  },
  qingqiu(){
  
      var s = app.globalData.Companytitle.map(t => {
        return t.text
      })
      this.setData({
        section2: s
      })
      var a = app.globalData.staff.map(q=>{
        return q.text
      })
      this.setData({
        section3: a
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      detailcontractor({
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