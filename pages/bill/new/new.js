// pages/new/new.js
import {
  addBill,
  getBill,
  addBdetail,
  referBill,
  amendBill
} from "../../../service/getData";
import Toast from 'vant-weapp/dist/toast/toast';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    departmenttext: "请选择",
    info: {
      ApprovalStatusint: "",
      API_Picurl: [],
      applyman: ''
    },
    materials: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_time: false,
    show_add: false,
    sections: [],
    firms: [],
    totals: [],
    designation: []
  },
  // 领料单名称
  getmaterialNameblur(e) {
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
  // 公司抬头
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
  // 总包项目
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
  // 设备材料进场日期
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  onClose_time() {
    this.setData({
      show_time: false
    })
  },
  onConfirm_time(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
    // console.log(this.data.info)
  },
  // 送货地址
  delieveryaddressblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 收货人手机号
  receivemanphoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 采购数量
  purchasenumblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 入库数量
  storeinnumblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 库存数量
  stocksnumblur(e) {
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
    // console.log(e)
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
  // 点击确定新增并跳转
  confirm() {
    if (this.data.info.getmaterialName && this.data.info.department && this.data.info.Companytitle && this.data.info.projectcode && this.data.info.marchintodate && this.data.info.delieveryaddress && this.data.info.receivemanphone && this.data.info.purchasenum && this.data.info.storeinnum && this.data.info.stocksnum) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      let add;
      if (this.data.materials[0]) {
        this.data.materials.forEach(had => {
          if (had.goodscode && had.goodsname && had.quantity) {
            add = true;
          } else {
            Toast({
              message: '请填写明细表必填项',
              mask: true
            });
          }
        })
        if (add) {
          addBill(this.data.info).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              return getBill()
            }
          }).then(res => {
            if (res.code == 10000) {
              let billlist = res.List;
              let id = billlist[billlist.length - 1].ID,
                materials = this.data.materials;
              materials.forEach(value => {
                value.getmaterialid = id;
              })
              this.setData({
                materials
              })
              return addBdetail({
                adate: JSON.stringify(materials)
              })
            }
          }).then(res => {
            if (res.code == 10000) {
              // console.log(res)
              wx.showToast({
                title: '新建成功',
                icon: 'success',
                duration: 3000
              })
              util.returnPrev('bill')
            }
          })
        }
      } else {
        addBill(this.data.info).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.returnPrev('bill')
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
    util.returnPrev('bill')
  },
  // 编辑领料单
  editreturn() {
    util.returnPrev('bill', this)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    wx.showLoading({
      title: "加载中",
    })
    amendBill(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        util.returnPrev('bill', this)
        wx.hideLoading();
      }
    })
  },
  // 获取材料明细输入框中的数据并设置给data
  //商品编号
  showPopup_add() {
    this.setData({
      show_add: true
    })
  },
  onClose_add() {
    this.setData({
      show_add: false
    })
  },
  onConfirm_add(e) {
    console.log(e)
    let materials = util.updateCode(e, this);
    this.setData({
      materials,
      show_add: false
    })
  },
  getUnit(e) {
    let materials = util.updateValue(e, this);
    this.setData({
      materials
    })
  },
  getQuantity(e) {
    let materials = util.updateValue(e, this);
    this.setData({
      materials
    })
  },
  getRecord(e) {
    let materials = util.updateValue(e, this);
    this.setData({
      materials
    })
  },
  // 添加材料明细
  add_more() {
    if (this.data.materials.length > 0) {
      if (this.data.materials[0].goodsname) {
        let add_detail = {
          num: this.data.materials.length + 1,
          goodscode: '',
          goodsname: '',
          specifications: '',
          unit: '',
          quantity: '',
          demo: ""
        };
        let materials = this.data.materials;
        materials.unshift(add_detail);
        this.setData({
          materials
        })
      } else {
        wx.showToast({
          title: '请填写明细表',
          icon: 'none',
          duration: 3000
        })
      }
    } else {
      let add_detail = {
        num: this.data.materials.length + 1,
        goodscode: '',
        goodsname: '',
        specifications: '',
        unit: '',
        quantity: '',
        demo: ""
      };
      let materials = this.data.materials;
      materials.unshift(add_detail);
      this.setData({
        materials
      })
    }

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
    if (options.id) {
      wx.showLoading({
        title: '加载中',
      });
      referBill({
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          wx.hideLoading();
        }
      })

    }
    this.setData({
      sections: app.globalData.department,
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
      designation: app.globalData.detaillink
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