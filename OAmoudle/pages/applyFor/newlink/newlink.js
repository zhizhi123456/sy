// pages/bill/newlink/newlink.js
import {
  addapplyForsmall,
  updateapplyForsmall,
  detailapplyForsmall,
  addDictionary,
  applytype,
  UnitType,
  queryapplyForsmall,
  detailapplyFor,
  delapplyFor,
  updateapplyFor,
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
      applyid: '',
      type: '',
      detailname: '',
      unitType: '',
      quantity: '',
      unitprice: '0',

    }],
    billid: 0,
    show6: false,
    show5: false,
    show4: false,
    show6: false,
    section5: '',
    showchoice: false,
    applyfortype: '',
    seach1: '',
  },
  setSeach1(e) {
    this.setData({
      seach1: e.detail.value
    })
  },
  finditem1() {
    let arr = util.findone(app.globalData.applytype, this.data.seach1);
    this.setData({
      section5: arr,
      seach: ''
    })
  },
  setSeach2(e) {
    this.setData({
      seach2: e.detail.value
    })
  },
  finditem2() {
    let arr = util.findone(app.globalData.UnitType, this.data.seach2);
    this.setData({
      section7: arr,
      seach2: ''
    })
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/applyFor/detail/detail?id=" + this.data.billid + "&table=c"
    })
  },
  getgcode(e) {
    util.updateValue(e, this);
  },
  getgname(e) {
    util.updateValue(e, this);
    console.log(this.data.billid)
    if (!this.data.materials[0].ID) {
      this.repetition(e)
    }
  },
  getmoney(e) {
    console.log(e)
    e.detail.value = Number(e.detail.value).toFixed(2)
    var materials = util.updateValue(e, this);
    this.setData({
      materials
    })
    if (!this.data.materials[0].ID) {
      this.repetition(e)
    }
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
  checkmoney1(e) {
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i
    let materials = this.data.materials;
    util.formatmony(e);
    if (i) {
      materials[i][name] = e.detail;
    } else {
      materials[0][name] = e.detail;
    }
    this.setData({
      materials
    })
  },
  repetition(e) {
    let materials = this.data.materials;
    queryapplyForsmall({
      applyid: this.data.billid
    }).then(res => {
      if (res.code == 10000) {
        let item = res.List;
        util.outflowsmalllist(item)
        let mater = item;
        var ifhave = ''
        ifhave = mater.some((s) => {

          return (s.type == materials[0].type) && (s.detailname == materials[0].detailname)


        })
        if (ifhave) {
          wx.showToast({
            title: "已经添加过此项!",
            icon: 'none',
            duration: 3000
          })
        }
      }
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
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i;
    let materials = this.data.materials;
    // console.log(name, i, materials)
    if (i) {
      materials[i][name] = e.detail.value.text;
    } else {
      materials[0][name] = e.detail.value.text;
    }
    this.setData({
      materials,
      show6: false
    })
    if (!this.data.materials[0].ID) {
      this.repetition(e)
    }
  },
  onClosechoice() {
    this.setData({
      showchoice: false
    })
  },
  Dictionaryblur(e) {
    this.setData({
      applyfortype: e.detail
    })
  },
  confirmchoice() {
    var num = Math.round(app.globalData.applytype.length) + 1
    var ifhave = app.globalData.applytype.some(s => {
      console.log(s.text)
      console.log(this.data.applyfortype)
      console.log(s.text == this.data.applyfortype)
      return s.text == this.data.applyfortype
    })
    if (ifhave) {
      wx.showToast({
        title: '已存在相同信息',
        icon: 'none',
        duration: 3000
      })
    } else {
      var data = {
        Key: "applyforminfoType" + num,
        Value: this.data.applyfortype,
        ParentId: '2070'
      }
      addDictionary(data).then(res => {
        if (res.code == 10000) {
          applytype().then(res => {
            let applytype = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
            app.globalData.applytype = applytype;
            console.log(app.globalData.applytype)
            this.setData({
              section5: applytype,
              showchoice: false,
              applyfortype: ''
            })
          })
        }
      })
    }

  },
  newDictionary() {
    this.setData({
      showchoice: true
    })
  },
  newDictionary2() {
    this.setData({
      showchoice2: true
    })
  },
  // 负责人
  showPopup7() {
    this.setData({
      show7: true
    });
  },
  onClose7() {
    this.setData({
      show7: false
    });
  },
  onConfirm7(e) {
    let name = e.currentTarget.dataset.name,
      i = e.currentTarget.dataset.i;
    let materials = this.data.materials;
    // console.log(name, i, materials)
    if (i) {
      materials[i][name] = e.detail.value.text;
    } else {
      materials[0][name] = e.detail.value.text;
    }
    this.setData({
      materials,
      show7: false
    })
  },
  onClosechoice2() {
    this.setData({
      showchoice2: false
    })
  },
  Dictionaryblur2(e) {
    this.setData({
      unittype: e.detail
    })
  },
  confirmchoice2() {
    var num = Math.round(app.globalData.UnitType.length) + 1
    var ifhave = app.globalData.UnitType.some(s => {
      return s.text == this.data.unittype
    })
    if (ifhave) {
      wx.showToast({
        title: '已存在相同信息',
        icon: 'none',
        duration: 3000
      })
    } else {
      var data = {
        Key: "UnitType" + num,
        Value: this.data.unittype,
        ParentId: '3375'
      }
      addDictionary(data).then(res => {
        if (res.code == 10000) {
          UnitType().then(res => {
            let UnitType = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
            app.globalData.UnitType = UnitType;
            console.log(app.globalData.UnitType)
            this.setData({
              section7: UnitType,
              showchoice2: false,
              unittype: ''
            })
          })
        }
      })
    }



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
    if (!(materials[0].type && materials[0].quantity && materials[0].unitprice != '' &&
        materials[0].detailname)) {
      Toast({
        message: '请填写明细表必填项',
        mask: true
      });
    } else {
      // console.log(this.data.billid)
      materials[0].applyid = this.data.billid;
      util.introsmall(materials[0])
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
          queryapplyForsmall({
            applyid: this.data.billid
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              let item = res.List;
              var sum = 0
              item.forEach(s => {
                sum = s.quantity * s.unitprice + sum
              });
              sum = Number(sum).toFixed(2)
              detailapplyFor({
                ID: this.data.billid
              }).then(res => {
                let item = res.Item;
                var data1 = res.Item
                var b = JSON.stringify(data1)
                var c = JSON.parse(b)
                util.ModifyRecord(c, "applyform")
                item.TotalSum = sum
                item.Chinesenumerals = util.Uppercase(sum)
                util.checkChange(item, this, app.globalData.department);
                util.intro(item, this)
                updateapplyFor(item).then(res => {
                  if (res.code == 10000) {
                    wx.showToast({
                      title: '编辑成功',
                      icon: 'success',
                      duration: 3000
                    })
                    wx.redirectTo({
                      url: "/OAmoudle/pages/applyFor/detail/detail?id=" + this.data.billid + "&table=c"
                    })
                  }
                })
              })

            }
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
      url: "/OAmoudle/pages/applyFor/detaillink/detaillink?detailid=" + this.data.materials[0].ID
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
    util.introsmall(materials[0])
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
        queryapplyForsmall({
          applyid: this.data.materials[0].applyid
        }).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            let item = res.List;
            var sum = 0
            item.forEach(s => {
              sum = s.quantity * s.unitprice + sum
            });
            sum = Number(sum).toFixed(2)
            detailapplyFor({
              ID: this.data.materials[0].applyid
            }).then(res => {
              console.log(res)
              let item = res.Item;
              var data1 = res.Item
              var b = JSON.stringify(data1)
              var c = JSON.parse(b)
              util.ModifyRecord(c, "applyform")
              item.TotalSum = sum
              item.Chinesenumerals = util.Uppercase(sum)
              util.checkChange(item, this, app.globalData.department);
              util.intro(item, this)
              updateapplyFor(item).then(res => {
                if (res.code == 10000) {
                  wx.showToast({
                    title: '编辑成功',
                    icon: 'success',
                    duration: 3000
                  })
                  wx.redirectTo({
                    url: "/OAmoudle/pages/applyFor/detaillink/detaillink?detailid=" + this.data.materials[0].ID
                  })
                }
              })
            })
          }
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
    this.setData({
      section5: app.globalData.applytype,
      section7: app.globalData.UnitType
    })
    // 明细表id
    if (options.detailid) {
      detailapplyForsmall({
        ID: options.detailid
      }).then(res => {
        // console.log(res.Item)
        let materials = this.data.materials;
        materials[0] = res.Item;
        util.outflowsmall(materials[0])
        this.setData({
          materials
        })
        // console.log(this.data.materials);
      })
    }
  },


})