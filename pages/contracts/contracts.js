// pages/contracts/contracts.js
import {
  queryMenu,
  getTaskTNUm,
  getapplyNEWinfo,
  getNEWinfo,
  getLeader,
  hotjob,
  getdep,
  leadership,
  querynotice
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
    dephot: false,
    news: false,
    back: false,
    ApplygetNew:false
  },
  deal() {
    // 请求一级菜单
    wx.showLoading({
      title: '加载中',
    })
    queryMenu({
      Timestamp: app.globalData.time,
      pid: 1,
    }).then(res => {
      console.log(res)
      var s = res.List
      var w = s[1]
      s[1] = s[0]
      s[0] = w
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
      console.log(res)
      zong = res.List
      zong.forEach(s => {
        s.control = true

        var path = s.pageaddres
        // //////console.log(path)
        if (path) {
          var a = path.substring(0, 1)
          if (a != '/') {
            s.pageaddres = '/' + path
          }
          s.pageaddres = path.replace(/[\r\n]/g, "");
        }
        s.name = s.name.replace(/[\r\n]/g, "");
        if (s.name == '我的任务') {
          s.TNUm = true
        }
        if (s.name == '我的申请') {
          s.ANUm = true
        }
        // if (s.name == '我的申请') {
        //   s.pageaddres = '/OAmoudle/pages/gmember/pact/pact'
        // }
        if (s.name == "招投标") {
          s.name = '投标'
        }
        if (s.ID == "登录/注册") {
          s.control = true
        }

      })
      // 有用户限制的菜单 
      queryMenu({
        Timestamp: app.globalData.time,
        pid: this.data.num,
        UId: this.data.id,
      }).then(ress => {
        console.log(ress)
        fen = ress.List
        console.log("用户菜单")
        console.log(fen)
        // 有用户的菜单
        if (ress.List == 0 || !ress.List) {
          for (i in zong) {
            // if (zong[i].menuId === null) {
            //   zong[i].control = true
            // } else {
            //   zong[i].control = false
            // }
            if ((zong[i].ID == '2121')) {
              zong[i].control = true
            } else {
              zong[i].control = false
            }


          }
        } else {
          // //console.log(zong)
          for (var i in zong) {
            if (fen.some(g => {
                // 如果有用户的菜单  和无用户的菜单 重合  赋予权限control 为true
                // var c = (g.ID == zong[i].ID) || (zong[i].menuId === null)
                var c = (g.ID == zong[i].ID)

                return c
              })) {
              zong[i].control = true
            } else {
              zong[i].control = false
            }
          }
        }
        zong.forEach(s => {
          if (s.name == '后台管理') {
            //console.log('后台管理')
            this.setData({
              back: s.control
            })
          }
        })
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
        // //////console.log(that.data.tags)
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
              if (that.data.num == 2091) {
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
            //console.log(that.data.num)
            if (that.data.num == '2090') {
              querynotice().then(res => {
                //console.log(res)
                if (res.code == 10000) {
                  var item = res.List.reverse()
                  if (item) {
                    var news = item.map(s => ({
                      name: s.name,
                      time: s.createtime.slice(5, 10),
                      id: s.ID
                    }))
                    //console.log()
                    if (news.length > 3) {
                      news = news.slice(0, 3)
                    }
                    that.setData({
                      news
                    })
                  }
                }
              })
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
        // //////console.log(res.data.ID)
        that.setData({
          id: res.data.UserName,
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
          // //////console.log('用户点击确定')
          wx.removeStorageSync("myInfo");
          wx.removeStorageSync("principal");
          wx.clearStorageSync();
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  message() {
    wx.redirectTo({
      url: `/OAmoudle/pages/notice/News/News?menuId=null&id=2113&title=新闻公告&num=2090&mtitle=公司oa项目&source=index`
    })
  },
  change1(e) {
    //console.log(e)
    //console.log(e.target.dataset.id)
    if (e.target.dataset.id) {
      wx.redirectTo({
        url: `/OAmoudle/pages/notice/Newsdetail/Newsdetail?id=${e.target.dataset.id}&oa=1`
      })
    }
  },
  // 90
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(11111111)
    console.log(options)
    //////console.log(options)
    console.log(app.globalData.GetRoles)
    userinfo = wx.getStorageSync("myInfo");
    this.setData({
      userinfo: userinfo
    })
    this.log() //判断是否登录
    if (options.grading !== undefined && options.grading !== "undefined") {
      this.setData({
        num: options.grading
      })
      if (options.title) {
        this.setData({
          title: options.title
        })
      }
    } else {
      this.setData({
        num: 2089,
        title: '项目管理'
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
        //console.log(res)
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
        if (s[0]) {
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
        } else {
          this.setData({
            depnum: false
          })
        }
      })
    }
  },
  onShow: function () {
    userinfo = wx.getStorageSync("myInfo");
  },
  clearData() {
    // wx.clearStorageSync();
    // wx.showToast({
    //   title: '缓存已清除！',
    //   icon: 'success',
    //   duration: 2000
    // })
    // wx.redirectTo({
    //   url: "/pages/login/login"
    // })
    wx.showModal({
      content: '是否清除缓存？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({
            title: '缓存已清除！',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '尚雍工程建设平台',
      path: '/pages/contracts/contracts?from_uid=' + userinfo.id,
      success: function (res) {}
    }
  }
})