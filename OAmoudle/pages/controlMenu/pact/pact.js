// OAmoudle/pages/organize/pact/pact.js
import {
  getRoleMenu,
  queryrole,
  addRoleMenu,
  cancelRoleMenu,
  amendRoleMenu,
  getMembernew
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
    deldata: [],
    RoleId: '',

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
    //console.log(e.detail.value.value)
    this.setData({
      RoleId: e.detail.value.value
    })
    getRoleMenu({
      RoleId: e.detail.value.value
    }).then(res => {
      if (res.code == 10000) {
        let MenuList = res.MenuList;
        this.setData({
          userorgin: MenuList
        })
        MenuList = this.isFolder(MenuList);
        this.setData({
          tree: MenuList,
          changelist: []
        })
        //console.log(this.data.tree)
        wx.hideLoading();
      }
    })

  },
  return () {
    util.returnMenu2(2055, "日常办公")
  },
  setSeach2(e) {
    this.setData({
      seach2: e.detail.value
    })
  },
  finditem2() {
    let arr = util.findone(this.data.section, this.data.seach2);
    this.setData({
      section: arr,
      seach2: ''
    })
  },
  onMyEvent(e) {
    console.log(e.detail)
    // 判断添加 以及删除
    this.setData({
      changelist: e.detail
    })


  },
  del() {
    if (!this.data.RoleId) {
      wx.showToast({
        title: '请选择角色',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this
      wx.showModal({
        content: '确定删除吗？',
        success(res) {
          // console.log(that.data.info.ID)
          if (res.confirm) {
            cancelRoleMenu({
              RoleId: that.data.RoleId
            }).then(res => {
              if (res.code == 10000) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(
                  function () {
                    wx.reLaunch({
                      url: `/OAmoudle/pages/controlMenu/pact/pact`
                    })
                  }, 2000)
              }

            })
          }

        }
      })


    }
  },
  Confirm() {
    console.log(this.data.changelist)
    console.log(!(this.data.RoleId && this.data.changelist))
    if (!(this.data.RoleId && this.data.changelist.length>0)) {
      wx.showToast({
        title: '请选择角色或选择修改的菜单',
        icon: 'none',
        duration: 2000
      })
    } else {

      //   var data2 = this.data.tree
      //   this.filtrate(data2)
      //   //console.log(this.data.original)
      //   var data3 = this.data.changelist
      //   this.filtchangedata(data3)
      //   //console.log(this.data.changedata)
      //   var original = this.data.original
      //   var changedata = this.data.changedata
      //   // 判断添加

      //    // 判断删除
      //    original.forEach(s => {
      //     //console.log(changedata)
      //     //console.log(s)
      //     var ifhave = JSON.stringify(changedata).indexOf(s.ID);
      //     //console.log(ifhave)
      //     var del = this.data.deldata
      //     if (ifhave == -1) {
      //       del.push(s.ID)
      //     }
      //     this.setData({
      //       deldata: del
      //     })
      //   })
      //   // 判断删除
      //   original.forEach(s => {
      //     //console.log(changedata)
      //     //console.log(s)
      //     var ifhave = JSON.stringify(changedata).indexOf(s.ID);
      //     //console.log(ifhave)
      //     var del = this.data.deldata
      //     if (ifhave == -1) {
      //       del.push(s.ID)
      //     }
      //     this.setData({
      //       deldata: del
      //     })
      //   })
      //   //console.log(this.data.adddata)
      //   //console.log(this.data.deldata)
      //   var adddata = this.data.adddata
      //   adddata = adddata.join(";")
      //   //console.log(adddata)
      //   if (this.data.adddata.length > 0) {
      //     addRoleMenu({
      //       RoleId: this.data.RoleId,
      //       MenuId: adddata
      //     }).then(res => {
      //       if (res.code == 10000) {
      //         wx.showToast({
      //           title: '修改菜单权限成功',
      //           icon: 'success',
      //           duration: 2000
      //         })
      //       }
      //     })
      //   }
      //   var deldata = this.data.deldata
      //   deldata = deldata.join(";")
      //   //console.log(deldata)
      //   if (this.data.deldata.length > 0) {
      //     cancelRoleMenu({
      //       RoleId: this.data.RoleId,
      //       MenuId: deldata
      //     }).then(res => {
      //       if (res.code == 10000) {
      //         wx.showToast({
      //           title: '修改菜单权限成功',
      //           icon: 'success',
      //           duration: 2000
      //         })

      //       }
      //     })
      //   }

      var data3 = this.data.changelist
      // console.log(data3)
      // this.filtchangedata(data3)
      // console.log(this.data.changedata)
      // var changedata = this.data.changedata
      // var adddata = changedata.map(s => {
      //   return s.ID
      // })
      data3 = data3.join(";")
      console.log(data3)
      addRoleMenu({
        RoleId: this.data.RoleId,
        MenuId: data3
      }).then(res => {
        if (res.code == 10000) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(
            function () {
              wx.reLaunch({
                url: `/OAmoudle/pages/controlMenu/pact/pact`
              })
            }, 2000)
        }
      })



    }
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
    var that = this
    let changedata = this.data.changedata
    console.log(changedata)
    data.filter(s => {
      console.log(s)
      if (s.IsEnabled) {
        changedata.push({
          ID: s.ID,
          IsEnabled: s.IsEnabled
        })
        that.setData({
          changedata
        })
      }
      console.log(s.Submenu.length)
      console.log(s.Submenu)
      if (s.Submenu.length > 0) {
        that.filtchangedata(s.Submenu)
      }
      return s.IsEnabled
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.source) {
      wx.setStorageSync('carte', options)
    }
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
    this.setData({
      section:app.globalData.GetRoles
    })
    // getMembernew().then(res => {
    //   console.log(res)
    //   if (res.code == 10000) {
    //     var list = res.List
    //     var lists = list.filter(s => {
    //       return s.Roles
    //     })
    //     let section = JSON.parse(JSON.stringify(lists).replace(/Roles/g, 'value').replace(/userId/g, 'text'));
    //     this.setData({
    //       section
    //     })
    //   } else {
    //     wx.showToast({
    //       title: '用户请求失败',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   //console.log(res)
    // })
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
      // if (arr[i].IsEnabled) {
      //   arr[i].isOpen = true;
      // } else {
      //   arr[i].isOpen = false;
      // }

    }
    //console.log(arr)
    return arr;
  }
})