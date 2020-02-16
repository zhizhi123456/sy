// pages/contracts/contracts.js
import {
  queryMenu,
  getTaskTNUm,
  getapplyNEWinfo,
  getNEWinfo,
  getLeader,
  hotjob,
  getdep,
  leadership
} from "../../service/getData";
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deng: false,
    id: "",
    title: '',
    tags: [],
    lists: [],
    num: 1000,
    login: true,
    exist: '',
    deng: '',
    dephot: false

  },
  deal() {
    // 请求一级菜单
    wx.showLoading({
      title: '加载中',
    })
    queryMenu({
      Timestamp: app.globalData.time,
      pid: 0,
    }).then(res => {
      // //console.log(res)
      var s = res.List
      var w = s[0]
      s[0] = s[1]
      s[1] = w
      var t = s
      // var t = s.filter((a, index) => {
      //   return index != 3
      // })

      this.setData({
        tags: t,
        tag: t
      })
      wx.hideLoading()
    })
  },
  // 请求二级菜单
  screen() {
    wx.showLoading({
      title: '加载中',
    })
    this.log()
    var zong = []
    var fen = []
    // 没有用户限制的菜单   所有菜单
    queryMenu({
      Timestamp: app.globalData.time,
      pid: this.data.num,
    }).then(res => {
      ////console.log(res)
      zong = res.List
      zong.forEach(s => {
        s.control = true
        if (s.name == '当前任务') {
          s.TNUm = true
        }
        if (s.name == '我的申请') {
          s.ANUm = true
        }

        var path = s.pageaddres
        // ////console.log(path)
        if (path) {
          var a = path.substring(0, 1)
          if (a != '/') {
            s.pageaddres = '/' + path
          }
          // ////console.log(path == "/pages/secondary/secondary")
          s.pageaddres = path.replace(/[\r\n]/g, "");
        }
        ////console.log(path)

      })
      // 有用户限制的菜单 
      queryMenu({
        Timestamp: app.globalData.time,
        pid: this.data.num,
        UId: this.data.id,
      }).then(ress => {
        fen = ress.List
        // ////console.log("用户菜单")
        // ////console.log(fen)
        // 有用户的菜单
        if (ress.List == 0) {
          for (i in zong) {
            if (zong[i].menuId === null) {
              zong[i].control = true
            } else {
              zong[i].control = false
            }

          }
        } else {
          // console.log(zong)
          for (var i in zong) {
            if (fen.some(g => {
                // 如果有用户的菜单  和无用户的菜单 重合  赋予权限control 为true
                var c = (g.ID == zong[i].ID) || (zong[i].menuId === null)
                return c
              })) {
              zong[i].control = true
            } else {
              zong[i].control = false
            }
          }
        }
        zong.forEach(d => {
          if (d.name == '施工队管理') {
            if (!this.data.deng) {
              d.control = false
            }
          }
        })
        if (this.data.num == 1002) {
          // console.log(zong)
          if (this.data.hotnum) {
            zong.push({
              ID: 1099,
              PID: 1099,
              control: true,
              icon: "icon-weiwangguanicon-defuben-",
              menuId: null,
              name: "紧急任务",
              pageaddres: "/pages/hot/mself/mself",
              hot: true
            })
          }
          zong.push({
            ID: 1044,
            PID: 10224,
            control: true,
            icon: "icon-jinji",
            menuId: null,
            name: "紧急任务(部门)",
            pageaddres: "/pages/hot/lead/lead",
            dephot: true
          })
        }
        this.setData({
          lists: zong
        })
        // 测试
        // this.setData({
        //   lists: this.data.list.reverse()
        // })
        // 设置title
        for (var s in this.data.tag) {
          if (this.data.tag[s].ID == this.data.num) {
            this.setData({
              title: this.data.tag[s].name
            })
          }
        }
        var that = this
        // ////console.log(that.data.tags)
        wx.getStorage({
          key: 'myInfo',
          success(res) {
            if (res.data.ID) {
              that.setData({
                exist: res.data.ID
              })
              var s = that.data.tags
              var d = s.findIndex(a => {
                return a.name == '我的/登录'
              })
              if (d > -1) {
                s[d].name = '我的'
                that.setData({
                  tags: s
                })
              }
              if (that.data.num == 1002) {
                let item = that.data.lists;
                item.shift();
                that.setData({
                  lists: item,
                  entered: true
                })
                getLeader({
                  UserName: userinfo.UserName
                }).then(res => {
                  let resARR = JSON.parse(res);
                  if (resARR.length) {
                    wx.setStorageSync("principal", res);
                  } else {
                    item.splice(2, 1)
                    that.setData({
                      lists: item,
                    })
                  }
                })
                // 设置title
                for (var s in that.data.tag) {
                  if (that.data.tag[s].ID == that.data.num) {
                    that.setData({
                      title: that.data.tag[s].name
                    })
                  }
                }
              }
            }
          },
          fail(res) {
            var s = that.data.tags
            var d = s.findIndex(a => {
              return a.name == '我的/登录'
            })
            if (d > -1) {
              s[d].name = '登录'
              that.setData({
                tags: s
              })
            }
          }
        })
        wx.hideLoading()

      })
    })
  },
  // 点击tab时
  change(i) {
    this.setData({
      num: i.currentTarget.dataset.change
    })
    this.screen()
  },
  task() {
    wx.navigateTo({
      url: "/pages/current/current/current",
    })
  },
  // 判断登录
  log() {
    var that = this
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // ////console.log(res.data.ID)
        that.setData({
          id: res.data.ID,
          deng: true
        })
      }
    })
  },
  out() {
    wx.showModal({
      content: '是否登出当前账号？',
      success(res) {
        if (res.confirm) {
          // ////console.log('用户点击确定')
          wx.removeStorageSync("myInfo");
          wx.removeStorageSync("principal");
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  // 90
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ////console.log(options)
    userinfo = wx.getStorageSync("myInfo");
    this.log() //判断是否登录
    if (options.grading !== undefined && options.grading !== "undefined") {
      this.setData({
        num: options.grading
      })
    } else {
      this.setData({
        num: 1001,
        title: '项目合同'
      })
    }
    this.deal()
    this.screen()
    if (userinfo) {
      getapplyNEWinfo({
        UserName: userinfo.UserName
      }).then(res => {
        if (res.code == 10000) {
          let item = res.List,
            applyNUM = 0;
          item.forEach(element => {
            applyNUM += element.Number;
          });
          this.setData({
            applyNUM
          })
        }
      })
      getTaskTNUm({
        UserName: userinfo.UserName
      }).then(res => {
        // ////console.log(res)
        if (res.code == 10000) {
          let item = res.List,
            TaskTNUm = 0;
          item.forEach(element => {
            TaskTNUm += element.Number;
          });
          this.setData({
            TaskTNUm
          })
        }
      })
      hotjob({
        UserName: userinfo.UserName
      }).then(res => {
        if (res.code == 10000) {
          if (res.urgentTaskList.Num == 0) {
            this.setData({
              hotnum: false
            })
          } else {
            this.setData({
              hotnum: res.urgentTaskList.Num
            })
          }
        }
      })

      getdep({
        UserName: userinfo.UserName
      }).then(res => {
        var s = JSON.parse(res)
        leadership({
          departmentID: s[0].ID
        }).then(res => {
          if (res.code == 10000) {
            if (res.urgentTaskList.Num == 0) {
              this.setData({
                depnum: false
              })
            } else {
              this.setData({
                depnum: res.urgentTaskList.Num
              })
            }

          }
        })

      })


    }
  },
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },

})