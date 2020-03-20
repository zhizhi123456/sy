// pages/generalcontract/detail/detail.js
import {
  referVacate,
  cancelVacate,
  amendVacate,
  Leavetypelist,
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    tab: 'a',
    returned: true,
    isreturn: true,
    leavetypetext: '',
    small: {
      ApprovalOpinion: ""
    },
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    idea: {
      API_Picurl: [],
      API_Fileurl: []
    },
    showdep: false,
    department: '',
    departmenttext:'',
    deptext:''
  },
  // 返回
  return () {

    if (this.data.history) {
      util.OAreturn('vacate', this);
    } else {
      util.OAreturn('vacate');
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history,
    })
    console.log(app.globalData.moredep)
    var a = app.globalData.moredep.map(s => {
      s.show = false
      return s
    })
    this.setData({
      sections: a,
      departmenttext:''
    })
    console.log(app.globalData.sections)
    util.readRecordlist('leaveapplyform', options.id, this, '请假')
    if (options.id) {
      referVacate({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          var history = wx.getStorageSync("history")
          // console.log(history)
          let item = res.Item;
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item,
            applyT: Number(options.applyT)
          })
          util.getbutton(item.ID, 'leaveapplyform', item.CurStepbh, this);
          // amendVacate
          if (this.data.applyT && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkContent(info, this);
            this.setData({
              info
            })
            amendVacate(this.data.info).then(res => {
              if (res.code == 10000) {
                wx.showToast({
                  title: '已查看',
                  icon: 'none',
                  duration: 3000
                })
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'leaveapplyform', options.id);
          //处理状态判断
          util.checkState(this, res.Item.formid || res.Item.Formid, 'leaveapplyform', item.CurStepbh, '');
          console.log(this.data.info.formid, this.data.isnext, this.data.returned, this.data.isreturn)
        }
      })
    }
  },
  // // 工作流流转
  // // 退回
  // sendback(e) {
  //   this.setData({
  //     state: e.currentTarget.dataset.state
  //   })
  //   if (this.data.info.formid) {
  //     this.setData({
  //       pull: true,
  //       show: true,
  //     })
  //   } else {
  //     util.Triggerflow(this, 'return', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
  //   }
  // },
  // // 审核通过
  // putin(e) {
  //   console.log(e.currentTarget.dataset.state)
  //   this.setData({
  //     state: e.currentTarget.dataset.state
  //   })
  //   if (this.data.info.formid) {
  //     this.setData({
  //       pull: true,
  //       show: true,
  //     })
  //   } else {
  //     util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
  //   }
  // },
  // 删除
  showPopup_o() {
    this.setData({
      show_o: true,
      seach: ''
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    var s = this.data.sections
    var t = s.filter((y) => {
      return y.show
    })
    var q = s.filter((y) => {
      return y.show
    })
    t = t.map((x) => {
      return x.text
    })
    q = q.map((x) => {
      return x.value
    })
    t = t.join(",")
    q = q.join(",")
    //console.log(t)
    this.setData({
      department: q,
      deptext: t,
      show_o: false,
    })
    console.log(this.data.department, this.data.deptext)
  },
  onClosedep() {
    this.setData({
      showdep: false
    })
  },
  confirmdep() {
    //console.log("1")

    console.log(this.data.department)
    if(this.data.department){
      util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa', '', '', '', this.data.department)
    }else{
      wx.showToast({
        title: '请选择部门',
        icon: 'none',
        duration: 3000
      })
    }
    // util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
   

  },
  onChange(event) {
    var s = this.data.sections
    var y = s.findIndex((r) => {
      return r.value == event.currentTarget.dataset.name
    })
    s[y].show = !s[y].show
    this.setData({
      sections: s
    })

  },
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelVacate({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('vacate');
              }, 1000)
            }
          })
        }
      }
    })
  },
  // 点击图片放大预览
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  meetplaceblur(e) {
    let small = util.editInfosmall(e, this, e.detail.value);
    this.setData({
      small
    })
  },
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/vacate/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  },
  // 工作流流转
  onClose() {
    this.setData({
      show: false
    })
  },
  onClose1() {
    this.setData({
      show1: false
    })
  },
  delF(e) {
    util.delFileIDEA(this, e);
  },
  downF(e) {
    util.lookFileIDEA(e);
  },
  // 文件上传
  up_file() {
    util.upFileIDEA(this);
  },
  //图片上传
  // 照片
  showPopup_photo() {
    this.setData({
      show_photo: true
    })
  },
  onClose_photo() {
    this.setData({
      show_photo: false
    })
  },
  onSelect_photo(e) {
    if (e.detail.name == "拍照") {
      util.upImageIDEA(this, 1);
    } else {
      util.upImageIDEA(this, 0);
    }
  },
  // 点击图片放大预览
  tap_pic1(e) {
    util.lookimgIDEA(e);
  },
  delimg(e) {
    util.deleteImgIDEA(this, e);
  },
  // 退回上步
  sendback() {
    this.setData({
      show1: true
    })
    // util.Triggerflow(this, 'return', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa')
  },
  ApprovalOpinionblur(e) {
    this.setData({
      ApprovalOpinion: e.detail
    })
  },
  tconfirm() {
    if (this.data.ApprovalOpinion) {
      util.Triggerflow(this, 'return', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
    } else {
      wx.showToast({
        title: '请输入审批意见',
        icon: 'none',
        duration: 3000
      })
    }
  },
  sconfirm() {
    util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
  },
  // 审核通过
  putin() {
    console.log(this.data.info.formid)
    if (this.data.info.formid) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        showdep: true
      })
      // console.log(this.data.showdep)
      // util.Triggerflow(this, 'next', 'leaveapplyform', 'vacate', '', '', '', '', '', '', 'oa')
    }
  },
  // 点击图片放大预览
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
})