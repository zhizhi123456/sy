// pages/generalcontract/detail/detail.js
import {
  detailapply,
  delapply,
  updateapply,
  queryapplysmall
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
    material_list: [],
    table: "a",
    returned: true,
    isreturn: true,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    idea: {
      API_Picurl: [],
      API_Fileurl: []
    },
   
   
  },
  // 返回
  return () {
    // util.OAreturn('apply')
    if (this.data.history) {
      util.OAreturn('apply', this);
    } else {
      util.OAreturn('apply');
    }
  },
  // 新增明细表
  addndlink() {
    wx.redirectTo({
      url: "/OAmoudle/pages/apply/newlink/newlink?id=" + this.data.info.ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.table) {
      this.setData({
        table: options.table
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history
    })
    util.readRecordlist('applybuyform', options.id, this, '申购')
    if (options.id) {
      detailapply({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          var history = wx.getStorageSync("history")
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          util.getbutton(item.ID, 'applybuyform', item.CurStepbh, this);
          let menus = wx.getStorageSync('menus');
          if (menus.caption == '我申请' && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkChange(info, this, app.globalData.department);
            this.setData({
              info
            })
            updateapply(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'applybuyform', options.id)
          //处理状态判断
          util.checkState(this, mid, 'applybuyform', item.CurStepbh, '');
        }
      })
      // 调取明细表
      queryapplysmall({
        applybuyid: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.List;
          util.listData(item, app.globalData.department);
          util.outflowsmalllist(item)
          this.setData({
            material_list: item.reverse()
          })
        }
      })
    }
  },
  // 工作流流转
  // 删除
  delete() {
    util.OAexpurgate(this, delapply, 'apply')
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
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/apply/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
      })
    }
  },
  // 
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
    var dangqiantime = (Date.parse(new Date()) / 1000);
    if (util.Reclick(dangqiantime)) {
      if (this.data.ApprovalOpinion) {
        util.Triggerflow(this, 'return', 'applybuyform', 'apply', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
      } else {
        wx.showToast({
          title: '请输入审批意见',
          icon: 'none',
          duration: 3000
        })
      }
    }
  },
  sconfirm() {
    var dangqiantime = (Date.parse(new Date()) / 1000);
    if (util.Reclick(dangqiantime)) {
      util.Triggerflow(this, 'next', 'applybuyform', 'apply', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
    }
  },
  // 审核通过
  putin() {
    if (this.data.info.formid) {
      this.setData({
        show: true
      })
    } else {
      util.Triggerflow(this, 'next', 'applybuyform', 'apply', '', '', '', '', '', '', 'oa')
    }
  },
})