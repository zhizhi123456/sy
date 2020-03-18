// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  queryapproval,
  detailapproval,
  addapproval,
  updateapproval,
  addapprovalsmall,
  staff,
  getdep
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      payapproveformname: "",
      department: '',
      Companytitle: '',
      paytype: "",
      projectcode: '',
      invoiceurl: [],
      API_Picurl: []
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
    show_photo1: false,
    firms: [],
    totals: [],
    Supplier: [],
    sections: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    check_photo1: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    section2: [],
    section3: [],
    section4: [],
    materials: [],
    section5: ["红酒", "购物卡", "食品", "烟", "电脑"],
    section6: [],
    ifpurchasetext: '',
    upimg1:false,
    seach:''
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  finditem() {
      let arr = util.findone(app.globalData.department, this.data.seach);
      this.setData({
        sections: arr,
        seach: ''
      })
  },
  finditem1() {
      let arr = util.findone(app.globalData.PayType, this.data.seach);
      this.setData({
        section6: arr,
        seach: ''
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false,
    })
  },
  // 采购合同编号
  purchasecontactCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 采购合同名称
  subprojectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 采购内容
  purchaseContextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
    util.upImage(this);
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  // 照片
  showPopup_photo1() {
    this.setData({
      show_photo1: true
    })
  },
  onClose_photo1() {
    this.setData({
      show_photo1: false
    })
  },
  onSelect_photo1(e) {
    util.upImages(this, this.data.info.invoiceurl,'upimg1');
    this.setData({
      upimg1:true,
      show_photo1: false
    })
  },
  delimg1(e) {
    util.deleteImgs(this, e, this.data.info.invoiceurl)
  },
  tap_pic1(e) {
    util.previews(this, e, this.data.info.invoiceurl)
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
    let materials = util.updateValue(e, this);
    // console.log(materials)
    this.setData({
      materials,
      show6: false
    })
  },

  confirm() {
    let info = this.data.info;
    // console.log(this.data.info)
    if (info.payapproveformname && info.Companytitle && info.department) {
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
        if (!(materials[0].detailxh != '' && materials[0].detailcontext && materials[0].amount != '')) {
          Toast({
            message: '请填写明细表必填项',
            mask: true
          });
        } else {
          if (info.invoiceurl) {
            // console.log("tupian")
            this.setData({
              upimg1: false
            })
            info.invoiceurl = info.invoiceurl.join(",")
          }
          util.checkContent(info, this);
          util.intro(info, this)
          this.setData({
            info
          })
          // if (this.data.materials[0]) {
          addapproval(this.data.info).then(res => {
            if (res.code == 10000) {
              return queryapproval()
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
                value.payapproveid = id;
              })
              this.setData({
                materials
              })
              // console.log(JSON.stringify(materials))
              return addapprovalsmall({
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
              util.OAreturn('approval');
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
        if (info.invoiceurl) {
          // console.log("tupian")
          this.setData({
            upimg1: false
          })
          info.invoiceurl = info.invoiceurl.join(",")
        }
        this.setData({
          info
        })
        console.log(info)
        addapproval(this.data.info).then(res => {
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.OAreturn('approval');
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
    util.OAreturn('approval');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('approval', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);

    util.intro(info, this)
    if (info.invoiceurl) {
      // console.log("tupian")
      this.setData({
        upimg1: false
      })
      info.invoiceurl = info.invoiceurl.join(",")
    }
    this.setData({
      info
    })
    updateapproval(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "payapproval")
        util.OAreturn('approval', this);
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
  getRecord(e) {
    util.updateValue(e, this);
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
  // 添加材料明细
  add_more() {
    let add_detail = {
      num: this.data.materials.length + 1,
      payapproveid: '',
      detailxh: '',
      detailcontext: '',
      amount: 0,
    };
    let materials = this.data.materials;
    materials.unshift(add_detail);
    this.setData({
      materials
    })
    // 页面滚动到底部
    if (this.data.materials.length < 2) {
      util.pageScrollToBottom1();
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
    this.setData({
      section4: app.globalData.MainProject1,
      section6: app.globalData.PayType,
      sections: app.globalData.department,
    })
    if (options.id) {
      detailapproval({
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
        if (item.invoiceurl) {
          item.invoiceurl = item.invoiceurl.split(",");
          this.setData({
            upimg1: true
          })
        } else {
          item.cover = [];
        }
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
        departmenttext:message.departmenttext
      })
    }
  },

})