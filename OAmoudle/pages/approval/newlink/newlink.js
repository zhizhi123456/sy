// pages/bill/newlink/newlink.js
import {
  addapprovalsmall,
  updateapprovalsmall,
  detailapprovalsmall
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
import Toast from 'vant-weapp/dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      payapproveid: '',
      detailxh: '',
      detailcontext: '',
      amount: ''
    }],
    billid: 0,
    show6: false,
    show5: false,
    show4: false,
    show6: false,
    section5: ["红酒", "购物卡", "食品", "烟", "电脑"],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/approval/detail/detail?id=" + this.data.billid + "&table=c"
    })
  },
  getgcode(e) {
    util.updateValue(e, this);
  },
  getgname(e) {
    util.updateValueM(e, this);
  },
  getSize(e) {
    util.updateValue(e, this);
  },
  getUnit(e) {
    util.updateValue(e, this);
  },
  getQuantity(e) {
    util.updateValue(e, this);
  },
  getRecord(e) {
    util.updateValue(e, this);
  },
  // 采购合同编号
  purchasecontactCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 数字筛选
  checknum(e) {
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i
    let materials = this.data.materials;
    util.formatNum(e);
    if (i) {
      materials[i][name] = e.detail;
    } else {
      materials[0][name] = e.detail;
    }
    this.setData({
      materials
    })
  },
  // 数字筛选
  checknum1(e) {
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i
    let materials = this.data.materials;
    if (i) {
      materials[i][name] = e.detail.replace(/[^\d]/g, '');
      // materials[i][name] = Number(e.detail).toFixed(2);
    } else {
      materials[0][name] = e.detail.replace(/[^\d]/g, '');
      // materials[0][name] = Number(e.detail).toFixed(2);
    }
    this.setData({
      materials
    })
  },
  // 负责人
  showPopup6() {
    this.setData({
      show6: true
    });
  },
  onClose6() {
    this.setData({
      show6: false
    });
  },
  onConfirm6(e) {
    let materials = util.updateValue(e, this);
    // console.log(materials)
    this.setData({
      materials,
      show6: false
    })
  },
  // 合同（项目）编号
  showPopupCode() {
    this.setData({
      showCode: true
    });
  },
  onCloseCode() {
    this.setData({
      showCode: false
    });
  },
  onConfirmCode(e) {
    let materials = util.updateCode1(e, this);
    // console.log(materials)
    this.setData({
      materials,
      showCode: false,
    })
  },
  // 新增领料单材料明细
  confirm() {
    let materials = this.data.materials;
    materials[0].payapproveid = this.data.billid;
    for (let k of materials) {
      for (let i in k) {
        if (k[i] == '请选择') {
          k[i] = ""
        }
      }
    }
    if (!(materials[0].detailxh != '' && materials[0].detailcontext && materials[0].amount != '')) {
      Toast({
        message: '请填写明细表必填项',
        mask: true
      });
    } else {
      // console.log(this.data.billid)
      materials[0].payapproveid = this.data.billid;
      this.setData({
        materials
      })
      // console.log(this.data.materials)
      addapprovalsmall({
        adate: JSON.stringify(this.data.materials)
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: "/OAmoudle/pages/approval/detail/detail?id=" + this.data.billid + "&table=c"
          })
        } else {
          wx.showToast({
            title: '请输入正确信息',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }

  },
  // 编辑材料明细时的返回和确定
  linkreturn() {
    wx.redirectTo({
      url: "/OAmoudle/pages/approval/detaillink/detaillink?detailid=" + this.data.materials[0].ID
    })
  },
  linkconfirm() {
    // console.log(this.data.materials)
    let materials = this.data.materials;
    for (let k of materials) {
      for (let i in k) {
        if (k[i] == '请选择') {
          k[i] = ""
        }
      }
    }
    updateapprovalsmall({
      ID: this.data.materials[0].ID,
      uptdate: JSON.stringify(this.data.materials)
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/OAmoudle/pages/approval/detaillink/detaillink?detailid=" + this.data.materials[0].ID
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      section4: app.globalData.MainProject1,
    })
    // 领料单id
    if (options.id) {
      this.setData({
        billid: options.id,
      })
    }
    // 明细表id
    if (options.detailid) {
      detailapprovalsmall({
        ID: options.detailid
      }).then(res => {
        // console.log(res.Item)
        let materials = this.data.materials;
        materials[0] = res.Item;
        this.setData({
          materials
        })
        // console.log(this.data.materials);
      })
    }
  },


})