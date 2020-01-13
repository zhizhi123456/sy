// pages/secondarys/secondarys.js
import {
  queryMenu,
  getdep
} from "./../../service/getData";
var app = getApp();
var util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rid: "",
    title: "",
    chuancan: 1003,
    small: [{
        nametext: "分包合同",
        img: "icon-fenbaohetong .green",
        path: "/pages/contract/pact/pact",
        control: true //权限
      },
      {
        nametext: "工程协调",
        img: "icon-renminxietiaojiexiehui .pink",
        path: "/pages/harmonize/pact/pact",
        control: true //权限
      },
      {
        nametext: "技术交底",
        img: "icon-jishuziliao .blue2",
        path: "/pages/disclosure/pact/pact",
        control: true //权限
      },
      {
        nametext: "人员定位",
        img: "icon-renyuandingwei .blue",
        path: "/pages/location/location",
        control: true //权限
      },
      {
        nametext: "人员轨迹",
        img: "icon-guiji .blue4",
        path: "/pages/track/track",
        control: true //权限
      },
      {
        nametext: "现场考勤",
        img: "icon-kaoqin1 .red2",
        path: "/pages/sign/pact/pact",
        control: true //权限
      },
      {
        nametext: "项目例会",
        img: "icon-huiyi .blue5",
        path: "/pages/projectmeet/pact/pact",
        control: true //权限
      },
      {
        nametext: "工程台账",
        img: "icon-taizhang .blue6",
        path: "/pages/ledger/pact/pact",
        control: true //权限
      }, {
        nametext: "项目进度（每周）",
        img: "icon-schedule .blue7",
        path: "/pages/plan/pact/pact",
        control: true //权限
      },
      {
        nametext: "开停工通知",
        img: "icon-tongzhi .blue7",
        path: "/pages/workorder/pact/pact",
        control: true //权限
      },
      {
        nametext: "开工报告",
        img: "icon-baogao1 .blue7",
        path: "/pages/startUp/pact/pact",
        control: true //权限
      },
      {
        nametext: "完工报告",
        img: "icon-baogao3 .blue7",
        path: "/pages/complete/pact/pact",
        control: true //权限
      },

      {
        nametext: "仓库材料查询",
        img: "icon-zhongguohangtiantubiaoheji-weizhuanlunkuo- .green2",
        path: "/pages/material/pact/pact",
        control: true //权限
      }, {

        nametext: "领料申请",
        img: "icon-shenqing .red2",
        path: "/pages/bill/pact/pact",
        control: true //权限
      }, {

        nametext: "退料申请",
        img: "icon-wj-thwj .blue3",
        path: "/pages/returnmaterial/pact/pact",
        control: true //权限
      }, {

        nametext: "材料领用查询 ",
        img: "icon-zaitu .red2",
        path: "",
        control: true //权限
      }, 
      // 1
      {
        nametext: "材料使用查询",
        img: "icon-chaxun .green2",
        path: "/pages/employ/pact/pact",
        control: true //权限
      },
      
      
      {
        nametext: "采购送货查询",
        img: "icon-chaxun .green2",
        path: "/pages/deliver/pact/pact",
        control: true //权限
      }, {
        nametext: "材料采购查询",
        img: "icon-chaxun1 .green",

        path: "/pages/materialPurchase/pact/pact",
        control: true //权限
      },
      {
        nametext: "视频监控",
        img: "icon-shipinjiankong .blue8",
        path: "",
        control: true //权限
      },
      {
        nametext: "通话记录",
        img: "icon-tonghuajilu .green3",
        path: "/pages/talk/pact/pact",
        control: true //权限
      },
      {
        nametext: "现场罚单",
        img: "icon-chufadan .red3 ",
        path: "/pages/sceneticket/pact/pact",
        control: true //权限
      },

      {

        nametext: "项目经理随工记录",
        img: "icon-tubiaozhizuomoban .yellow",
        path: "/pages/workrecord/pact/pact",
        control: true //权限
      },
      {

        nametext: "项目主管随工记录",
        img: "icon-bianji .blue3",
        path: "/pages/workrecord/pact/pact",
        control: true //权限
      },
      {

        nametext: "隐蔽工程",
        img: "icon-yinbigongcheng .blue9",
        path: "/pages/shelter/pact/pact",

        control: true //权限
      },
      {

        nametext: "项目月度考评",
        img: "icon-kaohe .red4",
        path: "/pages/check/pact/pact",
        control: true //权限
      },
      {

        nametext: "项目月度报表",
        img: "icon-baobiao2 .yellow1",
        path: "/pages/report/pact/pact",
        control: true //权限
      },
      {
        nametext: "工程变更",
        img: "icon-gongchengbiangengshenpi .green4",
        path: "/pages/variation/pact/pact",
        control: true //权限
      },
      {
        nametext: "设计管理",
        img: "icon-lunkuodasan- .green4",
        path: "/pages/design/pact/pact",
        control: true //权限
      },
      // 1
      // {

      //   nametext: "技术交底",
      //   img: "icon-jishuziliao ",
      //   path: "",
      //   control: true //权限
      // },
      {

        nametext: "重大事故报告",
        img: "icon-baogao .red3",
        path: "/pages/accident/pact/pact",
        control: true //权限
      },
      {

        nametext: "安防质量验收",
        img: "icon-anfang .red3",
        path: "/pages/security/pact/pact",
        control: true //权限
      },
      {

        nametext: "建筑分部验收",
        img: "icon-jianzhu .red3",
        path: "/pages/building/pact/pact",
        control: true //权限
      },
      {

        nametext: "工程质量报告",
        img: "icon-zhiliangjiance .red3",
        path: "/pages/quality/pact/pact",
        control: true //权限
      },
      {

        nametext: "线缆质量验收",
        img: "icon-xianlan .red3",
        path: "/pages/cable/pact/pact",
        control: true //权限
      },
      // 1
      {

        nametext: "工程管道验收",
        img: "icon-zhijiaoguandao .red3",
        path: "/pages/pipes/pact/pact",
        control: true //权限
      },


      {

        nametext: "项目成本利润统计",
        img: "icon-chengbenfenxi- .blue10",
        path: "/pages/count/pact/pact",
        control: true //权限
      },
      {

        nametext: "项目费用统计",
        img: "icon-shouzhimingxi .yellow2",
        path: "/pages/cost/pact/pact",
        control: true //权限
      },
      {

        nametext: "项目工程量统计",
        img: "icon-report .green2",
        path: "/pages/quantity/pact/pact",
        control: true //权限
      },
      {

        nametext: "项目工程材料统计",
        img: "icon-yuancailiao .green2",
        path: "/pages/unify/pact/pact",
        control: true //权限
      },
      // 1
      {

        nametext: "工程接受签证单",
        img: "icon-jieshouweituo .green2",
        path: "/pages/adopt/pact/pact",
        control: true //权限
      },
      
      {
        nametext: "工程结算签证明细",
        img: "icon-chuyuanjiesuan .green2",
        path: "/pages/close/pact/pact",
        control: true //权限
      },
      {
        nametext: "请假",
        img: "icon-qingjia .green",
        path: "",
        control: true //权限
      },
      {
        nametext: "销假",
        img: "icon-xiaojiaguanli .pink",
        path: "",
        control: true //权限
      },
      {

        nametext: "加班",
        img: "icon-jiaban .blue",
        path: "",
        control: true //权限
      },
      {

        nametext: "考勤",
        img: "icon-kaoqin .blue2",
        path: "",
        control: true //权限
      },
      {

        nametext: "公告",
        img: "icon-gonggao .blue3",
        path: "",
        control: true //权限
      },
      {

        nametext: "办公费用",
        img: "icon-feiyong1 .blue4",
        path: "",
        control: true //权限
      },
      {

        nametext: "申领",
        img: "icon-icon-test2 .red2",
        path: "",
        control: true //权限
      },
      {

        nametext: "申购",
        img: "icon-shengou .blue5",
        path: "",
        control: true //权限
      },
      {

        nametext: "项目费用",
        img: "icon-feiyong blue6",
        path: "",
        control: true //权限
      },
      {

        nametext: "发票",
        img: "icon-ticket-fill .blue7",
        path: "",
        control: true //权限
      },
      {

        nametext: "用章",
        img: "icon-yongzhangshenqing .green2",
        path: "",
        control: true //权限
      },
      {

        nametext: "借条",
        img: "icon-huikuanjihua .blue8",
        path: "",
        control: true //权限
      },
      {

        nametext: "采购合同",
        img: "icon-hetong1 .green3",
        path: "",
        control: true //权限
      },

      {

        nametext: "付款签报",
        img: "icon-fukuan .red3",
        path: "",
        control: true //权限
      },
      {

        nametext: "业务预期",
        img: "icon-yewu .yellow",
        path: "",
        control: true //权限
      },

      {

        nametext: "市场设计计划",
        img: "icon-design .blue9",
        path: "",
        control: true //权限
      },
      {

        nametext: "市场部计划",
        img: "icon-wj-jh .red4",
        path: "",
        control: true //权限
      },
      {

        nametext: "成本核算计划",
        img: "icon-tubiaozhizuomoban .yellow1",
        path: "",
        control: true //权限
      },
      {

        nametext: "工程部计划",
        img: "icon-wj-jh .green4",
        path: "",
        control: true //权限
      },
      {

        nametext: "市场设计绩效",
        img: "icon-gerenjixiao .blue10",
        path: "",
        control: true //权限
      },
      {

        nametext: "市场部绩效",
        img: "icon-jixiao .yellow2",
        path: "",
        control: true //权限
      },

      {

        nametext: "办公物品",
        img: "icon-bangong .red5",
        path: "",
        control: true //权限
      }, {

        nametext: "耗材物品",
        img: "icon-haocai .blue7",
        path: "",
        control: true //权限
      }, {

        nametext: "快递发货",
        img: "icon-fahuo .green2",
        path: "",
        control: true //权限
      }, {
        nametext: "快递收货",
        img: "icon-shouhuoshou-- .red3",
        path: "",
        control: true //权限
      },
      {
        nametext: "个人信息",
        img: "icon-gerenxinxi green",
        path: "/pages/Personal/pact/pact",
        control: true,
      },
      {
        nametext: "我的分包项目",
        img: "icon-xiangmu1 blue",
        path: '/pages/subcontract/pact/pact',
        control: true,
      },
      {
        nametext: "我的分包合同",
        img: "icon-hetong2 blue2",
        path: "/pages/contract/pact/pact",
        control: true,
      },
      {
        nametext: "我的费用",
        img: "icon-feiyong2 blue4",
        path: "/pages/cost/pact/pact",
        control: true,
      },
      {
        nametext: "我的考勤",
        img: "icon-kaoqin1 red2",
        path: "/pages/sign/pact/pact",
        control: true,
      },
      {
        nametext: "我的轨迹",
        img: "icon-guiji1 blue5",
        path: "/pages/track/track",
        control: true,
      },
      {
        nametext: "我的定位",
        img: "icon-duomeitiicon- green2",
        path: "/pages/location/location",
        control: true,
      },
      {
        nametext: "我的任务书",
        img: "icon-lunkuodasan- green2",
        path: "/pages/task/pact/pact",
        control: true //权限
      },
      {
        nametext: "我的设计任务",
        img: "icon-lunkuodasan- .green4",
        path: "/pages/design/pact/pact?hadMy=1",
        control: true //权限
      },
      {
        nametext: "施工队",
        img: "icon-renyuandingwei green2",
        path: "/pages/contractor/pact/pact",
        control: true //权限
      },
      {
        nametext: "施工队成员",
        img: "icon-lunkuodasan- .green4",
        path: "/pages/member/pact/pact",
        control: true //权限
      },
      // {
      //   nametext: "申请领料",
      //   img: "icon-yuancailiao blue8",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请费用",
      //   img: "icon-feiyong2 yellow",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请分包编号",
      //   img: "icon-bianhaonumbered5 red4",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请招投标",
      //   img: "icon-zhaotoubiao-daikaifang yellow1",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请领料",
      //   img: "icon-yuancailiao blue8",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请费用",
      //   img: "icon-feiyong2 yellow",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请分包编号",
      //   img: "icon-bianhaonumbered5 red4",
      //   path: "",
      //   control: true,
      // },
      // {
      //   nametext: "申请招投标",
      //   img: "icon-zhaotoubiao-daikaifang yellow1",
      //   path: "",
      //   control: true,
      // },

      // {
      //   nametext: "申请任务书",
      //   img: "icon-lunkuodasan- blue10",
      //   path: "",
      //   control: true,
      // },

    ],
    smalls: []
  },
  screen() {
    wx.showLoading({
      title: '加载中',
    })
    var zong = []
    var fen = []
    queryMenu({
      Timestamp: app.globalData.time,
      pid: this.data.chuancan,
    }).then(res => {
      // 请求所有模块    不带uid
      console.log(res)
      var n = 0
      for (var k in res.List) {
        for (var i in this.data.small) {
          // 如果有相同的名字添上地址  颜色  
          if (res.List[k].name == this.data.small[i].nametext) {
            zong.push(this.data.small[i])
            zong[n].ID = res.List[k].ID
            zong[n].menuId = res.List[k].menuId
            zong[n].icon = res.List[k].icon
            zong[n].PID = res.List[k].PID
            n++
          }

        }
      }
      // 请求当前用户模块
      queryMenu({
        Timestamp: app.globalData.time,
        pid: this.data.chuancan,
        UId:this.data.id
      }).then(ress => {
        // console.log(ress)
        var c = 0
        fen = []
        for (var w in ress.List) {
          for (var v in this.data.small) {
            // 如果有相同的  添上地址 颜色
            if (ress.List[w].name == this.data.small[v].nametext) {
              fen.push(this.data.small[v])
            }
          }
        }
        // 判断用户权限
        // console.log(fen)
        // 如果用户一个数据也没有   所有权限为fasle
        if (fen.length == 0) {
          console.log("数组为空")
          for (i in zong) {
            zong[i].control = false
          }

        } else {
          // 如果 用户请求的列表中不含总列表中的模块    权限为fasle
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
          smalls: zong
        })
        // 测试
        // this.setData({
        //   // smalls: this.data.small
        // })
        wx.hideLoading()

      })
    })
  },
  back() {
    if (this.data.chuancan == "wode" || this.data.chuancan == "xiangmuhetong") {
      wx.navigateTo({
        url: '/pages/contract/contract'
      })
      console.log(1)
    } else if (this.data.chuancan == 1055) {
      util.returnMenu(1002);
    } else {
      util.returnMenu();
    }

  },
  checkperson() {
    if (!this.data.userinfo) {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let userinfo = wx.getStorageSync("myInfo");
    if (userinfo) {
      getdep({
        UserName: userinfo.UserName
      }).then(res => {
        // console.log(res);
        let resData = JSON.parse(res);
        this.setData({
          userinfo,
        })
        if (options.id == 1055) {
          this.setData({
            userid: userinfo.UserName,
            caption: '我',
            dep: resData[0].ID,
            deptxt: resData[0].techofficename,
          })
        }
      })
    }
    var that = this;
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // console.log(res.data.ID)
        that.setData({
          id: res.data.ID
        })
      }
    })
    // console.log(options.title)
    // 页面初始加载 检测传入id 传入传参
    if (!options.id) {
      this.setData({
        chuancan: 1003
      })
    } else {
      this.setData({
        chuancan: options.id,
        title: options.title
      })
    }

    // console.log(this.data)
    // console.log(this.data.chuancan)
    this.screen()
  }
})