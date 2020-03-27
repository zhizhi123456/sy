// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addOvertime,
  referOvertime,
  amendOvertime
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      API_Picurl: [],
    },
    show: false,
    totals: [],
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    currentDate: new Date().getTime(),
    mindata: (new Date().getTime()) - 60 * 60 * 1000 * 24 * 7,
    maxdata: (new Date().getTime()) + 60 * 60 * 1000 * 24 * 30,
    seach: ''
  },
  checknum(e) {
    let info = this.data.info;
    util.formatNum(e);
    info.overtimehours = e.detail;
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
      sections: arr,
      seach: ''
    })
  },
  finditem1() {
    let arr = util.findone(app.globalData.GetOverworktype, this.data.seach);
    this.setData({
      GetOverworktype: arr,
      seach: ''
    })
  },
  finditem2() {
    let arr = util.findone(app.globalData.GetOvertimeperiod, this.data.seach);
    this.setData({
      GetOvertimeperiod: arr,
      seach: ''
    })
  },
  finditem3() {
    let arr = util.findone(app.globalData.Companytitle, this.data.seach);
    this.setData({
      firms: arr,
      seach: ''
    })
  },
  // 加班事由
  workoverreasonblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  // 加班类型
  showPopup_1() {
    this.setData({
      show_1: true,
      seach: ''
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
  // 计划加班时间
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
  // 实际加班时间
  showPopup_facttime() {
    this.setData({
      show_facttime: true
    })
  },
  onClose_facttime() {
    this.setData({
      show_facttime: false
    })
  },
  onConfirm_facttime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_facttime: false
    })
    this.setData({
      mindata: e.detail
    })
    if (this.data.info.actovertime && this.data.info.overworkendtime) {
      var duration = (new Date(this.data.info.overworkendtime).getTime()) - (new Date(this.data.info.actovertime).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '加班开始时间应小于加班结束时间',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.actovertime": '',
          "info.overworkendtime": '',
          currentDate: new Date().getTime(),
          mindata: (new Date().getTime()) - 60 * 60 * 1000 * 24 * 7,
          maxdata: (new Date().getTime()) + 60 * 60 * 1000 * 24 * 30,
        })
        this.number()
      } else {
        this.number()
      }
    }
  },
  // 加班结束时间
  showPopup_endtime() {
    this.setData({
      show_endtime: true
    })
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  onConfirm_endtime(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
    if (this.data.info.actovertime && this.data.info.overworkendtime) {
      this.number()
    }
  },
  number() {
    var duration = (new Date(this.data.info.overworkendtime).getTime()) - (new Date(this.data.info.actovertime).getTime())
    var hours = Math.round((duration / (60 * 60 * 1000)))
    // var day
    // if (hours < 24) {
    //   day = 0
    this.setData({
      "info.overtimehours": hours,
    })
    // } else {
    //   this.setData({
    //     "info.overtimehours": parseInt(hours / 24)+'天'+(hours % 24)+'小时',
    //   })
    // }
  },
  // 加班时期
  showPopup_2() {
    this.setData({
      show_2: true,
      seach: ''
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
  // 加班总工时
  overtimehoursblur(e) {
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
    if (this.data.info.workoverreason && this.data.info.applyman && this.data.info.department && this.data.info.Companytitle && this.data.info.planovertime && this.data.info.actovertime && this.data.info.overtimehours && this.data.info.overtimeperiod && this.data.info.overworkendtime && this.data.info.overworktype) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addOvertime(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('overtime');
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
    util.OAreturn('overtime');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('overtime', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    // console.log(infodata)
    amendOvertime(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "workovertime")
        util.OAreturn('overtime', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user = wx.getStorageSync("myInfo");
    this.setData({
      sections: app.globalData.getdept,
      firms: app.globalData.Companytitle,
      sections: app.globalData.moredep,
      GetOverworktype: app.globalData.GetOverworktype,
      GetOvertimeperiod: app.globalData.GetOvertimeperiod,
    })
    if (options.id) {
      referOvertime({
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
        this.setData({
          info: item
        })
        let info = this.data.info;
        if (!info.department || !info.Companytitle) {
          util.userdep(user, this);
        }
      })
    }
    let info = this.data.info;
    if (!info.applyman) {
      info.applyman = user.UserName;
      this.setData({
        info
      })
    }
    if (!info.department || !info.Companytitle) {
      util.userdep(user, this);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    user = wx.getStorageSync("myInfo");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})