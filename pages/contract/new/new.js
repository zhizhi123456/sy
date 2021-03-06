// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addContract,
  referContract,
  amendContract,
  groupSubItems,
  referSubItems,
} from "../../../service/getData";
var util = require("../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    departmenttext: "请选择",
    info: {
      API_Picurl: [],
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
    Citems: [],
    section22: []
  },
  // 公司
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
   // 框架协议编号
   showPopup_2() {
    this.setData({
      show_2: true
    });
  },
  onClose_2() {
    this.setData({
      show_2: false
    });
  },
  onConfirm_2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_2: false
    })
  },
  // 分包合同名称
  subcontactnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
   // 分包合同类型
   showPopup_1() {
    this.setData({
      show_1: true
    });
  },
  onClose_1() {
    this.setData({
      show_1: false
    });
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_1: false
    })
  },
  // 分包项目
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
    referSubItems({
      ID: e.detail.value.value
    }).then(res => {
      // console.log(res)
      if (res.code == 10000 && res.Item) {
        var item = util.outflow(res.Item)
        util.handleData(item, this, app.globalData.department);
        // console.log(item)
        this.setData({
          'info.Companytitle': item.Companytitle,
          'info.department': item.department,
          departmenttext: item.department,
          // 部门
          // 合同金额
          'info.contcactamount': item.contcactamount,
          // 合同照片
          'info.API_Picurl': item.API_Picurl
        })
      }
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
    // console.log(e)
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
  },
  // 备注
  demoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 分包合同金额
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
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.Companytitle && this.data.info.department && this.data.info.subcontactname && this.data.info.subprojcectCode && this.data.info.demo&& this.data.info.frameProtocolCode&& this.data.info.contractType) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      addContract(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('contract', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
            this.data.rid, this.data.title)
        }
      })
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.returnPrev('contract', '', this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title)
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.returnPrev('contract', this, this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
      this.data.rid, this.data.title, this.data.ISconduct)
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    amendContract(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('contract', this, this.data.userid, this.data.caption, this.data.dep, this.data.deptxt,
          this.data.rid, this.data.title, this.data.ISconduct)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.id || options.rid) {
      this.setData({
        rid: options.rid,
        title: options.title,
      })
    }
    if (options.userid) {
      this.setData({
        userid: options.userid,
        caption: options.caption,
        dep: options.dep,
        deptxt: options.deptxt,
        ISconduct: Number(options.ISconduct)
      })
    }
    this.setData({
      sections: app.globalData.department,
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
      Citems: app.globalData.MainSubproject,
      contractType: app.globalData.contractType,
      getframeProtocolCode: app.globalData.getframeProtocolCode,
    })
    groupSubItems({
    
    }).then(res => {
      // console.log(res)
      if (res.code == 10000 && res.List) {
        var res1 = JSON.stringify(res.List)
        let bidlist = JSON.parse(res1.replace(/ID/g, 'value').replace(/subprojectname/g, 'text'));
        this.setData({
          section22: bidlist
        })
        // console.log(this.data.section22)
      } else {
        this.setData({
          section22: []
        })
      }
    })
    if (options.id) {
      referContract({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
})