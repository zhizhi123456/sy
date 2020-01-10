// pages/bill/newlink/newlink.js
import {
  addapplyForsmall,
  updateapplyForsmall,
  detailapplyForsmall
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      applyid: '',
      chargeman: '',
      buyitemname: '',
      specifications: '',
      brand: '',
      unit: '',
      quantity: '',
      demo: ''
    }],
    billid: 0,
    show6: false,
    show5: false,
    show4: false,
    show6:false,
    section5: ["红酒","购物卡","食品","烟","电脑"],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/applyFor/detail/detail?id=" + this.data.billid + "&table=c"
    })
  },
  getgcode(e) {
    util.updateValue(e, this);
  },
  getgname(e) {
    util.updateValue(e, this);
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

  // 新增领料单材料明细
  confirm() {
    let materials = this.data.materials;
    materials[0].applyid = this.data.billid;
    for (let k of materials) {
      for (let i in k) {
        if (k[i] == '请选择') {
          k[i] = ""
        }
      }
    }
    if (!( materials[0].type && materials[0].quantity && materials[0].unitprice &&
      materials[0].detailname)) {
      Toast({
        message: '请填写明细表必填项',
        mask: true
      });
    } else {
      // console.log(this.data.billid)
      materials[0].applyid = this.data.billid;
      this.setData({
        materials
      })
      // console.log(this.data.materials)
      addapplyForsmall({
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
            url: "/pages/applyFor/detail/detail?id=" + this.data.billid + "&table=c"
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
      url: "/pages/applyFor/detaillink/detaillink?detailid=" + this.data.materials[0].ID
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
    updateapplyForsmall({
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
          url: "/pages/applyFor/detaillink/detaillink?detailid=" + this.data.materials[0].ID
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 领料单id
    if (options.id) {
      this.setData({
        billid: options.id,
      })
    }
    // 明细表id
    if (options.detailid) {
      detailapplyForsmall({
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