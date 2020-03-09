// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addPayment,
  referPayment,
  amendPayment
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
    },
    show: false,
    firms: [],
    totals: [],
    currentDate: new Date().getTime(),
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
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
    this.formatNum(e);
    info.payammount = e.detail;
    this.setData({
      info
    })
  },
  checknum1(e) {
    let info = this.data.info;
    this.formatNum(e);
    info.havepaidammount = e.detail;
    this.setData({
      info
    })
  },
  // 签报名称
  payapproveformnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 部门
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
  // 付款方式
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
  // 付款金额
  payammountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 总包项目
  showPopup_2() {
    this.setData({
      show_2: true
    });
  },
  onClose_2() {
    this.setData({
      show_2: false
    });
  },
  onConfirm_2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_2: false
    })
  },
  // 项目类型
  showPopup_3() {
    this.setData({
      show_3: true
    });
  },
  onClose_3() {
    this.setData({
      show_3: false
    });
  },
  onConfirm_3(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_3: false
    })
  },
  // 总包合同
  showPopup_4() {
    this.setData({
      show_4: true
    });
  },
  onClose_4() {
    this.setData({
      show_4: false
    });
  },
  onConfirm_4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_4: false
    })
  },
  // 分包合同
  showPopup_5() {
    this.setData({
      show_5: true
    });
  },
  onClose_5() {
    this.setData({
      show_5: false
    });
  },
  onConfirm_5(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_5: false
    })
  },
  // 分包编号
  showPopup_6() {
    this.setData({
      show_6: true
    });
  },
  onClose_6() {
    this.setData({
      show_6: false
    });
  },
  onConfirm_6(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_6: false
    })
  },
  // 采购合同
  showPopup_7() {
    this.setData({
      show_7: true
    });
  },
  onClose_7() {
    this.setData({
      show_7: false
    });
  },
  onConfirm_7(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_7: false
    })
  },
  // 供应商
  showPopup_8() {
    this.setData({
      show_8: true
    });
  },
  onClose_8() {
    this.setData({
      show_8: false
    });
  },
  onConfirm_8(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_8: false
    })
  },
  // 已支付金额
  havepaidammountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 付款说明
  payamtexplainblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 备注
  remarkblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
    if (this.data.info.payapproveformname && this.data.info.department && this.data.info.Companytitle && this.data.info.paytype && this.data.info.payammount && this.data.info.mainprojectcode && this.data.info.projecttype && this.data.info.maincontactcode && this.data.info.subprojectcode && this.data.info.subcontactcode && this.data.info.purchasecontactcode && this.data.info.suppliercode && this.data.info.havepaidammount && this.data.info.payamtexplain) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addPayment(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('payment');
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
    util.OAreturn('payment');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('payment', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendPayment(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('payment', this);
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
      ItemType: app.globalData.ItemType,
      PayType: app.globalData.PayType,
      MainProject: app.globalData.MainProject,
      MaincontactAll: app.globalData.MaincontactAll,
      Subcontact: app.globalData.Subcontact,
      Purchasecontact: app.globalData.Purchasecontact,
      Supplier: app.globalData.Supplier,
      MainSubproject: app.globalData.MainSubproject,
      userdep: app.globalData.userdep
    })
    if (options.id) {
      referPayment({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
        user = wx.getStorageSync("myInfo");
        let info = this.data.info;
        if (!info.department || !info.Companytitle) {
          util.userdep(user, this);
        }
      })
    }
     user = wx.getStorageSync("myInfo");
        let info = this.data.info;
        if (!info.department || !info.Companytitle) {
          util.userdep(user, this);
        }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    user = wx.getStorageSync("myInfo");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})