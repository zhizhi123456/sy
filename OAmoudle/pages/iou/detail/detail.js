// / pages/generalcontract/detail/detail.js
import {
  detailiou,
  deliou,
  updateiou
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count1:2,
    shows:false,
    edit: false,
    info: {},
    steps: [],
    tab: 'a',
    returned: false,//*1
    AudiEdit: false,//*1
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
    }
  },
  // 文件
  up_photo() {
    wx.chooseImage({
      count: 9,
      // sourceType:"camera",
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // //console.log(tempFilePaths)
      }
    })
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
  // 返回
  return () {
    // if (this.data.history) {
    //   util.OAreturn('iou', this);
    // } else {
    //   util.OAreturn('iou');
    // }
    if(this.data.a==1){
      wx.navigateBack({
        delta:1
      })  
    }else if(this.data.c==2 && this.data.b==1){
      wx.navigateBack({
        delta:2
      })
    }else{
      util.OAreturn('iou');
    }
    //wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(22222)
    console.log(options)
    this.setData({
      count:options.id,
      a:options.count,
      c:options.caption,
      b:options.dep
      //status:options.status
    })
    // if(this.data.status==1){
    //   this.data.info.ApplygetNew=false
    // }
    wx.showLoading({
      title: '加载中',
    });
    if (!options.history) {
      wx.setStorageSync('history', '')
    }
    this.setData({
      history: options.history
    })
    util.readRecordlist('debitnote', options.id, this, '借条')
    if (options.id) {
      detailiou({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          var history = wx.getStorageSync("history")
          // console.log(history)
          let item = res.Item;
          if (history) {
            item = history
          }
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          util.getbutton(item.ID, 'debitnote', item.CurStepbh, this);
          let menus = wx.getStorageSync('menus');
          if (menus.caption == '我申请' && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkChange(info, this, app.globalData.department);
            this.setData({
              info
            })
            updateiou(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();

          // 调取工作流记录
          //列表
          let mid = res.Item.formid;
          util.workList(this, mid, 'debitnote', options.id)
          // //console.log(this.data.steps)
          //处理状态判断
          util.checkState(this, mid, 'debitnote', item.CurStepbh, '');
        }
      })
    }
  },
  // 工作流流转
  // 删除
  delete() {
    // //console.log(this.data.info)
    util.OAexpurgate(this, deliou, 'iou')
  },
  change12(e) {
    console.log(e)
    if (e.currentTarget.dataset.i) {
      // console.log(JSON.parse(e.currentTarget.dataset.i))
      wx.setStorageSync('history', JSON.parse(e.currentTarget.dataset.i))
      wx.redirectTo({
        url: '/OAmoudle/pages/iou/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
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
    var dangqiantime = (Date.parse(new Date()) / 1000);
    if (util.Reclick(dangqiantime)) {
      if (this.data.ApprovalOpinion) {
        util.Triggerflow(this, 'return', 'debitnote', 'iou', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
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
        util.Triggerflow(this, 'next', 'debitnote', 'iou', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
    }
  },
  // 审核通过
  putin() {
    if (this.data.info.formid) {
      this.setData({
        show: true
      })
    } else {
      util.Triggerflow(this, 'next', 'debitnote', 'iou', '', '', '', '', '', '', 'oa')
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
  //标记
  signs(e){
    wx.showToast({
      title: '标记成功',
      icon: 'success',
      duration: 1000
    })
    let info = this.data.info;
    if(e.currentTarget.dataset.id==1){
      info.signColor="red"
    }
    if(e.currentTarget.dataset.id==2){
      info.signColor="blue"
    }
    if(e.currentTarget.dataset.id==3){
      info.signColor="yellow"
    }
    if(e.currentTarget.dataset.id==4){
      info.signColor="green"
    }
    if(info.sign==1 && e.currentTarget.dataset.id==5){
      info.sign=""
    }else{
      info.sign=1
    }
    this.setData({
      info,
    })
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updateiou(this.data.info).then(res => {
      console.log(1111111)
      console.log(res)
  
        util.OAreturn('iou')

    })
  },
  //颜色展示
  shows111(){
    var that = this;
    var sh = that.data.shows;
    that.setData({
      shows: !sh
    })
  },
})