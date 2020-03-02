// pages/bill/newlink/newlink.js
import {
  addProjectPaysmall,
  updateProjectPaysmall,
  detailProjectPaysmall
} from "../../../../service/getData";
import Toast from 'vant-weapp/dist/toast/toast';
var util = require("../../../../utils/util");
var app = getApp();
var userinfo = wx.getStorageSync("myInfo");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      projcectCode: '',
      projectname: '',
      trsferAcoutCharge: '',
      companyname: '',
      trsferAcoutDate: '',
      billno: '',
      createman: userinfo.UserName,
      createtime: util.format(new Date()),
      begintime: util.format(new Date()),
      endtime: util.format(new Date())
    }],
    billid: 0,
    show6: false,
    show5: false,
    show4: false,
    show6: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_time1: false,
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/ProjectPay/detail/detail?id=" + this.data.billid + "&table=c"
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
  // 计划开工时间
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
    console.log(e)
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i
    let materials = this.data.materials;
    if (i) {
      materials[i][name] = util.datefomate(e.detail);
    } else {
      materials[0][name] = util.datefomate(e.detail);
    }
    // console.log(name)
    // console.log(i)
    // console.log(materials)
    // console.log(e.detail)
    // console.log(util.datefomate(e.detail))
    this.setData({
      materials,
      show_time1: false
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
    console.log(e)
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i
    let materials = this.data.materials;
    if (i) {
      materials[i][name] = e.detail.value.text;
    } else {
      materials[0][name] = e.detail.value.text;
    }
    this.setData({
      materials,
      show6: false
    })
  },

  // 新增领料单材料明细
  confirm() {
    let materials = this.data.materials;
    for (let k of materials) {
      for (let i in k) {
        if (k[i] == '请选择') {
          k[i] = ""
        }
      }
    }
    if (!(materials[0].projcectCode && materials[0].projectname && materials[0].trsferAcoutCharge &&
        materials[0].companyname && materials[0].trsferAcoutDate && materials[0].billno)) {
      Toast({
        message: '请填写明细表必填项',
        mask: true
      });
    } else {
      // console.log(this.data.billid
      this.setData({
        materials
      })
      console.log(this.data.materials)
      console.log(JSON.stringify(this.data.materials))
      addProjectPaysmall(
        this.data.materials[0]
      ).then(res => {
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: "/OAmoudle/pages/ProjectPay/detail/detail?id=" + this.data.billid + "&table=c"
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
      url: "/OAmoudle/pages/ProjectPay/detaillink/detaillink?detailid=" + this.data.materials[0].ID
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
    console.log({
      ID: this.data.materials[0].ID,
      uptdate: JSON.stringify(this.data.materials)
    })
    updateProjectPaysmall(this.data.materials[0]).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/OAmoudle/pages/ProjectPay/detaillink/detaillink?detailid=" + this.data.materials[0].ID
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 领料单id
    console.log(options)
    var materials = this.data.materials
    if (options.id) {
      materials[0].projectname = options.projectname
      this.setData({
        billid: options.id,
        materials
      })
    }
    this.setData({
      section5: app.globalData.MainProject
    })
    // 明细表id
    if (options.detailid) {
      detailProjectPaysmall({
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