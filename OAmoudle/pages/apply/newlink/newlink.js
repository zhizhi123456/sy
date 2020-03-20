// pages/bill/newlink/newlink.js
import {
  addapplysmall,
  updateapplysmall,
  detailapplysmall,
  addDictionary,
  UnitType,
  queryapplysmall,
  updateapply,
  detailapply
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
      applybuyid: '',
      chargeman: '',
      buyitemname: '',
      specifications: '',
      brand: 0,
      unit: '',
      quantity: '',
      demo: '',
      univalence: ''
    }],
    billid: 0,
    show6: false,
    show5: false,
    show4: false,
    show6: false
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/apply/detail/detail?id=" + this.data.billid + "&table=c"
    })
  },
  getgcode(e) {
    util.updateValue(e, this);
  },
  getgname(e) {
    util.updateValue(e, this);
    if(!this.data.materials[0].ID){
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
  repetition(e) {
    let materials = this.data.materials;
    queryapplysmall({
      applybuyid: this.data.billid
    }).then(res => {
      if (res.code == 10000) {
        let item = res.List;
        let mater = item;
        var ifhave = ''
        ifhave = mater.some((s) => {
          return (s.buyitemname == materials[0].buyitemname) && (s.specifications == materials[0].specifications) && (s.brand == materials[0].brand)
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
    materials[0].applybuyid = this.data.billid;
    for (let k of materials) {
      for (let i in k) {
        if (k[i] == '请选择') {
          k[i] = ""
        }
      }
    }
    if (!(materials[0].chargeman && materials[0].buyitemname && materials[0].specifications && materials[0].brand != '' &&
        materials[0].unit && materials[0].quantity && materials[0].demo)) {
      Toast({
        message: '请填写明细表必填项',
        mask: true
      });
    } else {
      console.log(this.data.billid)
      materials[0].applybuyid = this.data.billid;
      util.introsmall(materials[0])
      this.setData({
        materials
      })
      // console.log(this.data.materials)
      addapplysmall({
        adate: JSON.stringify(this.data.materials)
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          queryapplysmall({
            applybuyid: this.data.billid
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              let item = res.List;
              var sum = 0
              item.forEach(s => {
                sum = s.quantity * s.univalence + sum
              });
              detailapply({
                ID: this.data.billid
              }).then(res => {
                console.log(res)
                let item = res.Item;
                var data1 = res.Item
                var b = JSON.stringify(data1)
                var c = JSON.parse(b)
                util.ModifyRecord(c, "applybuyform")
                item.TotalSum = sum
                item.Chinesenumerals = util.Uppercase(sum)
                util.checkChange(item, this, app.globalData.department);
                util.intro(item, this)
                updateapply(item).then(res => {
                  if (res.code == 10000) {
                    wx.showToast({
                      title: '编辑成功',
                      icon: 'success',
                      duration: 3000
                    })
                    wx.redirectTo({
                      url: "/OAmoudle/pages/apply/detail/detail?id=" + this.data.billid + "&table=c"
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
      url: "/OAmoudle/pages/apply/detaillink/detaillink?detailid=" + this.data.materials[0].ID
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
    // console.log({
    //   ID: this.data.materials[0].ID,
    //   uptdate: JSON.stringify(this.data.materials)
    // })
    util.introsmall(materials[0])
    updateapplysmall({
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
        queryapplysmall({
          applybuyid: this.data.materials[0].applybuyid
        }).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            let item = res.List;
            var sum = 0
            item.forEach(s => {
              sum = s.quantity * s.univalence + sum
            });
            detailapply({
              ID: this.data.materials[0].applybuyid
            }).then(res => {
              console.log(res)
              let item = res.Item;
              var data1 = res.Item
              var b = JSON.stringify(data1)
              var c = JSON.parse(b)
              util.ModifyRecord(c, "applybuyform")
              item.TotalSum = sum
              item.Chinesenumerals = util.Uppercase(sum)
              util.checkChange(item, this, app.globalData.department);
              util.intro(item, this)
              updateapply(item).then(res => {
                if (res.code == 10000) {
                  wx.showToast({
                    title: '编辑成功',
                    icon: 'success',
                    duration: 3000
                  })
                  wx.redirectTo({
                    url: "/OAmoudle/pages/apply/detaillink/detaillink?detailid=" + this.data.materials[0].ID
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
    var c = app.globalData.Principal
    var a = c.map(s => {
      return s.text
    })
    this.setData({
      section5: a,
      section7: app.globalData.UnitType
    })
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(message)
      let materials = this.data.materials;
      materials[0].chargeman = message.userId
      this.setData({
        materials
      })
    }
    // 明细表id
    if (options.detailid) {
      detailapplysmall({
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