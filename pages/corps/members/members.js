var app = getApp();
var util = require("../../../utils/util");
import {
  qgroupmember,
  qgroupcontractor
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
    member: ""
  },
  return () {
    wx.navigateBack({
      url: "/pages/corps/section"
    })
  },
  onChange(e) {
    this.setData({
      info: {}
    })
    //console.log(this.data.sections)
    //console.log(e.detail)
    let id = this.data.sections[e.detail].value;
    //console.log(id)
    //console.log(id)
    this.setData({
      dep: id,
      deptxt: this.data.sections[e.detail].text
    })
    //console.log(id)
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

      this.setData({
        employee: c
      })
    })
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
    // //console.log(e)
    //console.log(e.detail)
    //console.log(e.detail.value)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      activeKey: e.detail.index,
      dep: e.detail.value.value,
      deptxt: e.detail.value.text
    })
    qgroupmember({
      Type: e.detail.value.value
    }).then(res => {
      let info = this.data.info;
      info.person = '';
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
      this.setData({
        info,
        employee: c
      })
    })
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
    // //console.log(app.globalData.Principal)
    //console.log(options.name)
    qgroupcontractor().then(res => {
      //console.log(res.List)
      if (res.List) {
        var a = res.List
        var c = a.findIndex(s => {
          return s.ID == options.name
        })
        //console.log(c)
        this.setData({
          activeKey: c
        })

      }
    })
    if (options.name) {
      var a = options.name
    }
    qgroupmember({
      Type: a
    }).then(res => {
      if (res.List) {
        var a = JSON.stringify(res.List)
        var b = JSON.parse(a.replace(/ID/g, 'value').replace(/MemberName/g, 'text'));
        var q = res.List
        q.forEach(s => {
          app.globalData.Principal.forEach(a => {
            if (s.MemberName == a.value) {
              s.username = a.text
            }
          })
        })
        var u = JSON.stringify(q)
        var b = JSON.parse(u.replace(/ID/g, 'value').replace(/username/g, 'text'));
        console.log(b)
        this.setData({
          b
        })
      } else {
        var b = []
        this.setData({
          b
        })
      }

      qgroupcontractor().then(res => {
        //console.log(res)

        if (res.List) {
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
            employee: this.data.b,
          })
        } else {
          app.DataCallback = employ => {
            if (employ != '') {
              this.setData({
                sections: this.data.member,
                employee: this.data.b,
              })
            }
          }
        }

      })
      //console.log(this.data.member)

    })


  },
})