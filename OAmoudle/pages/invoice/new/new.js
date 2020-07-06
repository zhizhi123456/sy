// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addInvoice,
  referInvoice,
  amendInvoice,
  Customer,
  addcustomer,
  customerRepeat
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      API_Picurl: [],
      contactid: '1',
      projectid: '2',
      projectaddress: '3',
      invoicename: '1'
    },
    show: false,
    firms: [],
    totals: [],
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    seach: ''
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
    let arr = util.findone(app.globalData.Invoicetype, this.data.seach);
    this.setData({
      Invoicetype: arr,
      seach: ''
    })
  },
  finditem2() {
    let arr = util.findone(app.globalData.Invoicefeerate, this.data.seach);
    this.setData({
      Invoicefeerate: arr,
      seach: ''
    })
  },
  finditem3() {
    let arr = util.findone(app.globalData.billing, this.data.seach);
    this.setData({
      billing: arr,
      seach: ''
    })
  },
  finditem4() {
    let arr = util.findone(app.globalData.Customer, this.data.seach);
    this.setData({
      Customer: arr,
      seach: ''
    })
  },
  finditem5() {
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
  // 发票名称
  invoicenameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 数字筛选
  checknum(e) {
    
    let info = this.data.info;
    util.formatNum(e);
    info.includetaxamont = e.detail;
    this.setData({
      info
    })
  },
  checkmoney(e) {
    let info = this.data.info;
    util.formatmony(e);
    info.includetaxamont = e.detail;
    this.setData({
      info
    })
  },
  // 合同
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
  // 项目
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
  // 项目地址
  projectaddressblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 开票类别
  showPopup_3() {
    this.setData({
      show_3: true,
      seach: ''
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
  // 票率
  showPopup_4() {
    this.setData({
      show_4: true,
      seach: ''
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
  // 发票内容
  invoicecontextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 开票信息
  showPopup_5() {
    this.setData({
      show_5: true,
      seach: ''
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
  // 对方公司
  showPopupD() {
    this.setData({
      showD: true,
      seach: ''
    });
  },
  onCloseD() {
    this.setData({
      showD: false
    });
  },
  onConfirmD(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      showD: false
    })
  },
  // 含税金额
  includetaxamontblur(e) {
    e.detail.value = Number(e.detail.value).toFixed(2)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      'info.Chinesenumerals': util.Uppercase(e.detail.value)
    })
  },
  // 大写金额
  Chinesenumeralsblur(e) {
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
    if (this.data.info.department && this.data.info.Companytitle && this.data.info.invoicename && this.data.info.contactid && this.data.info.projectid && this.data.info.projectaddress && this.data.info.invoicetype && this.data.info.invoicefeerate && this.data.info.invoicecontext) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addInvoice(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('invoice');
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
    util.OAreturn('invoice');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('invoice', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    // console.log(infodata)
    amendInvoice(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "invoice")
        util.OAreturn('invoice', this);
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
      Invoicetype: app.globalData.Invoicetype,
      MaincontactAll: app.globalData.MaincontactAll,
      MainProject: app.globalData.MainProject,
      Invoicefeerate: app.globalData.Invoicefeerate,
      billing: app.globalData.billing,
      Customer: app.globalData.Customer
    })
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(message)
      let info = this.data.info;
      info.department = message.department
      info.Companytitle = message.Companytitletext
      this.setData({
        info,
        departmenttext: message.departmenttext
      })
    }
    if (options.id) {
      referInvoice({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },
  onClosechoice() {
    this.setData({
      showchoice: false
    })
  },
  Dictionaryblur(e) {
    this.setData({
      customername: e.detail
    })
  },
  confirmchoice() {
    var data = {
      customername: this.data.customername,
    }
    customerRepeat(data).then(res => {
      if (res.code == 10000) {
        if (res.value) {
          addcustomer(data).then(res => {
            if (res.code == 10000) {
              Customer().then(res => {
                console.log(res)
                let result = util.getBase(res, 'customername', 'ID');
                this.setData({
                  Customer: result
                })
                app.globalData.Customer = result;
              })
              this.setData({
                showchoice: false,
              })
            }
          })
        } else {
          wx.showToast({
            title: '受票公司已存在',
            icon: 'none',
            duration: 3000
          })
          this.setData({
            customername: ''
          })
        }
      }
    })

  },
  newDictionary() {
    this.setData({
      showchoice: true
    })
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