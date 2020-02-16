// pages/hot/self/self.js
var util = require("../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
var app = getApp();
var util = require("../../../utils/util");

import {
  leadership,
  leadership1,
  employee,
  getdep,
  valid
} from "../../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    show4: false,
    show3: false,
    show2: false,
    InfoList: [],
    Times: [],
    Supplier: [],
    info: {
      departmentID: null,
      Type: null,
      UserId: null
    },
    news: true,
    newscontent: [],
    show6: false
  },
  return () {
    util.returnMenu(1002);
  },
  onClosedetail() {
    this.setData({
      show6: false
    })
  },
  dispose(res) {
    if (res.urgentTaskList.Num == 0) {
      this.setData({
        news: false
      })
    } else {
      this.setData({
        news: true,

      })
      var newscontent = res.urgentTaskList.List
      // console.log(newscontent)
      newscontent.forEach(item => {
        item.List.forEach(items => {
          // console.log(items.Handler)
          if (!items.Handler) {
            Handlers = '空'
          } else {
            app.globalData.Principal.forEach(s => {
              if (s.value == items.Handler) {
                items.Handlers = s.text
              }

            })
          }
          item.TableName = items.TableNameChinese
        })
      })
      this.setData({
        newscontent
      })
    }
  },
  change2(e) {
    var that = this
    // console.log(e.currentTarget.dataset.new)
    // e.currentTarget.dataset.new.TableName
    // e.currentTarget.dataset.new.ID
    var news = e.currentTarget.dataset.new
    wx.request({
      url: `https://shangyongren.com:9098/api/${e.currentTarget.dataset.new.TableName}/detail`,
      data: {
        Timestamp: util.format(new Date()),
        ID: e.currentTarget.dataset.new.ID,
        Token: userinfo.Token,
        TokenType: userinfo.TokenType
      },
      header: {},
      method: 'POST',
      success: function (res) {
        if (res.data.code == 10000) {
          // console.log(res.data.Item)
          var Item = res.data.Item
          // console.l{og(news)
          valid({
            formName: news.TableName,
            currowbh: Item.CurStepbh,
            userName: news.Handler,
            formid: Item.formid
          }).then(ress => {
            // console.log(ress.Isvalidtime)
            that.setData({
              newss: news,
              Item,
              ress
            })
            // var title = `
            // <view>  任务类型: ${news.TableNameChinese} </view>

            // <view>  步骤编号:${Item.CurStepbh} </view>

            // <view> 名称:${news.DataName}</view>

            // <view> 任务人:${news.Handlers}</view>

            // <view> 具体描述:11</view>

            // <view>  到期时间:${ress.Isvalidtime.False}</view>

            //   `
            var content = ''
            if (news.TableName == 'subproject') {
              content = Item.subprojectname
            }else if (news.TableName == 'subcontact') {
              content = Item.subcontactname
            }
            else if (news.TableName == 'prjassignbook') {
              content = Item.projectname
            }
            else if (news.TableName == 'charge') {
              content = Item.chargename
            }
            else if (news.TableName == 'getmaterial') {
              content = Item.getmaterialName
            }
            else if (news.TableName == 'losematerial') {
              content = Item.losematerialName
            }
            else if (news.TableName == 'subprjcodeapply') {
              content = Item.subprojectname
            }
            else{
              content = news.DataName
            }
            that.setData({
              show6: true,
              content
            })

          })

        }


      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      section4: app.globalData.department,
      section3: app.globalData.table,
      section2: app.globalData.Principal
    })
    getdep({
      UserName: userinfo.UserName
    }).then(res => {
      // console.log(res)
      var s = JSON.parse(res)
      leadership({
        departmentID: s[0].ID
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          this.dispose(res)

        }
      })
      leadership({
        departmentID: s[0].ID
      }).then(res => {
        console.log(res)
      })

    })
  },

  // 综合搜索
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 计划开工时间
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
  // 计划完工时间
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
  //项目或合同编号
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
    })
  },
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  showPopup2() {
    // console.log(this.data.info.departmentID)
    if (this.data.info.departmentID) {
      this.setData({
        show2: true
      });
    } else {
      wx.showToast({
        title: '请选择部门',
        icon: 'none',
        duration: 3000
      })
    }

  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show2: false,
    })
  },
  showPopup3() {
    this.setData({
      show3: true
    });
  },
  onClose3() {
    this.setData({
      show3: false
    });
  },
  onConfirm3(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show3: false,
    })
  },
  showPopup4() {
    this.setData({
      show4: true
    });
  },
  onClose4() {
    this.setData({
      show4: false
    });
  },
  onConfirm4(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show4: false,
    })
    employee({
      ID: e.detail.value.value
    }).then(res => {
      // console.log(res)
      if (res) {
        let s = JSON.parse(res.replace(/userId/g, 'value').replace(/name/g, 'text'));
        this.setData({
          section2: s
        })
      }
    })
  },
  showPopup5() {
    this.setData({
      show5: true
    });
  },
  onClose5() {
    this.setData({
      show5: false
    });
  },
  onConfirm5(e) {
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show5: false,
      // departmenttext: e.detail.value.text
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    // console.log(this.data.info)
    wx.showLoading({
      title: '加载中',
    });
    if (!this.data.info.departmentID) {
      wx.showToast({
        title: '请输入部门',
        icon: 'none',
        duration: 2000
      })
    } else {
      leadership({
        departmentID: this.data.info.departmentID,
        Type: this.data.info.Type,
        UserId: this.data.info.UserId
      }).then(res => {
        leadership({
          departmentID: this.data.info.departmentID,
          Type: this.data.info.Type,
          UserId: this.data.info.UserId
        }).then(res => {
          console.log(res)
        })
        // console.log(res)
        if (res.code == 10000) {
          wx.hideLoading();
          wx.showToast({
            title: '搜索成功',
            icon: 'success',
            duration: 3000
          })
          this.onClose()
          this.dispose(res)
          var info = this.data.info
          for (var key in info) {
            info[key] = null
          }
          this.setData({
            info
          })
        }
      })
    }


  },


})