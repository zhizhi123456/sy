// pages/new/new.js
var util = require("../../../utils/util");
import {
  adddeliver,
  detaildeliver,
  updatedeliver,
  adddeliversmall,
  MainProject,
  querydeliver
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
      Company: "",
      delievrycode: "",
      projectcode: "",
      delieveryaddress: "",
      receivemanphone: "",
      API_Picurl: [],
      createman: "",
      createtime: "",
      updateman: "",
      updatetime: "",
      remark: ""
    },
    materials: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_time: false,
    show_time1: false,
    sections: [],
    firms: [],
    totals: [],
    upimg: false,
    show1: false,
  },
  //项目或合同编号
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false
    })
  },
  // 创建时间
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
  // 设备材料进场日期
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
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time1: false
    })
    // console.log(this.data.info)
  },
  //
  receivemanphoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 照片
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
    util.upImage(this);
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  // 点击确定新增并跳转
  confirm() {
    let info = this.data.info;
    console.log(info)
    // 判断是否填了有必选项 
    if (info.delievrycode && info.Company) {
    
      if (this.data.materials[0]) {
        var materials = this.data.materials;
        this.setData({
          materials
        })
        for (let i in materials) {
          if (info[i] == "请选择") {
            info[i] = ""
          }
        }
        if (materials[0].goodscode && materials[0].goodsname&& materials[0].specifications && materials[0].unit && materials[0].quantity && materials[0].demo) {
          // 新增退料单
          util.checkContent(info, this);

          this.setData({
            info
          })
          let infodata = {
            Timestamp: app.globalData.time,
            ...this.data.info
          }
          adddeliver(infodata).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              return querydeliver({
                Timestamp: app.globalData.time
              })
            }
          }).then(res => {
            if (res.code == 10000) {
              let billlist = res.List;
              // console.log(res)
              // console.log(billlist.length)
              // console.log(billlist[billlist.length - 1].ID)
              let id = billlist[billlist.length - 1].ID,
                materials = this.data.materials;
              materials.forEach(value => {
                value.quantity = parseInt(value.quantity);
                value.delievryid = id;
              })

              this.setData({
                materials
              })
              // console.log(JSON.stringify(materials))
              // 新增详细表
              for (let i in materials) {
                if (info[i] == "请选择") {
                  info[i] = ""
                }
              }
              return adddeliversmall({
                Timestamp: app.globalData.time,
                adate: JSON.stringify(materials)
              })
            }
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              wx.showToast({
                title: '新建成功',
                icon: 'success',
                duration: 3000
              })
              wx.redirectTo({
                url: '/pages/deliver/pact/pact'
              })
            }
          })
        } else {
          Toast({
            message: '请填写明细表必填项',
            mask: true
          });
        }
      } else {
        // 没有详细表的情况下
        console.log(infodata)
        // 新增退料单
        util.checkContent(info, this);
          
        this.setData({
          info
        })
        let infodata = {
          Timestamp: app.globalData.time,
          ...this.data.info
        }
        adddeliver(infodata).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            wx.redirectTo({
              url: '/pages/deliver/pact/pact'
            })
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
    wx.redirectTo({
      url: "/pages/deliver/pact/pact"
    })
  },
  // 编辑领料单
  editreturn() {
    wx.redirectTo({
      url: "/pages/deliver/detail/detail?id=" + this.data.info.ID
    })
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this);
    for (let k in info) {
      if (info[k] == "请选择") {
        info[k] = ""
      }
    }
    if (typeof info.department == 'string' && info.department) {
      app.globalData.department.forEach(depart => {
        if (info.department == depart.text) {
          info.department = depart.value
        }
      })
    }
    this.setData({
      info
    })
    let infodata = {
      Timestamp: app.globalData.time,
      ...this.data.info
    }
    wx.showLoading({
      title: "加载中",
    })
    // console.log(infodata)
    updatedeliver(infodata).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.redirectTo({
          url: "/pages/deliver/detail/detail?id=" + this.data.info.ID
        })
        wx.hideLoading();
      }
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
  // 添加材料明细
  add_more() {
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
  // 基础材料
  qingqiu() {
    MainProject().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.projcectCode
      })
      this.setData({
        sections: s,
      })
      // console.log(this.data.section1)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = app.globalData.Goodsname
    a = a.map(s => {
      return s.goodscode
    })
    this.setData({
      section1: a
    })
    this.qingqiu()
    if (options.id) {
      wx.showLoading({
        title: '加载中',
      });
      detaildeliver({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          for (let i in item) {
            if (item[i] == null || item[i] == "null" || !item[i]) {
              item[i] = "";
            }
          }
          app.globalData.department.forEach(depart => {
            if (item.department == depart.value) {
              this.setData({
                departmenttext: depart.text
              })
            }
          })
          if (item.API_Picurl) {

            item.API_Picurl = item.API_Picurl.split(",");
            this.setData({
              upimg: true
            })
            console.log(item.API_Picurl)
          } else {
            // data.API_Picurl = []
          }
          this.setData({
            info: item
          })
          wx.hideLoading();
        }
      })

    }
    this.setData({
      firms: app.globalData.Customer,
      totals: app.globalData.MainProject,
    })
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
})