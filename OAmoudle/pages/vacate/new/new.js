// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addVacate,
  referVacate,
  amendVacate,
  getdep,
  Leavetypelist,
  getLeader
} from "../../../../service/getData.js";
var util = require("../../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    a:1,
    info: {
      API_Picurl: [],
    },
    show: false,
    departmenttext: '',
    totals: [],
    currentDate: new Date().getTime(),
    departmenttext: "请选择",
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    leavetypetext: '',
    mindata: new Date().getTime(),
    maxdata: (new Date().getTime()) + 60 * 60 * 1000 * 24 * 30,
    seach: '',
    mindata1:new Date().getTime()
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
    let arr = util.findone(app.globalData.Leavetypelist, this.data.seach);
    this.setData({
      Leavetypelist: arr,
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
  // 请假事由
  leavereasonblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 项目类型
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false,
    })
  },
  // onConfirm1(e) {
  //   console.log("1")
  //   var s = this.data.section1
  //   var t = s.filter((y) => {
  //     return y.show
  //   })
  //   var p
  //   p = t.map((x) => {
  //     return x.Value
  //   })
  //   p = p.join(",")
  //   t = t.map((x) => {
  //     return x.Key
  //   })
  //   t = t.join(",")
  //   console.log(t)
  //   let info = util.editInfo(e, this, t);
  //   this.setData({
  //     info,
  //     show1: false,
  //     leavetypetext: p
  //   })
  // },
  // onChange(event) {
  //   console.log(event)
  //   var s = this.data.section1
  //   var y = s.findIndex((r) => {
  //     return r.Value == event.currentTarget.dataset.name
  //   })
  //   // console.log(y)
  //   s[y].show = !s[y].show
  //   this.setData({
  //     section1: s
  //   })

  // },
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
      mindata1: e.detail
    })

    if (this.data.info.leaveendtime && this.data.info.leavebegintime) {
      var duration = (new Date(this.data.info.leaveendtime).getTime()) - (new Date(this.data.info.leavebegintime).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '请假开始时间应小于请假结束时间!',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.leavebegintime":'',
          "info.leaveendtime": '',
          mindata: new Date().getTime(),
          maxdata: (new Date().getTime()) + 60 * 60 * 1000 * 24 * 30,
          mindata1: new Date().getTime(),
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
    var hours = Math.round((duration / (60 * 60 * 1000)))
    var day
    var today = util.formatday(new Date())
    // 今天的假期
    if ((today == util.formatday(new Date(this.data.info.leaveendtime))) && (today == util.formatday(new Date(this.data.info.leavebegintime)))) {
      if (hours < 8) {
        this.setData({
          "info.leavedays": 0,
          "info.leavehours": hours,
        })
        console.log("今天的日期并且小于8小时")
      } else {
        this.setData({
          "info.leavedays": 1,
          "info.leavehours": 0,
        })
        console.log("今天的日期并且大于等于8小时")
      }
    } 
    // 跨天的计算
    else {
      if (hours % 24 < 8) {
        this.setData({
          "info.leavedays": (parseInt(hours / 24)),
          "info.leavehours": hours % 24,
        })
        console.log("跨天计算并且取余小于8小时")
      } else {
        this.setData({
          "info.leavedays": (parseInt(hours / 24)) + 1,
          "info.leavehours": 0,
        })
        console.log("跨天计算并且取余大于等于8小时")
      }


    }
    // if (hours < 24) {
    //   day = 0
    //   this.setData({
    //     "info.leavedays": 0,
    //     "info.leavehours": hours,
    //   })
    // } else {
    //   this.setData({
    //     "info.leavedays": (parseInt(hours / 24)) + 1,
    //     "info.leavehours": hours % 24,
    //   })
    // }
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
        info,
        'info.IsManager': this.data.Manager,
        'info.ApplygetNew':true
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
    //util.OAreturn('vacate');
    wx.navigateBack();
  },
  // 编辑页面的确定和返回
  editreturn() {
    //util.OAreturn('vacate', this);
    wx.navigateBack();
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
        util.ModifyRecord(this.data.information, "leaveapplyform")
        util.OAreturn('vacate', this,2,this.data.a,this.data.b);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      b:options.a,
      a:options.count1,
      firms: app.globalData.Companytitle,
      sections: app.globalData.moredep,
      Leavetypelist: app.globalData.Leavetypelist,
    })
    // //项目类型请求
    // Leavetypelist().then(res => {
    //   console.log(res)
    //   var w = JSON.parse(res)
    //   var q = w.map(s => {
    //     s.show = false
    //     return s
    //   })
    //   this.setData({
    //     section1: q
    //   })
    //   console.log(this.data.section1)
    // })
    if (options.id) {
      referVacate({
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
        // var t = this.data.section1
        // var q = item.leavetype
        // q = q.split(",")
        // let y
        // q.forEach((s) => {
        //   y = t.map((w) => {
        //     if (w.Key == s) {
        //       w.show = true
        //       return w
        //     }
        //   })
        // })
        // this.setData({
        //   section1: t,
        // })
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
      info.department = message.department
      info.Companytitle = message.Companytitletext
      this.setData({
        info,
        departmenttext: message.departmenttext
      })
      getLeader({
        UserName: user.UserName
      }).then(res => {
        if (JSON.parse(res).length) {
          this.setData({
            Manager: true
          })
        } else {
          this.setData({
            Manager: false
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