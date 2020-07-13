// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import Transform from '../../../utils/num2upper.js';
import {
  addPact,
  referId,
  amend,
  qgroupproject,
  projectone,
  Customer,
  addcustomer,
  customerRepeat
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    a:1,
    departmenttext: "请选择",
    info: {
      API_Picurl: [],
      API_file: []
    },
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
    sections: [],
    firms: [],
    totals: [],
    seach: ''
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
    let arr = util.findone(app.globalData.Companytitle, this.data.seach);
    this.setData({
      firms: arr,
      seach: ''
    })
  },
  finditem2() {
    let arr = util.findone(app.globalData.Customer, this.data.seach);
    this.setData({
      Customer: arr,
      seach: ''
    })
  },
  // 部门
  showPopup_o() {
    this.setData({
      show_o: true,
      seach: ''
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
  // 公司名称
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
  // 合同名称
  maincontactnameblur(e) {
    // 输入的内容
    // console.log(e.detail.value)
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  purchasecblur(e) {
    e.detail.value = Number(e.detail.value).toFixed(2)
    let info = util.editInfo(e, this, e.detail.value);
    var tsf = new Transform()
    var result = tsf.toUpper(this.data.info.contcactamount)
    this.setData({
      info,
      'info.Chinesenumerals': result
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

    // projectone({
    //   ID: e.detail.value.value
    // }).then(res => {
    //   if (res.code == 10000 && res.Item) {
    //     var item = util.outflow(res.Item)
    //     util.handleData(item, this, app.globalData.department);
    //     // console.log(item)
    //     this.setData({
    //       // 合同照片
    //       'info.API_Picurl': item.API_Picurl,
    //       // 总包项目编号
    //       'info.projcectCode': item.projcectCode,
    //       // 施工地点
    //       'info.workplace': item.workplace,
    //       // 施工地点
    //       'info.planbegindate': item.planbegindate, // 计划开工时间
    //       'info.planenddate': item.planenddate, // 计划完工时间
    //       'info.demo': item.demo, // 备注
    //       'info.mainbuildcontext': item.mainbuildcontext, //主要施工内容
    //       'info.chiefcontactman': item.chiefcontactman, //主要联系人,
    //       'info.projcectCode': e.detail.value.text
    //     })
    //     // console.log(item.API_Picurl)
    //   }
    // })

  },
  showPopup_4() {
    this.setData({
      show_4: true
    });
  },
  onClose_4() {
    this.setData({
      show_4: false
    });
  },
  onConfirm_4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_4: false
    })
  },
  // 金额
  contcactamountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 数字筛选
  checkmoney(e) {
    let info = this.data.info;
    util.formatmony(e);
    info.contcactamount = e.detail;
    this.setData({
      info
    })
  },
  // 数字筛选
  checknum(e) {
    let info = this.data.info;
    util.formatNum(e);
    info.contcactamount = e.detail;
    this.setData({
      info
    })
  },
  // 备注
  demoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 材料
  materialblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 签订时间
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
  confirm() {
    // console.log(this.data.info)
    // if (this.data.info.maincontactname && this.data.info.projcectCode && this.data.info.demo) {
    if (this.data.info.maincontactname && this.data.info.material) {
      let info = this.data.info;
      // console.log( util.checkContent)
      if (!info.demo) {
        info.demo = '无';
      }
      util.checkContent(info, this);
      util.intro(info, this)
      // console.log(info)
      this.setData({
        info,
      })
      // console.log(this.data.info)
      addPact(info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })

          util.returnPrev('generalcontract/pact/pact?state=1')
        }
      })
    } else {
      Toast({
        message: '请填写必填项（签报主题，签报事由）',
        mask: true
      });
    }
  },
  delF(e) {
    util.delFilenew(this, e);
  },
  downF(e) {
    util.lookFileIDEA(e);
  },
  // 文件上传
  up_file() {
    util.upFilenew(this, this.data.info.API_file);
  },
  // 返回
  return () {
    //util.Oreturn('generalcontract')
    wx.navigateBack()
  },
  // 编辑合同页面的确定和返回
  editreturn() {

    //util.returnPrev('generalcontract', this)
    wx.navigateBack()
    
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    amend(this.data.info).then(res => {
      console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "maincontact")
        util.returnPrev('generalcontract', this)
      }
    })
  },
  // 合同（项目）
  projcectCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sections: app.globalData.department,
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
      Customer: app.globalData.Customer
    })

    qgroupproject().then(res => {
      if (res.code == 10000 && res.List) {
        var res1 = JSON.stringify(res.List)
        let bidlist = JSON.parse(res1.replace(/ID/g, 'value').replace(/projcectCode/g, 'text'));
        this.setData({
          section22: bidlist
        })
        console.log(this.data.section22)
      } else {
        this.setData({
          section22: []
        })
      }
    })
    // 固定部门及公司负责人
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      let info = this.data.info;
      info.department = message.department
      info.Companytitle = message.Companytitletext
      this.setData({
        info,
        departmenttext: message.departmenttext
      })
    }
    if (options.id) {
      referId({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },
  onClosechoice() {
    this.setData({
      showchoice: false
    })
  },
  Dictionaryblur(e) {
    this.setData({
      OPcompany: e.detail
    })
  },
  confirmchoice() {
    var data = {
      customername: this.data.OPcompany,
    }
    customerRepeat(data).then(res => {
      if (res.code == 10000) {
        if (res.value) {
          addcustomer(data).then(res => {
            if (res.code == 10000) {
              Customer().then(res => {
                console.log(res)
                let result = util.getBase(res, 'customername', 'ID');
                this.setData({
                  Customer: result
                })
                app.globalData.Customer = result;
              })
              this.setData({
                showchoice: false,
              })
            }
          })
        } else {
          wx.showToast({
            title: '对方公司已存在',
            icon: 'none',
            duration: 3000
          })
          this.setData({
            customername: ''
          })
        }
      }
    })

  },
  newDictionary() {
    this.setData({
      showchoice: true
    })
  },
})