// pages/bill/newlink/newlink.js
import {
  // addBdetail,
  // referBdetail,
  // amendBdetail,
  // Returnadd,
  // Returnup,
  // Returnone
  addbuildingsmall,
  detailbuildingsmall,
  updatebuildingsmall

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
      buildingAcceptanceId: ''
    }],
    billid: 0,
    section2: ["是", "否"],
    show6: false
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/building/detail/detail?id=" + this.data.billid
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
    // console.log(materials)
    if (materials[0].ConstructionunitCheck) {
      materials[0].buildingAcceptanceId = this.data.billid;
      // 对是否进行处理
      materials[0].ConstructionunitCheck = util.whether(materials[0].ConstructionunitCheck)
      this.setData({
        materials
      })
      // console.log(this.data.materials)
      // console.log(materials[0].ConstructionunitCheck)
      // console.log(JSON.stringify(this.data.materials))
      addbuildingsmall({
        Timestamp: app.globalData.time,
        details: JSON.stringify(this.data.materials)
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            // url: "/pages/building/detail/detail?id=" + this.data.billid + "&table=c"
            url: "/pages/building/detail/detail?id=" + this.data.billid + "&table=c"
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

      url: "/pages/building/detaillink/detaillink?detailid=" + this.data.materials[0].ID
      // url: "/pages/building/detail/detail?id=" + this.data.billid
    })
  },
  linkconfirm() {
    let materials = this.data.materials;
    materials[0].ConstructionunitCheck = util.whether(materials[0].ConstructionunitCheck)
    this.setData({
      materials
    })
    // console.log(JSON.stringify(this.data.materials))
    // console.log( this.data.materials[0])
    updatebuildingsmall({
      ID: this.data.materials[0].ID,
      details:JSON.stringify(this.data.materials) 
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/building/detaillink/detaillink?detailid=" + this.data.materials[0].ID
          // url: "/pages/building/detail/detail?id=" + this.data.billid
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
      detailbuildingsmall({
        Timestamp: app.globalData.time,
        ID: options.detailid
      }).then(res => {
        // console.log(res.Item)
        let materials = this.data.materials;
        materials[0] = res.Item;
        materials[0].ConstructionunitCheck = util.whethercontent(materials[0].ConstructionunitCheck)
        this.setData({
          materials
        })
        // this.setData({
        //   billid: res.Item.buildingAcceptanceId,
        // })
        // console.log(this.data.materials);
      })
    }
  },
})