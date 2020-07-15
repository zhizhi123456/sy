// pages/generalcontract/detail/detail.js
import {
  cancel,
  referId,
  amend,
  selectCost
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shows:false,
    edit: false,
    info: {},
    active: 0,
    steps: [],
    tab: 'a',
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
    }
  },
  // 返回
  return () {
    // if (this.data.history) {
    //   util.Oreturn('generalcontract', this);
    // } else {
    //   util.Oreturn('generalcontract');
    // }
    // if(this.data.a){

    // }
    
    // if(this.data.a==1){   
    //   wx.navigateBack()
    // }else{
    //   util.Oreturn('generalcontract');
    // }

    if(this.data.a==1){
        wx.navigateBack({
          delta:2
        })    
    }
     if(this.data.c==1 && this.data.status==2){
      wx.navigateBack({
        delta:2
      })
    }
    if(this.data.c==0 && this.data.status==2){
      util.Oreturn('generalcontract');
    }
    
  },
  downF(e) {
    util.lookFileIDEA(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111111222)
    console.log(options)
    this.setData({
      count:options.id,
      a:options.count,
      status:options.userid,
      c:options.caption
    })
    
    if (options.tab) {
      this.setData({
        tab: options.tab
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
    util.readRecordlist('maincontact', options.id, this, '签报')
    if (options.id) {
      referId({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          util.getbutton(item.ID, 'maincontact', item.CurStepbh, this);
          wx.hideLoading();
          let menus = wx.getStorageSync('menus');
          if (menus.caption == '我申请' && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkChange(info, this, app.globalData.department);
            this.setData({
              info
            })
            amend(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          // 调取工作流记录
          // console.log(res.Item.formid)
          //列表
          let mid = res.Item.formid;
          util.workList(this, mid, 'maincontact', options.id);
          setTimeout(() => {
            //代码
            console.log(this.data.steps)
            console.log(this.data.actived)
          }, 1000);
          //处理状态判断
          util.checkState(this, mid, 'maincontact', item.CurStepbh, '');
          // 查询项目相关的费用列表
          selectCost({
            maincontactcode: item.maincontactname
          }).then(res => {
            // console.log(res.List)
            if (res.code == 10000) {
              let item = res.List;
              util.listData(item, app.globalData.department)
              this.setData({
                InfoList: item
              })
            }
          })
        }
      })
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
  // 工作流流转
  // 删除
  delete() {
    util.expurgate(this, cancel, 'generalcontract')
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
        url: '/pages/generalcontract/detail/detail?history=5&id=' + JSON.parse(e.currentTarget.dataset.i).ID
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
        util.Triggerflow(this, 'return', 'maincontact', 'generalcontract', '', '', '', '', '', '', '', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
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
      util.Triggerflow(this, 'next', 'maincontact', 'generalcontract', '', '', '', '', '', '', '', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.idea.API_Picurl), JSON.stringify(this.data.idea.API_Fileurl))
    }
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
    amend(this.data.info).then(res => {
      console.log(1111111)
      console.log(res)
  
        util.returnPrev('generalcontract')

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

  // 审核通过
  putin() {
    if (this.data.info.formid) {
      this.setData({
        show: true
      })
    } else {
      util.Triggerflow(this, 'next', 'maincontact', 'generalcontract')
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