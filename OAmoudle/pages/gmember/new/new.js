// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addMembernew,
  referMembernew,
  amendMembernew
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let user = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    show: false,
    firms: [],
    totals: [],
    departmenttext: "请选择",
    currentDate: new Date().getTime(),
    mindata: new Date().getTime(),
    mindata1: (new Date().getTime()) - 60 * 60 * 1000 * 24 * 30 * 12 * 18
  },
  setSeach(e) {
    this.setData({
      seach: e.detail.value
    })
  },
  finditem() {
    let arr = util.findone(app.globalData.GetUser, this.data.seach);
    this.setData({
      GetUser: arr,
      seach: ''
    })
  },
  finditem1() {
    let arr = util.findone(app.globalData.GetPosition, this.data.seach);
    this.setData({
      GetPosition: arr,
      seach: ''
    })
  },
  finditem2() {
    let arr = util.findone(app.globalData.department, this.data.seach);
    this.setData({
      sections: arr,
      seach: ''
    })
  },
  finditem3() {
    let arr = util.findone(app.globalData.GetEducation, this.data.seach);
    this.setData({
      GetEducation: arr,
      seach: ''
    })
  },
  finditem4() {
    let arr = util.findone(app.globalData.GetGradeTitle, this.data.seach);
    this.setData({
      GetGradeTitle: arr,
      seach: ''
    })
  },
  checknum(e) {
    let info = this.data.info;
    info.age = e.detail.replace(/[^\d]/g, '');
    this.setData({
      info
    })
  },
  // 账户
  // userIdblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },
  showPopup_z() {
    this.setData({
      show_z: true
    });
  },
  onClose_z() {
    this.setData({
      show_z: false
    });
  },
  onConfirm_z(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      'info.name': e.detail.value.text,
      show_z: false
    })
  },
  // 姓名
  nameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 职位
  // positionblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },
  showPopup_w() {
    this.setData({
      show_w: true
    });
  },
  onClose_w() {
    this.setData({
      show_w: false
    });
  },
  onConfirm_w(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_w: false
    })
  },
  // 性别
  // sexblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },  
  showPopup_s() {
    this.setData({
      show_s: true
    });
  },
  onClose_s() {
    this.setData({
      show_s: false
    });
  },
  onConfirm_s(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_s: false
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
  // 状态
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
  // 学历
  showPopup_x() {
    this.setData({
      show_x: true
    });
  },
  onClose_x() {
    this.setData({
      show_x: false
    });
  },
  onConfirm_x(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_x: false
    })
  },
  // learnrecordblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },
  // 户籍类型
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
  // 出生日期
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
    this.getage(e);
  },
  getage(e) {
    let Yeartime = new Date().getFullYear(),
      Monthtime = new Date().getMonth() + 1,
      Datetime = new Date().getDate(),
      Yearbir = new Date(e.detail).getFullYear(),
      Monthbir = new Date(e.detail).getMonth() + 1,
      Datebir = new Date(e.detail).getDate(),
      age;
    if (Monthtime > Monthbir || (Monthtime == Monthbir && Datetime >= Datebir)) {
      this.setData({
        'info.age': Yeartime - Yearbir
      })
    } else {
      this.setData({
        'info.age': Yeartime - Yearbir - 1
      })
    }
  },
  // 民族
  nationblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 毕业院校
  graduateschoolblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 所学专业
  majorblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 毕业日期
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
  },
  // 职称证(详细记录)
  Titlecertificateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 婚姻状况
  marriageblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 职称
  showPopup_c() {
    this.setData({
      show_c: true
    });
  },
  onClose_c() {
    this.setData({
      show_c: false
    });
  },
  onConfirm_c(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_c: false
    })
  },
  // memberrankblur(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info
  //   })
  // },
  // 入职日期
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
    this.setData({
      mindata: e.detail
    })
    if (this.data.info.enterdate && this.data.info.onjobdate) {
      var duration = (new Date(this.data.info.onjobdate).getTime()) - (new Date(this.data.info.enterdate).getTime())
      if (duration < 0) {
        wx.showToast({
          title: '入职日期应小于离职时间',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          "info.enterdate": '',
          "info.onjobdate": '',
          currentDate: new Date().getTime(),
        })
      }
    }
  },
  // 在职时间
  showPopup_timeZ() {
    this.setData({
      show_timeZ: true
    })
  },
  onClose_timeZ() {
    this.setData({
      show_timeZ: false
    })
  },
  onConfirm_timeZ(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_timeZ: false
    })
  },
  // 身份证号码
  IDcardNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 年龄
  ageblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 用工形式
  employmentformblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 手机号码
  mobilephoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 身份证地址
  IDcardNoAddressblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 紧急联系人
  urgentcontactmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 紧急联系电话
  urgentcontactphoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 紧急联系人关系
  urgentcontmanrelablur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // email
  emailblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 持有资质证书
  qualicertifiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 入司前工作经历
  workexperienceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 劳动手册相关
  labourmanualblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公积金账号
  accumulatfundAccountblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.name && this.data.info.position && this.data.info.state && this.data.info.sex && this.data.info.department && this.data.info.birthday && this.data.info.userId) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addMembernew(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('gmember');
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
    util.OAreturn('gmember');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('gmember', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendMembernew(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('gmember', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.GetRoles)
    user = wx.getStorageSync("myInfo");
    this.setData({
      sections: app.globalData.department,
      state: app.globalData.state,
      householdregister: app.globalData.householdregister,
      sexs: app.globalData.sexs,
      GetUser: app.globalData.GetUser,
      GetEducation: app.globalData.GetEducation,
      GetPosition: app.globalData.GetPosition,
      GetGradeTitle: app.globalData.GetGradeTitle,
      GetRoles: app.globalData.GetRoles,
    })
    if (options.id) {
      referMembernew({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },
 // 角色
 showPopup_kind() {
  this.setData({
    show_kind: true
  })
},
onClose_kind() {
  this.setData({
    show_kind: false
  })
},
onChangekind(e) {
  this.setData({
    result: e.detail
  })
},
onConfirm_kind() {
  let info = this.data.info;
  console.log(this.data.result)
  info.Roles = this.data.result.join(";");
  this.setData({
    info,
    show_kind: false
  })
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