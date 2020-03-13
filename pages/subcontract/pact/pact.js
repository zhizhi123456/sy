// pages/generalcontract/pact/pact.js
import {
  getSubItems,
  groupSubItems
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
let item, list;
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    top: '分包项目',
    InfoList: [],
    show_0: false,
    currentDate: new Date().getTime(),
    show: false,
    info: {},
    departmenttext: '',
    sections: [],
    show_time: false,
    show_endtime: false,
    item: [],
    pages: 1,
    hadNew: 1,
    show_2: false,
    show_3: false,
    me: 0,
    applyT: 0,
    ISconduct: 0
  },
  // 返回
  return () {
    if (this.data.hadNew) {
      util.returnMenu(1001);
    } else if (this.data.me) {
      util.returnMenu2(this.data.options.id || this.data.options.rid, this.data.options.title);
    } else if (this.data.applyT || this.data.ISconduct) {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + this.data.options.title + '&id=' + (this.data.options.id || this.data.options.rid)
      });
    } else {
      wx.redirectTo({
        url: "/pages/section/section2?name=" + this.data.caption + '&dep=' + this.data.dep + '&deptxt=' + this.data.deptxt + '&userid=' + this.data.userid
      });
    }
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    if (this.data.hadNew) {
      getSubItems({
        subprojectname: this.data.seach
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list ,this,"subproject");
          this.setData({
            InfoList: list,
            item,
            seach: ''
          })
          wx.hideLoading();
        }
      })
    } else {
      if (this.data.ISconduct) {
        if (this.data.seach) {
          groupSubItems({
            keyword: this.data.seach,
            state: this.data.info.state,
            UserName: userinfo.UserName
          }).then(res => {
            if (res.code == 10000) {
              item = res.List;
              list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this,"subproject");
              this.setData({
                InfoList: list,
                item,
                seach: ''
              })
              wx.hideLoading();
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          groupSubItems({
            state: this.data.info.state,
            UserName: userinfo.UserName
          }).then(res => {
            if (res.code == 10000) {
              item = res.List;
              list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this, "subproject");
              this.setData({
                InfoList: list,
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
        groupSubItems({
          keyword: this.data.seach,
          chargemanName: this.data.info.chargemanName
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            item = res.List;
            list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this, "subproject");
            this.setData({
              InfoList: list,
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
  getLIST(options) {
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    // console.log(options)
    if (options.id || options.rid) {
      this.setData({
        options: options
      })
    }
    if (options.userid) {
      let info = this.data.info;
      info.departmentID = options.dep;
      info.chargemanName = options.userid;
      this.setData({
        top: options.caption + '的分包项目',
        hadNew: 0,
        info,
        departmenttext: options.deptxt,
        userid: options.userid,
        deptxt: options.deptxt,
        caption: options.caption,
        dep: options.dep
      })
      if (options.caption == '我') {
        this.setData({
          me: 1,
        })
      }
      if (options.caption == '我申请') {
        this.setData({
          applyT: 1
        })
      }
      if (options.caption == '未处理') {
        info.state = options.caption;
        info.UserName = userinfo.UserName;
        delete info.departmentID;
        delete info.chargemanName;
        this.setData({
          info,
          ISconduct: 1,
          departmenttext: '',
          val: 0,
          pact: [{
              text: '未处理的分包项目',
              value: 0
            },
            {
              text: '已处理的分包项目',
              value: 1
            },
            {
              text: '已超时的分包项目',
              value: 2
            }
          ],
        })
        groupSubItems({
          state: this.data.info.state,
          UserName: userinfo.UserName
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            item = res.List;
            list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this, "subproject");
            this.setData({
              InfoList: list,
              item
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        // 综合查询
        groupSubItems({
          chargemanName: options.userid
        }).then(res => {
          // console.log(res.List)
          if (res.code == 10000) {
            item = res.List;
            list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this, "subproject");
            this.setData({
              InfoList: list,
              item
            })
            wx.hideLoading();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      // 调用查询
      getSubItems().then(res => {
        // console.log(res.List)
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list, this, "subproject");
          this.setData({
            InfoList: list,
            item
          })
          wx.hideLoading();
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userinfo = wx.getStorageSync("myInfo");
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
    this.getLIST(options);
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
  changeItem(e) {
    list = [];
    console.log(e)
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info.state = StateStr;
    this.setData({
      info
    })
    wx.showLoading({
      title: "加载中..."
    })
    groupSubItems({
      state: StateStr,
      UserName: userinfo.UserName
    }).then(res => {
      // console.log(res.List)
      if (res.code == 10000) {
        item = res.List;
        list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this, "subproject");
        this.setData({
          InfoList: list,
          item
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
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
    list = [];
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      pages: 1
    })
    if (this.data.info.keyword || this.data.info.Type || this.data.info.departmentID || this.data.info.chargemanName || this.data.info.StartTime || this.data.info.state) {
      let info = this.data.info;
      if (info.Type) {
        this.data.firms.forEach(res => {
          if (info.Type == res.text) {
            info.Type = res.value;
          }
        })
        this.setData({
          info
        })
      }
      groupSubItems(this.data.info).then(res => {
        if (res.code == 10000) {
          item = res.List;
          list = util.listData(item.reverse(), app.globalData.department, this.data.pages, list,this, "subproject");
          this.setData({
            InfoList: list,
            item,
            info: {},
            departmenttext: ""
          })
          if (!this.data.hadNew) {
            let info = this.data.info;
            info.departmentID = this.data.dep;
            info.chargemanName = this.data.userid;
            if (this.data.ISconduct) {
              delete info.chargemanName;
              delete info.departmentID;
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
  // 分包项目名称
  keywordblur(e) {
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
  // 创建人
  chargemanNameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 开始时间
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
  // 结束时间
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
  },
  // 状态
  showPopup_3() {
    // console.log(userinfo)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
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
    this.getLIST(this.data.options);
    console.log(this.data.pact, this.data.caption, this.data.val)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (item.length > 5 && list.length < item.length) {
      this.setData({
        loading: true
      })
      let pages = this.data.pages,
        n = Math.ceil(item.length / 5);
      if (n > pages) {
        setTimeout(() => {
          pages = pages + 1;
          list = util.listData(item, app.globalData.department, pages, list);
          this.setData({
            pages,
            InfoList: list,
          })
        }, 1000)
      }
    } else {
      this.setData({
        loading: false
      })
    }
  },
  findnew(e) {
    let index = e.currentTarget.dataset.index - 1;
    wx.pageScrollTo({
      selector: '#new' + index,
      duration: 500
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})