// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addrole,
  detailrole,
  updaterole,
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      UserName: '',
      Password: '',
      Email: "",
      MobilePIN:'',
      PasswordQuestion: '',
      PasswordAnswer: '',
      IslockedOut: '',
      Memo: '',
      EmpCode: '',
      ReportViewPermissions:'',
      FCD:''
    },
    show_nature: false,
    nature: [],
    currentDate: new Date().getTime()
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司名称
  showPopup_4() {
    this.setData({
      show_nature: true
    })
  },
  onClose_4() {
    this.setData({
      show_nature: false
    })
  },
  onConfirm_4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_nature: false
    })
  },
  
  confirm() {
    if (this.data.info.UserName && this.data.info.Password &&
      this.data.info.IslockedOut!=='') {
      let info = this.data.info;
      info.FCD = util.format(new Date())
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addrole(this.data.info).then(res => {
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('role')
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
    util.OAreturn('role')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.OAreturn('role', this)
  },
  editconfirm() {
    let info = this.data.info;
    info.LUD = util.format(new Date())
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updaterole(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        // util.ModifyRecorduser(this.data.information, "User")
        util.OAreturn('role', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nature: app.globalData.YesOrNo
    })
    if (options.id) {
      detailrole({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        item.Password=''
        // var data1 = res.Item
        // var b = JSON.stringify(data1)
        // var c = JSON.parse(b)
        // this.setData({
        //   information: c
        // })
        util.handleData(item, this, app.globalData.department);
        // util.outflow(item, this)
        //  对多选的处理
        this.setData({
          info: item
        })
      })
    }



  },


})