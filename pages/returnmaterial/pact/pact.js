// pages/bill/pact/pact.js
import {
  ReturnMaterialall,
  groupReturnM
} from '../../../service/getData';
var util = require("../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    top: "退料单",
    info: {},
    InfoList: [],
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
    applyT: 0,
    hadNew: 1,
    ISconduct: 0,
  },
  // 返回
  return () {
    if (this.data.applyT || this.data.ISconduct) {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + this.data.options.title + '&id=' + (this.data.options.id || this.data.options.rid)
      });
    } else {
      util.returnMenu2(1006, '材料管理');
    }
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachItem() {
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.hadNew) {
      ReturnMaterialall({
        Timestamp: app.globalData.time,
        losematerialName: this.data.seach
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          this.setData({
            InfoList: item.reverse()
          })
          wx.hideLoading();
        }
      })
    } else {
      if (this.data.ISconduct) {
        if (this.data.seach) {
          groupReturnM({
            losematerialName: this.data.seach,
            state: this.data.info.state,
            UserName: userinfo.UserName
          }).then(res => {
            // console.log(res.List)
            if (res.code == 10000) {
              let item = res.List;
              util.listData(item, app.globalData.department);
              this.setData({
                InfoList: item.reverse(),
                item,
                seach: ''
              })
              wx.hideLoading();
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          groupReturnM({
            state: this.data.info.state,
            UserName: userinfo.UserName
          }).then(res => {
            // console.log(res.List)
            if (res.code == 10000) {
              let item = res.List;
              util.listData(item, app.globalData.department);
              this.setData({
                InfoList: item.reverse(),
                item,
                seach: ''
              })
              wx.hideLoading();
            }
          }).catch(err => {
            console.log(err)
          })
        }
      } else {
        groupReturnM({
          losematerialName: this.data.seach,
          applyman: this.data.info.applyman
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            let item = res.List;
            util.listData(item, app.globalData.department);
            this.setData({
              InfoList: item.reverse(),
              item,
              seach: ''
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  changeItem(e) {
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info.state = StateStr;
    this.setData({
      info
    })
    wx.showLoading({
      title: "加载中..."
    })
    groupReturnM({
      state: StateStr,
      UserName: userinfo.UserName
    }).then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    // 列表
    wx.showLoading({
      title: '加载中',
    });
    if (options.id || options.rid) {
      this.setData({
        options: options
      })
    }
    // console.log(options)
    if (options.userid) {
      let info = this.data.info;
      info.department = options.dep;
      info.applyman = options.userid;
      this.setData({
        top: options.caption + '的退料单',
        hadNew: 0,
        info,
        departmenttext: options.deptxt,
        userid: options.userid,
        deptxt: options.deptxt,
        caption: options.caption,
        dep: options.dep
      })
      if (options.caption == '我申请') {
        this.setData({
          applyT: 1
        })
      }
      if (options.caption == '未处理') {
        info.state = options.caption;
        info.UserName = userinfo.UserName;
        delete info.applyman;
        delete info.department;
        this.setData({
          info,
          ISconduct: 1,
          departmenttext: '',
          val: 0,
          pact: [{
              text: '未处理的退料单',
              value: 0
            },
            {
              text: '已处理的退料单',
              value: 1
            },
            {
              text: '已超时的退料单',
              value: 2
            }
          ],
        })
        groupReturnM({
          state: this.data.info.state,
          UserName: userinfo.UserName
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            let item = res.List;
            util.listData(item, app.globalData.department);
            this.setData({
              InfoList: item.reverse()
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        groupReturnM({
          applyman: options.userid
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            let item = res.List;
            util.listData(item, app.globalData.department);
            this.setData({
              InfoList: item.reverse()
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      this.setData({
        seach: ""
      })
      this.seachItem();
    }
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.department,
        firms: app.globalData.Companytitle,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            firms: app.globalData.Companytitle,
            states: app.globalData.states
          })
        }
      }
    }
  },
  // 组合查询
  showgroup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm_seach() {
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.info.losematerialName || this.data.info.Companytitle || this.data.info.department || this.data.info.applyman || this.data.info.state) {
      let info = this.data.info;
      if (info.Companytitle) {
        this.data.firms.forEach(res => {
          if (info.Companytitle == res.text) {
            info.Companytitle = res.value;
          }
        })
        this.setData({
          info
        })
      }
      // console.log(this.data.info)
      groupReturnM(this.data.info).then(res => {
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          this.setData({
            InfoList: item.reverse(),
            info: {},
            departmenttext: ""
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.department = this.data.dep;
            info.applyman = this.data.userid;
            if (this.data.ISconduct) {
              delete info.applyman;
              delete info.department;
              info.state = '未处理';
              info.UserName = userinfo.UserName;
            }
            this.setData({
              info,
              departmenttext: this.data.ISconduct ? '' : this.data.deptxt
            })
          }
          wx.hideLoading();
        }
      })
      this.setData({
        show: false
      })
    } else(
      wx.showToast({
        title: '请至少输入一项内容',
        icon: 'none',
        duration: 3000
      })
    )
  },
  // 退料名称
  losematerialNameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司
  showPopup_2() {
    this.setData({
      show_2: true
    })
  },
  onClose_2() {
    this.setData({
      show_2: false
    })
  },
  onConfirm_2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_2: false,
      info
    })
  },
  // 部门
  showPopup_0() {
    if (this.data.hadNew) {
      this.setData({
        show_0: true
      })
    }
  },
  onClose_0() {
    this.setData({
      show_0: false
    })
  },
  onConfirm_0(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      show_0: false,
      info,
      departmenttext: e.detail.value.text
    })
  },
  // 申请人
  applymanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 状态
  showPopup_3() {
    userinfo = wx.getStorageSync("myInfo");
    if (userinfo) {
      let info = this.data.info;
      info.UserName = userinfo.UserName;
      if (!this.data.ISconduct) {
        this.setData({
          show_3: true,
          info
        })
      }
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onClose_3() {
    this.setData({
      show_3: false
    })
  },
  onConfirm_3(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_3: false,
      info
    })
  },
  findnew(e) {
    let index = e.currentTarget.dataset.index - 1;
    wx.pageScrollTo({
      selector: '#new' + index,
      duration: 500
    })
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
})