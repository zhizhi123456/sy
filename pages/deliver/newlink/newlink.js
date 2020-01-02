// pages/bill/newlink/newlink.js
import {
  // addBdetail,
  // referBdetail,
  // amendBdetail,
  // Returnadd,
  // Returnup,
  // Returnone
  adddeliversmall,
  detaildeliversmall,
  updatedeliversmall

} from "../../../service/getData";
import Toast from 'vant-weapp/dist/toast/toast';
var util = require("../../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      delievryid: ''
    }],
    billid: 0,
    show1:false,
    section1:""
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/deliver/detail/detail?id=" + this.data.billid
    })


  },
  // 获取材料明细输入框中的数据并设置给data
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
     // 商品编号
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
      // let info = util.editInfo(e, this, e.detail.value);
      var a = util.updateValue(e, this);
      this.setData({
        show1: false,
        materials: a
      })
      var b = app.globalData.Goodsname
      var c = b.findIndex(s => {
        return s.goodscode == e.detail.value
      })
      var d = b[c]
      var i = e.currentTarget.dataset.i;
      let materials = this.data.materials;
      if (i) {
        materials[i].goodsname = d.goodsname;
        materials[i].specifications = d.specifications;
      } else {
        materials[0].specifications = d.specifications;
        materials[0].goodsname = d.goodsname;
      }
      this.setData({
        materials
      })
    },
  // 新增领料单材料明细
  confirm() {
    let materials = this.data.materials;
    materials[0].delievryid = this.data.billid;
    this.setData({
      materials
    })

    console.log(this.data.materials)
    if (materials[0].goodscode && materials[0].goodsname && materials[0].specifications && materials[0].unit && materials[0].quantity && materials[0].demo) {
      adddeliversmall({
        Timestamp: app.globalData.time,
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
            // url: "/pages/deliver/detail/detail?id=" + this.data.billid + "&table=c"
            url: "/pages/deliver/detail/detail?id=" + this.data.billid + "&table=c"
          })
        } else {
          wx.showToast({
            title: '请输入正确信息',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 编辑材料明细时的返回和确定
  linkreturn() {
    // console.log(this.data.billid)
    wx.redirectTo({

      url: "/pages/deliver/detaillink/detaillink?detailid=" + this.data.materials[0].ID
      // url: "/pages/deliver/detail/detail?id=" + this.data.billid
    })
  },
  linkconfirm() {
    // console.log(this.data.billid)
    updatedeliversmall({
      Timestamp: app.globalData.time,
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
          url: "/pages/deliver/detaillink/detaillink?detailid=" + this.data.materials[0].ID
          // url: "/pages/deliver/detail/detail?id=" + this.data.billid
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
    var a = app.globalData.Goodsname
    a = a.map(s => {
      return s.goodscode
    })
    this.setData({
      section1: a
    })
    if (options.detailid) {
      detaildeliversmall({
        Timestamp: app.globalData.time,
        ID: options.detailid
      }).then(res => {
        // console.log(res.Item)
        let materials = this.data.materials;
        materials[0] = res.Item;
        this.setData({
          materials
        })
        // this.setData({
        //   billid: res.Item.delievryid,
        // })
        // console.log(this.data.materials);
      })
    }
  },
})