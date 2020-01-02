// pages/contracts/contracts.js

import {
  queryMenu,
} from "./../../service/getData";
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: '',
    tags: [],
    lists: [],
    num: 1000,
    tag: [{
        nametext: "工程管理",
        img: "icon-gongchengguanli- .yellow1", //图标地址
      },
      {
        nametext: "项目合同",
        img: "icon-web-icon- .red3", //图标地址
      },
      {
        nametext: "公司oa项目",
        img: "icon-OAshenpi .green7 ", //图标地址
      },
      {
        nametext: "我的/登录",
        img: ".icon-wode .green6", //图标地址
      }
    ],
    list: [{
        nametext: "工程准备",
        img: "icon-zhunbeiliangchan blue", //图标地址
        path: "/pages/secondary/secondary", //w\网页地址 没有则不开放
        control: true, //是否有权限
      },
      {
        nametext: "人员管理",
        img: "icon-drxx91 blue",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "项目进度",
        img: "icon-jindu green2",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "材料管理",
        img: "icon-cailiaojinchang blue1",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "施工现场",
        img: "icon-construction green ",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "项目绩效",
        img: "icon-jixiao red1",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "技术管理",
        img: "icon-guanyugongsi-jishu .blue2",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "质量验收",
        img: "icon-zhilianganquan orange",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "工程统计",
        img: ".icon-tongji green1",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "日常办公",
        img: "icon-bangong1",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "业务处理",
        img: "icon-dingdanchulizhong",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "计划与绩效",
        img: "icon-jixiaokaoping",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },
      {
        nametext: "物品管理",
        img: "icon-ico_wupinguanli_xiangmuxinxiweihu",
        path: "/pages/secondary/secondary",
        control: true, //权限
      },

      {

        nametext: "招投标",
        img: "icon-zhaotoubiao red1",
        path: "",
        control: true, //权限,
        three: true
      }, {

        nametext: "总包项目",
        img: "icon-_huabanfuben blue3",
        path: "/pages/contractproject/pact/pact",
        control: true, //权限
        three: true
      }, {

        nametext: "总包合同",
        img: "icon-hetong orange",
        path: "/pages/generalcontract/pact/pact",
        control: true //权限
          ,
        three: true
      }, {

        nametext: "任务书",
        img: "icon-renwu green3",
        path: "/pages/task/pact/pact",
        control: true //权限
          ,
        three: true
      }, {

        nametext: "项目统计",
        img: "icon-icon-test1 yellow",
        path: "",
        control: true, //权限
        three: true
      }, {

        nametext: "分包编号申请",
        img: "icon-shenqing red3",
        path: "/pages/pointsnumber/pact/pact",
        control: true,
        three: true
      }, {

        nametext: "框架协议",
        img: "icon-yonghuxieyi blue4",

        path: "/pages/deal/pact/pact",
        control: true //权限
          ,
        three: true
      }, {

        nametext: "分包项目",
        img: "icon-web-icon- .blue",
        path: "/pages/subcontract/pact/pact",
        control: true //权限,
          ,
        three: true
      },
      {

        nametext: "登录/注册",
        img: "icon-zhuce blue4",
        path: "/pages/login/login",
        control: true, //权限
        three: true
      }, {
        nametext: "我的信息",
        img: "icon-gerenzhongxinyewodexinxi  yellow1",
        path: "pages/Personal/pact/pact",
        control: true //权限
      }, {

        nametext: "我的申请",
        img: "icon-shenqing1 .red1",
        path: "",
        control: true //权限
      }, {

        nametext: "部门管理",
        img: "icon-bumen.green4",
        path: "/pages/section/section",
        control: true, //权限
        three: true
      },
      {
        nametext: "当前任务",
        img: "icon-renwu .green5",
        path: "/pages/current/current/current",
        control: true,
        three: true
      }
    ],
    login: true,
    exist:''

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
      // console.log(res)
      var s = []
      var n = 0
      for (var k in res.List) {
        for (var i in this.data.tag) {
          if (res.List[k].name == this.data.tag[i].nametext) {
            s.push(this.data.tag[i])
            s[n].ID = res.List[k].ID
            s[n].menuId = res.List[k].menuId
            s[n].icon = res.List[k].icon
            s[n].PID = res.List[k].PID
            n++
          }
        }
      }
      this.setData({
        tags: s
      })
      console.log(this.data.tags)
      this.log()
      wx.hideLoading()

    })
  },
  screen() {
    wx.showLoading({
      title: '加载中',
    })
    var zong = []
    var fen = []
    // if (this.data.login) {
    queryMenu({
      Timestamp: app.globalData.time,
      pid: this.data.num,
    }).then(res => {
      var n = 0
      for (var k in res.List) {
        for (var i in this.data.list) {
          if (res.List[k].name == this.data.list[i].nametext) {
            zong.push(this.data.list[i])
            zong[n].ID = res.List[k].ID
            zong[n].menuId = res.List[k].menuId
            zong[n].icon = res.List[k].icon
            zong[n].PID = res.List[k].PID
            n++
          }
        }
      }
      queryMenu({
        Timestamp: app.globalData.time,
        pid: this.data.num,
        // UId: this.data.id,
      }).then(ress => {
        // console.log(ress)
        fen = []
        for (var w in ress.List) {
          for (var v in this.data.list) {
            if (ress.List[w].name == this.data.list[v].nametext) {
              fen.push(this.data.list[v])
            }
          }
        }
        // console.log(fen)
        if (fen.length == 0) {
          console.log("数组为空")
          for (i in zong) {
            zong[i].control = false
          }

        } else {
          // console.log(zong)
          for (var i in zong) {
            if (fen.some(g => {
                var c = g.nametext == zong[i].nametext
                return c
              })) {

            } else {
              zong[i].control = false
            }
          }
        }
        // console.log(zong)
        this.setData({
          lists: zong
        })
        // 测试
        // this.setData({
        //   lists: this.data.list.reverse()
        // })

        for (var s in this.data.tag) {
          if (this.data.tag[s].ID == this.data.num) {
            this.setData({
              title: this.data.tag[s].nametext
            })
          }
        }
        var that = this
        wx.getStorage({
          key: 'myInfo',
          success(res) {
            console.log(res.data.ID)
            if (res.data.ID) {
              that.setData({
                exist:res.data.ID
              })
              var s = that.data.tags
              console.log(that.data.tags)
              var d = s.findIndex(a => {
                return a.nametext == '我的/登录'
              })
              s[d].nametext = '我的'
              that.setData({
                 tags:s
              })
              
            }
          },
          fail(res){
            var s = that.data.tags
            var d = s.findIndex(a => {
              return a.nametext == '我的/登录'
            })
            s[d].nametext = '登录'
            that.setData({
              tags:s
           })
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
    // wx.setStorage({
    //   key:"key",
    //   data:"value"
    // }) 
    var that = this
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // console.log(res.data.ID)
        that.setData({
          id: res.data.ID
        })
      }

    })

    
  },
  // 90
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.log() //判断是否登录
    // console.log(options.grading)
    if (options.grading !== undefined && options.grading !== "undefined") {
      this.setData({
        num: options.grading
      })
      // console.log("1")
    } else {
      this.setData({
        num: 1000,
        title: '工程管理'
      })
    }
    //渲染数据
    this.deal()
    this.screen()

 
  }

})