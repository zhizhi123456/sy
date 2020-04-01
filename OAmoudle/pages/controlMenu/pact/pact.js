// OAmoudle/pages/organize/pact/pact.js
import {
  getRoleMenu,
  queryrole,
  addRoleMenu
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
// pages/tree/tree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    section: '',
    user: '',
    original: [],
    changedata: [],
    changelist: [],
    adddata: [],
    deldata:[]
  },
  // MenuList: Array(4)
  // 0:
  // ID: 1000
  // IsEnabled: false
  // MenuLayer: 0
  // Name: "工程管理"
  // PID: 0
  // Submenu: Array(9)
  // 0:
  // ID: 1003
  // IsEnabled: false
  // MenuLayer: 1
  // Name: "工程准备"
  // PID: 1000
  // Submenu: Array(5)
  // 0:
  // ID: 1012
  // IsEnabled: false
  // MenuLayer: 2
  // Name: "分包合同"
  // PID: 1003
  // Submenu: []
  // icon: "icon-fenbaohetong"
  // menuId: "ac4b96de-ad66-4561-ba3d-e42f5886251c"
  // pageaddres: "/pages/contract/pact/pact"
  // __proto__: Object
  // 1: {ID: 1013, Name: "工程协调", menuId: "", icon: "icon-renminxietiaojiexiehui", PID: 1003, …}
  // 2: {ID: 1014, Name: "分包协议", menuId: "", icon: "icon-yonghuxieyi", PID: 1003, …}
  // 3: {ID: 1015, Name: "技术交底", menuId: "5a0b7d5e-62de-452c-b242-7e8e0f2f78fd", icon: "icon-jishuziliao", PID: 1003, …}
  // 4: {ID: 1016, Name: "施工设计交底", menuId: "", icon: "icon-dashujukeshihuaico-", PID: 1003, …}
  // length: 5
  // nv_length: (...)
  // __proto__: Array(0)
  // icon: "icon-zhunbeiliangchan"
  // menuId: ""
  // pageaddres: "/pages/secondary/secondary"
  // __proto__: Object
  // 1: {ID: 1004, Name: "人员管理", menuId: "", icon: "icon-drxx91", PID: 1000, …}
  // 2: {ID: 1005, Name: "项目进度", menuId: "", icon: "icon-jindu", PID: 1000, …}
  // 3: {ID: 1006, Name: "材料管理", menuId: "", icon: "icon-cailiaojinchang", PID: 1000, …}
  // 4: {ID: 1007, Name: "施工现场", menuId: "", icon: "icon-construction", PID: 1000, …}
  // 5: {ID: 1008, Name: "项目绩效", menuId: "", icon: "icon-jixiao", PID: 1000, …}
  // 6: {ID: 1009, Name: "技术管理", menuId: "", icon: "icon-guanyugongsi-jishu", PID: 1000, …}
  // 7: {ID: 1010, Name: "质量验收", menuId: "", icon: "icon-zhilianganquan", PID: 1000, …}
  // 8: {ID: 1011, Name: "工程统计", menuId: "", icon: "icon-tongji", PID: 1000, …}
  // length: 9
  // nv_length: (...)
  // __proto__: Array(0)
  // icon: "icon-gongchengguanli-"
  // menuId: ""
  // pageaddres: ""
  // __proto__: Object
  // 1: {ID: 1001, Name: "项目合同", menuId: "", icon: "icon-web-icon-", PID: 0, …}
  // 2: {ID: 1002, Name: "我的/登录", menuId: "", icon: "icon-wode", PID: 0, …}
  // 3: {ID: 2054, Name: "OA项目", menuId: "", icon: "icon-OAshenpi
  // ↵", PID: 0, …}
  // length: 4
  /**
   * 生命周期函数--监听页面加载
   */
  // 所有人
  showPopup2() {
    this.setData({
      show2: true
    })
  },
  onClose2() {
    this.setData({
      show2: false
    })
  },
  onConfirm2(e) {
    this.setData({
      user: e.detail.value.text,
      show2: false
    })
    console.log(e.detail.value.value)
    getRoleMenu({
      RoleId: e.detail.value.value
    }).then(res => {
      if (res.code == 10000) {
        let MenuList = res.MenuList;
        MenuList = this.isFolder(MenuList);
        this.setData({
          tree: MenuList
        })
        wx.hideLoading();
      }
    })

  },
  onMyEvent(e) {
    console.log(e.detail)
    // 判断添加 以及删除
    this.setData({
      changelist: e.detail
    })


  },
  Confirm() {
    var data2 = this.data.tree
    this.filtrate(data2)
    console.log(this.data.original)
    var data3 = this.data.changelist
    this.filtchangedata(data3)
    console.log(this.data.changedata)
    var original = this.data.original
    var changedata = this.data.changedata
    // 判断添加

    changedata.forEach(s => {
      var add = []
      original.forEach(u => {
        if (s.id == u.id) {
          add.push(true)
        } else {
          add.push(false)
        }
      })
      var ifsame = add.some(p => {
        return p
      })
      if (!ifsame) {
        var adddata = this.data.adddata
        adddata.push(s.ID)
        this.setData({
          adddata
        })
      }
    })
    // 判断删除
    original.forEach(s => {
      var del = []
      changedata.forEach(u => {
        if (s.id == u.id) {
          del.push(true)
        } else {
          del.push(false)
        }
      })
      var ifdel = del.some(p => {
        return p
      })
      if (!ifdel) {
        var deldata = this.data.deldata
        deldata.push(s.ID)
        this.setData({
          deldata
        })
      }
    })
    console.log(this.data.adddata)
    console.log(this.data.deldata)
    var adddata = this.data.adddata
    adddata = adddata.join(";")
    console.log(adddata)
    addRoleMenu(adddata).then(res=>{
      if(res.code == 10000){
        wx.showToast({
          title: '修改菜单权限成功',
          icon: 'success',
          duration: 2000
        })
        // wx.reLaunch({
        //   url: `/OAmoudle/pages/controlMenu/pact/pact`
        // })
      }
  
    })
  },
  filtrate(data) {
    var original = this.data.original
    data.filter(s => {
      if (s.IsEnabled) {
        original.push({
          ID: s.ID,
          IsEnabled: s.IsEnabled
        })
        this.setData({
          original
        })
      }
      if (s.Submenu.length > 0) {

        this.filtrate(s.Submenu)
      }
      return s.IsEnabled
    })
  },
  filtchangedata(data) {
    var changedata = this.data.changedata
    data.filter(s => {
      if (s.IsEnabled) {
        changedata.push({
          ID: s.ID,
          IsEnabled: s.IsEnabled
        })
        this.setData({
          changedata
        })
      }
      if (s.Submenu.length > 0) {
        s
        this.filtrate(s.Submenu)
      }
      return s.IsEnabled
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    getRoleMenu().then(res => {
      if (res.code == 10000) {
        let MenuList = res.MenuList;
        MenuList = this.isFolder(MenuList);
        this.setData({
          tree: MenuList
        })
        wx.hideLoading();
      }
    })
    queryrole().then(res => {
      if (res.code == 10000) {
        let section = JSON.parse(JSON.stringify(res.List).replace(/ID/g, 'value').replace(/UserName/g, 'text'));
        this.setData({
          section
        })
      } else {
        wx.showToast({
          title: '用户请求失败',
          icon: 'none',
          duration: 2000
        })
      }
      console.log(res)
    })
  },

  isFolder: function (arr) {
    const that = this;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].Submenu && arr[i].Submenu.length > 0) {
        arr[i].isFolder = true;
        that.isFolder(arr[i].Submenu);
      } else {
        arr[i].isFolder = false;
      }
      arr[i].isOpen = false;
    }
    console.log(arr)
    return arr;
  }
})