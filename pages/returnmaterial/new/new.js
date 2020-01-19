// pages/new/new.js
var util = require("../../../utils/util");
import {
  ReturnMaterialadd,
  ReturnMaterialone,
  ReturnMaterialup,
  Returnall,
  Returnone,
  ReturnMaterialall,
  Returnadd,
  fileRecord

} from "../../../service/getData";
import Toast from 'vant-weapp/dist/toast/toast';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    departmenttext: "",
    info: {
      losematerialName: "",
      applyman: "",
      Companytitle: "",
      department: "",
      ApprovalStatusint: 0,
      projectcode: "",
      delieveryaddress: "",
      receivemanphone: "",
      API_Picurl: [],

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
    show1: false,
    show_o: false,
    show_3: false,
    show_time: false,
    show_time1: false,
    sections: [],
    firms: [],
    totals: [],
    upimg: false,
    section1: []
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
    console.log(e.detail.value.value)
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
    // //  console.log(this.data.info)
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
    // //  console.log(this.data.info)
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
    // //  console.log(this.data.info)
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
    // 判断是否填了有必选项 
    if (info.department && info.Companytitle && info.losematerialName && info.applyman && info.projectcode) {
      // 如果有详细表的情况下
      if (this.data.materials[0]) {
        var materials = this.data.materials;
        for (let i in materials) {
          if (info[i] == "请选择") {
            info[i] = ""
          }
        }
        this.setData({
          materials
        })
        if (materials[0].goodscode && materials[0].goodsname && materials[0].quantity) {
          util.checkContent(info, this);
          util.intro(info, this)
          this.setData({
            info
          })
          // //  console.log(info)
          let infodata = {
            Timestamp: app.globalData.time,
            ...this.data.info
          }
          // 新增退料单
          ReturnMaterialadd(infodata).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              // 查询总条数
              return ReturnMaterialall()
            }
          }).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              let billlist = res.List;
              // //  console.log(res)
              // //  console.log(billlist.length)
              // //  console.log(billlist[billlist.length - 1].ID)
              let id = billlist[billlist.length - 1].ID,
                materials = this.data.materials;
              materials.forEach(value => {
                value.quantity = parseInt(value.quantity);
                value.losematerialid = id;
              })
              this.setData({
                materials
              })
              // //  console.log(JSON.stringify(materials))
              // 新增详细表
              return Returnadd({
                Timestamp: app.globalData.time,
                adate: JSON.stringify(materials)
              })
            }
          }).then(res => {
            if (res.code == 10000) {
              // //  console.log(res)
              wx.showToast({
                title: '新建成功',
                icon: 'success',
                duration: 3000
              })
              // wx.redirectTo({
              //   url: '/pages/returnmaterial/pact/pact'
              // })
              util.returnPrev('returnmaterial', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
                this.data.rid, this.data.title)
            } else {
              Toast({
                message: '请输入正确的内容',
                mask: true
              });
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
        util.checkContent(info, this);
        util.intro(info, this)
        this.setData({
          info
        })
        // //  console.log(info)
        let infodata = {
          Timestamp: app.globalData.time,
          ...this.data.info
        }
        ReturnMaterialadd(infodata).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            // wx.redirectTo({
            //   url: '/pages/returnmaterial/pact/pact'
            // })
            util.returnPrev('returnmaterial', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
              this.data.rid, this.data.title)
          }
        })
      }
    } else {
      Toast({
        message: '请填写必填项（退料单名称，申请人，部门，公司抬头，项目编号）',
        mask: true
      });
    }

  },
  // 返回
  return () {
    // wx.redirectTo({
    //   url: "/pages/returnmaterial/pact/pact"
    // })
    util.returnPrev('returnmaterial', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  // 编辑领料单
  editreturn() {
    wx.redirectTo({
      url: "/pages/returnmaterial/detail/detail?id=" + this.data.info.ID + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : "")
    })
  },
  editconfirm() {
    console.log(this.data.information)
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
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
    ReturnMaterialup(infodata).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.redirectTo({
          url: "/pages/returnmaterial/detail/detail?id=" + this.data.info.ID + '&rid=' + this.data.rid + '&title=' + this.data.title + (this.data.userid ? '&caption=' + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid : "")
        })
        console.log(this.data.information)
        util.ModifyRecord(this.data.information,"losematerial")
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title
      })
    }
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
      })
    }
    if (options.id) {
      wx.showLoading({
        title: '加载中',
      });
      ReturnMaterialone({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          var data1 =res.Item
          var b = JSON.stringify(data1)
          var c  = JSON.parse(b)
          this.setData({
            information:c
          })
          //  console.log(item.API_Picurl)
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          console.log(this.data.information)
        }
      })
    }
    this.setData({
      sections: app.globalData.department,
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
    })
    var a = app.globalData.Goodsname
    a = a.map(s => {
      return s.goodscode
    })
    this.setData({
      section1: a
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