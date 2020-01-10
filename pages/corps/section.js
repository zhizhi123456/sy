// pages/section/section.js
var app = getApp();
var util = require("../../utils/util");
import {
  qgroupcontractor,
  getdep 
} from "../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_o: false,
    info: {},
    InfoList: [],
    activeKey: 0,
    employee:'',
    b:'',
  },
  return () {
    util.returnMenu(1002);
  },
  // 根据用户名得到部门
  updep(id,that){
    getdep({UserName:id}).then(res=>{
      if(res!=='[]'){
        var s = JSON.parse(res)
        that.setData({
          dep: s[0].ID,
          deptxt:s[0].techofficename
        })
        console.log(that.data.dep,that.data.deptxt)
      }
    })
    // 
    qgroupcontractor({
      UserName: id
    }).then(res => {
      if (res.List) {
        var a = JSON.stringify(res.List)
        var b  = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
      } else {
        var b = []
      }
      that.setData({
        employee: b
      })
    })
  },
  onChange(e) {
    let id = this.data.sections[e.detail].value;
    this.updep(id,this)
  },
  //部门
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
    this.setData({
      show_o: false,
      activeKey: e.detail.index,
    })
    this.updep(e.detail.value.value,this)
   
  },
  //员工
  showPopup_1() {
    if (!this.data.info.department) {
      wx.showToast({
        title: '请先选择部门经理',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        show_1: false
      });
    } else if (this.data.employee[0]) {
      this.setData({
        show_1: true
      });
    } else {
      wx.showToast({
        title: '无施工队信息',
        icon: 'none',
        duration: 2000
      })
    }
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
      show_1: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //console.log(app.globalData.Principal)
    var a = app.globalData.Principal[0].value
    qgroupcontractor({
      UserName: a
    }).then(res => {
      //console.log(res)
      if (res.List) {
        var a = JSON.stringify(res.List)
        var b  = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
        this.setData({
          b
        })
      } else {
       var  b = ''
        this.setData({
          b
        })
      }
    })
    if (app.globalData.CountItem) {
      this.setData({
        sections: app.globalData.Principal,
        employee: this.data.b,
        Companytitle: app.globalData.Companytitle,
        dep: app.globalData.department[0].value,
        deptxt: app.globalData.department[0].text
      })
    } else {
      app.DataCallback = employ => {
        if (employ != '') {
          this.setData({
            sections: app.globalData.Principal,
            employee: this.data.b,
            Companytitle: app.globalData.Companytitle,
            dep: app.globalData.department[0].value,
            deptxt: app.globalData.department[0].text
          })
        }
      }
    }
  },
})