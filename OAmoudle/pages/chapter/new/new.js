// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addChapter,
  referChapter,
  amendChapter,
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      API_Picurl: [],
      ApplygetNew: false
    },
    show: false,
    totals: [],
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    seach: ''
  },
  formatNum(e) { //正则验证金额输入框格式
    e.detail = e.detail.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')
    e.detail = e.detail.replace(/[\u4e00-\u9fa5]+/g, ""); //清除汉字
    e.detail = e.detail.replace(/[^\d.]/g, ""); //清楚非数字和小数点
    e.detail = e.detail.replace(/^\./g, ""); //验证第一个字符是数字 
    e.detail = e.detail.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //只保留第一个小数点, 清除多余的 
    e.detail = e.detail.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  },
  checknum(e) {
    let info = this.data.info;
    info.usenumber = e.detail.replace(/[^\d]/g, '');
    
    // info.usenumber = e.detail.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
    this.setData({
      info
    })
  },
  checknum1(e) {
    let info = this.data.info;
    this.formatNum(e);
    info.useamount = e.detail;
    this.setData({
      info
    })
  },
  checkmoney(e) {
    let info = this.data.info;
    util.formatmony(e);
    info.useamount = e.detail;
    this.setData({
      info
    })
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  finditem() {
    let arr = util.findone(app.globalData.department, this.data.seach);
    this.setData({
      sections: arr,
      seach: ''
    })
  },
  finditem1() {
    let arr = util.findone(app.globalData.Companytitle, this.data.seach);
    this.setData({
      firms: arr,
      seach: ''
    })
  },
  // 部门
  showPopup_o() {
    this.setData({
      show_o: true,
      seach: ''
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show_o: false,
      departmenttext: e.detail.value.text
    })
  },
  // 公司
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show: false
    })
  },
  // 用章类型
  showPopup_1() {
    this.setData({
      show_1: true
    });
  },
  onClose_1() {
    this.setData({
      show_1: false
    });
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_1: false
    })
  },
  // 用途
  useInfoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 数量
  usenumberblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 金额
  useamountblur(e) {
    e.detail.value = Number(e.detail.value).toFixed(2)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 部门
  showPopup1() {
    this.setData({
      show1: true
    })
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    var s = this.data.section1
    var t = s.filter((y) => {
      return y.show
    })
    console.log(t)
    t = t.map((x) => {
      return x.text
    })
    t = t.join(",")
    let info = util.editInfo(e, this, t);
    this.setData({
      info,
      show1: false,
    })
  },
  onChange(event) {
    var s = this.data.section1
    var y = s.findIndex((r) => {
      return r.value == event.currentTarget.dataset.name
    })
    s[y].show = !s[y].show
    this.setData({
      section1: s
    })
  },

  // 照片
  showPopup_photo() {
    this.setData({
      show_photo: true
    })
  },
  onClose_photo() {
    this.setData({
      show_photo: false
    })
  },
  onSelect_photo(e) {
    if (e.detail.name == "拍照") {
      util.upImage(this, 1);
    } else {
      util.upImage(this, 0);
    }
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },

  confirm() {
    // console.log(this.data.info)
    if (this.data.info.department && this.data.info.Companytitle && this.data.info.usesealtype && this.data.info.useInfo) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addChapter(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('chapter');
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
    util.OAreturn('chapter');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('chapter', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    // console.log(infodata)
    amendChapter(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "usesealform")
        util.OAreturn('chapter', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firms: app.globalData.Companytitle,
      sections: app.globalData.department,
      Usesealtype: app.globalData.Usesealtype
    })
    var w = app.globalData.Usesealtype.map(s => {
      s.show = false
      return s
    })
    this.setData({
      section1: w
    })
    if (options.id) {
      referChapter({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        util.handleData(item, this, app.globalData.department);
        var s = item.usesealtype.split(",")
        var q = this.data.section1.map(k => {
          s.map((w) => {
            if (w == k.text) {
              k.show = true
            }
            return w
          })
          return k
        })
        this.setData({
          info: item,
          section1: q
        })
        let info = this.data.info;
        if (!info.department || !info.Companytitle) {
          util.userdep(user, this);
        }
      })
    }
    let info = this.data.info;
    if (!info.department || !info.Companytitle) {
      util.userdep(user, this);
    }
  },

})