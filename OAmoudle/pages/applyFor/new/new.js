// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import Transform from '../../../../utils/num2upper.js';
import {
  queryapplyFor,
  detailapplyFor,
  addapplyFor,
  updateapplyFor,
  addapplyForsmall,
  addDictionary,
  applytype,
  UnitType
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      purpose: "",
      Companytitle: '',
      department: '',
      ifpurchase: "3105",
      itemnumber: '1',
      applynumber: "",
      API_Picurl: [],
      ApplygetNew: false,
      TotalSum: ''
    },
    currentDate: new Date().getTime(),
    show: false,
    show1: false,
    show_o: false,
    show_3: false,
    show_2: false,
    show6: false,
    show_time: false,
    show_photo: false,
    firms: [],
    totals: [],
    Supplier: [],
    sections: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    section2: [],
    section3: [],
    section4: [],
    materials: [],
    section5: [],
    section6: [],
    ifpurchasetext: '否',
    seach: '',
    showchoice: false,
    applyfortype: '',
    seach1: '',
    seach2: '',
    unittype: '',
    showchoice2: false,
    length: 0
  },
  // 数字筛选
  checkmoney(e) {
    let info = this.data.info;
    util.formatmony(e);
    info.TotalSum = e.detail;
    this.setData({
      info
    })
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  finditem() {
    let arr = util.findone(app.globalData.department, this.data.seach);
    this.setData({
      section3: arr,
      seach: ''
    })
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
      seach1: ''
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
  finditem3() {
    let arr = util.findone(app.globalData.Companytitle, this.data.seach);
    this.setData({
      section2: arr,
      seach: ''
    })
  },
  // 公司名称
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
    })
  },
  // 项目编号
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
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 项目编号
  showPopup2() {
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show2: false,
      ifpurchasetext: e.detail.value.text
    })
  },
  // 部门
  showPopup() {
    this.setData({
      show: true,
      seach: ''
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
  // 采购合同编号
  purchasecontactCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 申请人
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
  // 采购合同名称
  subprojectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 进场日期
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
  },
  // 采购内容
  purchaseContextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  purchasecblur(e) {
    e.detail.value = Number(e.detail.value).toFixed(2)
    let info = util.editInfo(e, this, e.detail.value);
    var tsf = new Transform()
    var result = tsf.toUpper(this.data.info.TotalSum)
    this.setData({
      info,
      'info.Chinesenumerals': result
    })
  },
  // 采购合同金额
  contcactamountblur(e) {
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

  // 明细表

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
      i = e.currentTarget.dataset.i - 1;
    let materials = this.data.materials;
    // console.log(name, i, materials)
    console.log(i)
    if (i) {
      var w = materials.findIndex(s => {
        return s.num = i
      })
      materials[w][name] = e.detail.value.text;
      i = w
    } else {
      materials[0][name] = e.detail.value.text;
    }
    this.setData({
      materials,
      show6: false
    })
    this.repetition(e, i)
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
      i = e.currentTarget.dataset.i - 1
    let materials = this.data.materials;
    // console.log(name, i, materials)
    if (i) {
      var w = materials.findIndex(s => {
        return s.num = i
      })
      materials[w][name] = e.detail.value.text;

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
      console.log(s.text)
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

  confirm() {
    let info = this.data.info;
    // console.log(this.data.info)
    if (info.purpose && info.Companytitle && info.department && info.ifpurchase !== '' && info.itemnumber) {
      var materials = this.data.materials;
      for (let k of materials) {
        for (let i in k) {
          if (k[i] == '请选择') {
            k[i] = ""
          }
        }
      }
      // console.log("1")
      if (this.data.materials[0]) {
        if (!(materials[0].type && materials[0].quantity && materials[0].unitprice != '' &&
            materials[0].detailname)) {
          Toast({
            message: '请填写明细表必填项',
            mask: true
          });
        } else {
          util.checkContent(info, this);
          util.intro(info, this)
          this.setData({
            info
            //'info.ApplygetNew':true
          })
          // if (this.data.materials[0]) {
          addapplyFor(this.data.info).then(res => {
            if (res.code == 10000) {
              return queryapplyFor()
            }
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              let billlist = res.List;
              let id = billlist[billlist.length - 1].ID
              // console.log(id)

              materials = this.data.materials;
              for (let k of materials) {
                for (let i in k) {
                  if (k[i] == '请选择') {
                    k[i] = ""
                  }
                }
              }
              materials.forEach(value => {
                value.quantity = parseInt(value.quantity);
                value.applyid = id;
                util.introsmall(value)
              })
              this.setData({
                materials
              })
              // console.log(JSON.stringify(materials))
              return addapplyForsmall({
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
              util.OAreturn('applyFor','',2);
            } else {
              Toast({
                message: '请输入正确的内容',
                mask: true
              });
            }
          })
        }

      } else {
        util.checkContent(info, this);
        util.intro(info, this)
        this.setData({
          info
        })
        console.log(info)
        addapplyFor(this.data.info).then(res => {
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.OAreturn('applyFor','',2);
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
    // util.OAreturn('applyFor');
    wx.navigateBack()
  },
  // 编辑页面的确定和返回
  editreturn() {
    // util.OAreturn('applyFor', this);
    wx.navigateBack()
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);

    util.intro(info, this)
    this.setData({
      info
    })
    updateapplyFor(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "applyform")
        util.OAreturn('applyFor', this,2,this.data.a,this.data.b);
      }
    })
  },
  // 获取采购明细输入框中的数据并设置给data
  getgname(e) {

    util.updateValue(e, this);
    this.sum()
    this.repetition(e)
  },
  getmoney(e) {
    console.log(e)
    e.detail.value = Number(e.detail.value).toFixed(2)
    var materials = util.updateValue(e, this);
    this.setData({
      materials
    })
    this.sum()
    this.repetition(e)
  },
  sum() {
    let materials = this.data.materials;
    var sum = 0
    console.log(materials)
    materials.forEach(s => {
      console.log(s)
      sum = s.quantity * s.unitprice + sum;
    })
    sum = Number(sum).toFixed(2)
    var tsf = new Transform()
    var result = tsf.toUpper(sum)
    this.setData({
      'info.TotalSum': sum,
      'info.Chinesenumerals': result,
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
  // 金额筛选
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
  repetition(e, w) {
    let materials = this.data.materials;
    var i = e.currentTarget.dataset.i;
    if (w || w == 0) {
      i = w
    }
    let name = e.currentTarget.dataset.name
    // console.log(name, i, materials)
    var ifhave = ''
    if (i) {
      ifhave = materials.some((s, index) => {
        if (index != i) {
          return (s.type == materials[i].type) && (s.detailname == materials[i].detailname)
        }
      })
    } else {
      ifhave = materials.some((s, index) => {
        if (index != i) {
          return (s.type == materials[0].type) && (s.detailname == materials[0].detailname)
        }

      })
      // materials[0][name] = e.detail && e.detail.value;
    }
    if (ifhave) {
      wx.showToast({
        title: "已经添加过此项!",
        icon: 'none',
        duration: 3000
      })
    }
  },
  // 添加材料明细
  add_more() {
    let materials = this.data.materials;
    var ifhave = materials.some(s => {
      return !(s.type && s.detailname && s.unitType && s.quantity != '0')
    })
    if (ifhave) {
      wx.showToast({
        title: "请填写必填项以及单位后再新增",
        icon: 'none',
        duration: 3000
      })
    } else {
      let add_detail = {
        num: this.data.length + 1,
        applyid: '',
        type: '',
        quantity: 0,
        unitprice: 0,
        detailname: '',
      };

      materials.unshift(add_detail);
      this.setData({
        materials,
        length: add_detail.num
      })
      this.sum()
      // 页面滚动到底部
      if (this.data.materials.length < 2) {
        util.pageScrollToBottom1();
      }
    }

  },
  // 删除材料明细
  reduce_detail(e) {
    let materials = this.data.materials,
      i = e.currentTarget.dataset.i;
    materials.splice(i, 1);
    // materials.forEach((item, index, arr) => {
    //   if (i > index) {
    //     item.num = item.num - 1
    //   };
    // });

    this.setData({
      materials
    })
    this.sum()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      b:options.a,
      a:options.count1,
      section1: app.globalData.Principal,
      section2: app.globalData.Companytitle,
      section3: app.globalData.department,
      section4: app.globalData.MainProject1,
      section6: app.globalData.YesOrNo1,
      section5: app.globalData.applytype,
      section7: app.globalData.UnitType
    })
    if (options.id) {
      detailapplyFor({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          ifpurchasetext: item.ifpurchase
        })
        this.setData({
          info: item
        })
      })
    }
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(message)
      let info = this.data.info;
      info.department = message.departmenttext
      info.Companytitle = message.Companytitletext
      this.setData({
        info,
        departmenttext: message.departmenttext
      })
    }
  },

})