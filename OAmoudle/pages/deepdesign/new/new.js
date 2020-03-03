// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addDeepdesign,
  referDeepdesign,
  amendDeepdesign,
  getDeepdesign,
  addDeepddetail,
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    show: false,
    currentDate: new Date().getTime(),
    materials: []
  },
  // 项目编号
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
    info.projectname = e.detail.value.value;
    this.setData({
      info,
      show: false
    })
  },
  // 设计材料种类数
  goodskindsblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 设计材料总数量
  goodsqtyblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 材料预估总金额
  goodsamountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.projcectCode && this.data.info.goodskinds && this.data.info.goodsqty && this.data.info.goodsamount) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      if (this.data.materials[0]) {
        addDeepdesign(this.data.info).then(res => {
          if (res.code == 10000) {
            return getDeepdesign()
          }
        }).then(res => {
          if (res.code == 10000) {
            let billlist = res.List;
            let id = billlist[billlist.length - 1].ID,
              materials = this.data.materials;
            materials.forEach(value => {
              value.quantity = parseInt(value.quantity);
              value.purchasecontactId = id;
            })
            this.setData({
              materials
            })
          }
        })
        addDeepddetail({
          adate: JSON.stringify(materials)
        }).then(res => {
          if (res.code == 10000) {
            // console.log(res)
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.OAreturn('deepdesign');
          }
        })
      } else {
        addDeepdesign(this.data.info).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.OAreturn('deepdesign');
          }
        })
      }
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.OAreturn('deepdesign');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('deepdesign', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendDeepdesign(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('deepdesign', this);
      }
    })
  },
  // 获取采购明细输入框中的数据并设置给data
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
  // 添加材料明细
  add_more() {
    let add_detail = {
      num: this.data.materials.length + 1,
      goodscode: '',
      goodsname: '',
      specifications: '',
      unit: '',
      quantity: '',
    };
    let materials = this.data.materials;
    materials.unshift(add_detail);
    this.setData({
      materials
    })
    // 页面滚动到底部
    if (this.data.materials.length < 2) {
      util.pageScrollToBottom();
    }
  },
  // 删除材料明细
  reduce_detail(e) {
    let materials = this.data.materials,
      i = e.currentTarget.dataset.i;
    materials.splice(i, 1);
    materials.forEach((item, index, arr) => {
      if (i > index) {
        item.num = item.num - 1
      };
    });
    this.setData({
      materials
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user = wx.getStorageSync("myInfo");
    this.setData({
      totals: app.globalData.MainProject,
    })
    if (options.id) {
      referDeepdesign({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    user = wx.getStorageSync("myInfo");
  }
})