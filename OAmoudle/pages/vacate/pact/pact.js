// pages/pact/pact.js
import {
  getVacate,
  groupVacate,
  Leavetypelist
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    count:0,
    loading: false,
    top: '请假',
    currentDate: new Date().getTime(),
    InfoList: [],
    item: [],
    pages: 1,
    hadNew: 1,
    info: {},
    applyT: 0,
    leavetypetext:'',
    task:false
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.title =='我的申请'|| menus.title=='我的任务') {
      wx.redirectTo({
        url: "/pages/current/current/current?title=" + this.data.options.title + '&id=' + (this.data.options.id || this.data.options.rid)
      });
    } else {
      util.returnMenu2(menus.id, menus.title);
    }
  },
  setSeach: function (event) {
    let that = this;
    var inputSearch = event.detail.value;
    that.setData({
    seach: inputSearch,
    count:1
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    if(this.data.seach){
     this.setData({
       'info.leavereason':this.data.seach
     })
    }
    groupVacate(this.data.info).then(res => {
      if (res.code == 10000) {
        console.log(res)
        let item = res.List;
        util.listData(item, app.globalData.department);
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })
  },
  changeItem(e) {
    console.log(e)
    let StateStr = (this.data.pact[e.detail].text).slice(0, 3);
    let info = this.data.info;
    info = {}
    info.UserName = userinfo.UserName
    info.state = StateStr;
    this.setData({
      info
    })
    this.seachInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(33333)
    console.log(option)
    this.setData({
      status:option.status
    })
    if(this.data.status==1){
      this.data.info.ApplygetNew=true
    }else{
      this.data.info.ApplygetNew=false
    }
    userinfo = wx.getStorageSync("myInfo");
    if (option.id || option.caption) {
      wx.setStorageSync('menus', option)
    }
    if(option.source){
      wx.setStorageSync('carte', option)
    }
    var options = wx.getStorageSync("menus")
    this.setData({
      options,
      section1:app.globalData.getstaff
    })
    if (options.title == '我的任务') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName
      info.state = '未处理'
      this.setData({
        info,
        options,
        ISconduct: 1,
        val: 0,
        pact: [{
            text: '未处理的请假',
            value: 0
          },
          {
            text: '已处理的请假',
            value: 1
          },
          {
            text: '已超时的请假',
            value: 2
          }
        ]
      })
    }
    console.log(options.title == '我的申请')
    if (options.title == '我的申请') {
      let info = this.data.info;
      info = {}
      info.applyman = userinfo.UserName
      this.setData({
        info,
        options,
        top: '我申请的请假',
        applyT: 1
      })
    }
    if (options.title == '我的信息') {
      let info = this.data.info;
      info = {}
      info.applyman = userinfo.UserName
      this.setData({
        info,
        options,
        top: '我的请假'
      })
    }
    if (options.id == '2110') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName,
      info.state = '所有'
      this.setData({
        options,
        info,
        task:true
      })
    }

    wx.showLoading({
      title: '加载中',
    });
    // 调用查询
    this.seachInfo()
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.getdept,
        Leavetypelist: app.globalData.Leavetypelist,
        states: app.globalData.states
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.department,
            Leavetypelist: app.globalData.Leavetypelist,
            states: app.globalData.states,
           
          })
        }
      }
    }
  },
  showgroup(){
    this.setData({
      show: true,
    })
    this.showgroup11()
  },
  // 组合查询
  showgroup11() {
    var options = this.data.options
    if (options.title == '当前任务') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName
      info.state = '未处理'
      this.setData({
        info
      })
    }
    if (options.title == '我的申请') {
      let info = this.data.info;
      info = {}
      info.applyman = userinfo.UserName
      this.setData({
        info
      })
    }
    if (options.title == '我的信息') {
      let info = this.data.info;
      info = {}
      info.applyman = userinfo.UserName
      this.setData({
        info
      })
    }
    if (options.id == '2110') {
      let info = this.data.info;
      info = {}
      info.UserName = userinfo.UserName,
      info.state = '所有'
      this.setData({
        info
      })
    }

  },
  onClose() {
    this.setData({
      show: false
    })
    this.showgroup11()
  },
  onConfirm_seach() {
    console.log(this.data.applyT)
    util.qgroupdeliver(groupVacate, this,'','',this.showgroup11)
  },
  // 申请人
  applymanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 请假类型
  showPopup_1() {
    this.setData({
      show_1: true
    })
  },
  onClose_1() {
    this.setData({
      show_1: false
    })
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      show_1: false,
      info
    })
  },
    // 请假类型
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
      let info = util.editInfo(e, this, e.detail.value.value);
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
  // 请假事由
  leavereasonblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 请假天数
  leavedaysblur(e) {
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
    if (userinfo) {
      let info = this.data.info;
      info.UserName = userinfo.UserName;
      this.setData({
        show_3: true,
        info
      })
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
    console.log(e)
    let index = e.currentTarget.dataset.index - 1;
    wx.pageScrollTo({
      selector: '#new' + index,
      duration: 500
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})