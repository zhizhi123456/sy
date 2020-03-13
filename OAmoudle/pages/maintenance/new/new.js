// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  querymaintenance,
  detailmaintenance,
  addmaintenance,
  updatemaintenance,
  addmaintenancesmall,
  staff
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      projcectCode: "",
      projectname: '',
      PurchaseDate: '',
      company: "",
      goodsamount: '',
    
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
    section5: ["红酒", "购物卡", "食品", "烟", "电脑"],
    section6: [],
    ifpurchasetext: ''
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
    if (info.projectname) {
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
        if (!(materials[0].type && materials[0].quantity && materials[0].unitprice &&
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
          })
          // if (this.data.materials[0]) {
          addmaintenance(this.data.info).then(res => {
            if (res.code == 10000) {
              return querymaintenance()
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
              })
              this.setData({
                materials
              })
              // console.log(JSON.stringify(materials))
              return addmaintenancesmall({
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
              util.OAreturn('maintenance');
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
        addmaintenance(this.data.info).then(res => {
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.OAreturn('maintenance');
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
    util.OAreturn('maintenance');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('maintenance', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);

    util.intro(info, this)
    this.setData({
      info
    })
    updatemaintenance(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        // util.ModifyRecord(this.data.information, "maintenancem")
        util.OAreturn('maintenance', this);
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
  // 添加材料明细
  add_more() {
    let add_detail = {
      num: this.data.materials.length + 1,
      applyid: '',
      type: '',
      quantity: '',
      unitprice: '',
      detailname: '',
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
      section1: app.globalData.Principal,
      section2: app.globalData.Companytitle,
      section3: app.globalData.department,
      section6: app.globalData.YesOrNo1
    })
    if (options.id) {
      detailmaintenance({
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
  },

})