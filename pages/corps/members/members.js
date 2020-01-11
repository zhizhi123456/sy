var app = getApp();
var util = require("../../../utils/util");
import {
  qgroupmember,
  qgroupcontractor,
  detailcontractor,
  getdep
} from "../../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_o: false,
    info: {},
    InfoList: [],
    activeKey: 0,
    employee: '',
    b: '',
    member: "",
    name: ''
  },
  return () {
    wx.redirectTo({
      url: "/pages/corps/section"
    })
  },
  upmember(id, that) {
    // 根据施工队id查询 施工队成员
    // console.log(id)
    qgroupmember({
      Type: id
    }).then(res => {
      // console.log(res)
      if (res.List) {
        var q = res.List
        q.forEach(s => {
          app.globalData.Principal.forEach(a => {
            if (s.MemberName == a.value) {
              s.username = a.text
            }
          })
        })
        var u = JSON.stringify(q)
        var c = JSON.parse(u.replace(/ID/g, 'value').replace(/username/g, 'text'));
      } else {
        var c = []
      }
      that.setData({
        employee: c
      })
    })
    detailcontractor({ID:id}).then(res => {
      console.log(res)
      if(res.code==10000){
          var item = res.Item
          // item.chiefcontactman 用户名
          if(item.chiefcontactman){
            getdep({
              UserName: item.chiefcontactman
            }).then(res => {
              if (res !== '[]') {
                var s = JSON.parse(res)
                this.setData({
                  dep: s[0].ID,
                  deptxt: s[0].techofficename
                })
                console.log(that.data.dep, that.data.deptxt)
              }
            })
          }
      }
    })

  },
  onChange(e) {
    this.setData({
      info: {}
    })
    // id 施工队id
    let id = this.data.sections[e.detail].value;
    this.setData({
      name: id
    })
    this.upmember(id, this)

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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      activeKey: e.detail.index,
    })
    // 页面传值参数
    this.setData({
      name: e.detail.value.value
    })
    this.upmember(e.detail.value.value, this)
  },
  //员工
  showPopup_1() {
    if (!this.data.info.department) {
      wx.showToast({
        title: '请先选择施工队',
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
        title: '无施工队成员信息',
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
    console.log(options)
    if (options) {
      this.setData({
        dep: options.dep,
        deptxt: options.deptxt,
        name: options.name,
      })
      var a = options.name
      // 传递的施工队id
    }
    // a:施工队id 根据获取施工队id 获得施工队成员列表
    this.upmember(a, this)
    qgroupcontractor().then(res => {
      if (res.List) {
        // 根据传递的施工队id 遍历得到应该在列表的那个位置 设置activeKey
        var a = res.List
        var c = a.findIndex(s => {
          return s.ID == options.name
        })
        this.setData({
          activeKey: c
        })
        // 
        // 获得初始施工队列表
        var a = JSON.stringify(res.List)
        var c = JSON.parse(a.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
        this.setData({
          member: c
        })

      } else {
        this.setData({
          member: []
        })
      }
      if (app.globalData.CountItem) {
        this.setData({
          sections: this.data.member,
        })
      } else {
        app.DataCallback = employ => {
          if (employ != '') {
            this.setData({
              sections: this.data.member,
            })
          }
        }
      }
    })




  }
})