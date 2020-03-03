// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addVacate,
  referVacate,
  amendVacate,
  getdep
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
    departmenttext:'',
    firms: [],
    totals: [],
    currentDate: new Date().getTime(),
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    mindata: new Date().getTime(),
    maxdata: (new Date().getTime()) + 60 * 60 * 1000 * 24 * 30,
  },
  // 请假事由
  leavereasonblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  // 请假类别
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
  // 请假开始时间
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
    this.setData({
      mindata: e.detail
    })

    if (this.data.info.leaveendtime && this.data.info.leavebegintime) {

      var duration = (new Date(this.data.info.leaveendtime).getTime()) - (new Date(this.data.info.leavebegintime).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '请假开始时间应小于请假结束时间',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.leavebegintime": util.datefomate(new Date().getTime()),
          "info.leaveendtime": util.datefomate(new Date().getTime())
        })
        this.number()
      } else {
        this.number()
      }
    }
  },
  // 请假结束时间
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
    if (this.data.info.leaveendtime && this.data.info.leavebegintime) {
      this.number()

    }
  },
  number() {
    var duration = (new Date(this.data.info.leaveendtime).getTime()) - (new Date(this.data.info.leavebegintime).getTime())
    // console.log(duration / (60 * 60 * 1000))
    // console.log(Math.round((duration / (60 * 60 * 1000))))
    var hours = Math.round((duration / (60 * 60 * 1000)))
    var day
    if (hours < 24) {
      day = 0
      this.setData({
        "info.leavedays": 0,
        "info.leavehours": hours,
      })
    } else {
      this.setData({
        "info.leavedays": parseInt(hours / 24),
        "info.leavehours": hours % 24,
      })
    }
  },
  // 请假天数
  leavedaysblur(e) {
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
    if (this.data.info.leavereason && this.data.info.applyman && this.data.info.department && this.data.info.Companytitle && this.data.info.leavebegintime && this.data.info.leaveendtime &&

      (this.data.info.leavedays !== '') && (!(this.data.info.leavedays == "0" && this.data.info.leavehours == "0"))

    ) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      console.log(this.data.info)
      addVacate(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('vacate');
        }
      })
    } else {
      Toast({
        message: '请填写必填项或请假日期时间不能为0',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.OAreturn('vacate');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('vacate', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    // console.log(infodata)
    amendVacate(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('vacate', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firms: app.globalData.Companytitle,
      sections: app.globalData.department,
      Leavetypelist: app.globalData.Leavetypelist,
    })

    if (options.id) {
      referVacate({
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
    user = wx.getStorageSync("myInfo");
    if (user) {
      getdep({
        UserName: user.UserName
      }).then(res => {
        console.log(res)
        if (res) {
          var s = JSON.parse(res)
          let info = this.data.info;
          info.department =s[0].techofficename
          info.Companytitle = s[0].value
          this.setData({
            info,
            departmenttext: s[0].techofficename,
          })
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