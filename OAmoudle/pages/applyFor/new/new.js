// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  queryapplyFor,
  detailapplyFor,
  addapplyFor,
  updateapplyFor,
  addapplyForsmall,
  addDictionary,
  applytype
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
      ifpurchase: "",
      itemnumber: '1',
      applynumber: "",
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
    section5: app.globalData.applytype,
    section6: [],
    ifpurchasetext: '',
    seach: '',
    showchoice:false,
    applyfortype:'',
    seach1:'',
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
      seach: ''
    })
  },
  // 公司抬头
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
  },
  onClosechoice() {
    this.setData({
      showchoice: false
    })
  },
  Dictionaryblur(e){
    this.setData({
      applyfortype: e.detail
    })
  },
  confirmchoice(){
    var num = app.globalData.applytype.length+1
    var data = {
      Key:"applyforminfoType"+num,
      Value:this.data.applyfortype,
      ParentId:'2070'
    }
    addDictionary(data).then(res=>{
      if(res.code == 10000){
       var s =  util.sumupdic(applytype, app, 'applytype', "Value", "Key",this)
        this.setData({
          showchoice: false,
        })
      }
    })
   
  },
  newDictionary(){
    this.setData({
      showchoice:true
    })
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
              util.OAreturn('applyFor');
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
            util.OAreturn('applyFor');
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
    util.OAreturn('applyFor');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('applyFor', this);
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
        util.OAreturn('applyFor', this);
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
      section4: app.globalData.MainProject1,
      section6: app.globalData.YesOrNo1
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