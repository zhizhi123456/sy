// pages/generalcontract/detail/detail.js
import {
  referPayment,
  cancelPayment,
  amendPayment,
} from '../../../../service/getData.js';
var app = getApp();
var util = require("../../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    stepLIst: [],
    tab: 'a',
    returned: true,
    isreturn: true,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
  },
  // 返回
  return () {
    let menus = wx.getStorageSync('menus');
    if (menus.caption) {
      wx.redirectTo({
        url: '/OAmoudle/pages/payment/pact/pact'
      })
    } else {
      util.OAreturn('payment');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    userinfo = wx.getStorageSync("myInfo");
    this.setData({
      userinfo: userinfo
    })
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      this.setData({
        options: options
      })
      referPayment({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          let menus = wx.getStorageSync('menus');
          if (menus.caption == '我申请' && this.data.info.ApplygetNew) {
            let info = this.data.info;
            info.ApplygetNew = false;
            util.checkChange(info, this, app.globalData.department);
            this.setData({
              info
            })
            amendPayment(this.data.info).then(res => {
              if (res.code == 10000) {
                console.log('已查看')
              }
            })
          }
          wx.hideLoading();
          // 调取工作流记录
          let mid = res.Item.formid;
          util.workList(this, mid, 'paymentapproval', this.data.info.ID);
          //处理状态判断
          util.checkState(this, mid, 'paymentapproval', item.CurStepbh);
        }
      })
    }
  },
  // API_Fileurl: "[{"name":"测试.txt","size":"168B","url":"https://shangyongren.com:9098/record/wxca85817190fbcb2b.o6zAJs8LJ0GO_GVf_7GZ-069LuiE.UT9s863gu88R96d9701b6e291292ff9bab99ffeedc99.txt"}]"
  // API_Picurl: "["https://shangyongren.com:9098/image/wxca85817190fbcb2b.o6zAJs8LJ0GO_GVf_7GZ-069LuiE.Jm1yaW89MX523a597e77ebe1abd0ba35b674e3fa20f3.jpg"]"
  // ApprovalOpinion: "测试啊啊啊"
  // ID: 14796
  // actstep: 0
  // createman: "眭欣"
  // createtime: "2020-03-06 17:59:00"
  // curdealaction: "1"
  // curdealopinion: "1"
  // curdealrole: ""
  // curdealuser: "眭欣"
  // flowroundtimes: 1
  // ifcurstepdeal: true
  // ifflowback: false
  // ifsubnextstep: false
  // nextdealrole: "RoleType006"
  // nextdealuser: "徐加广"
  // nextstepid: 2
  // nextstepname: "部门经理审核"
  // stepid: 3
  // stepname: "成本核算部经理审核"
  // submittime: "1900-01-01 00:00:00"
  // updateman: ""
  // updatetime: "0001-01-01 00:00:00"
  // workflowformid: 14794
  // workflowid: 25
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
    let info = this.data.info,
      i = e.currentTarget.dataset.index;
    info.Minutesofmeeting.splice(i, 1);
    this.setData({
      info
    })
  },
  downF(e) {
    console.log(e.currentTarget.dataset)
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.showToast({
            title: '下载成功,预览中...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          var Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
          var index = Path.lastIndexOf(".");
          var fileType = Path.substring(index + 1).toLowerCase();
          wx.openDocument({
            filePath: Path,
            fileType: fileType,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: function (res) {
              console.log(res)
              wx.showToast({
                title: '预览文档失败,仅支持doc,docx,xls,xlsx,ppt,pptx,pdf',
                icon: "none",
                duration: 3000
              });
            }
          })
        }
      },
      fail(err) {
        wx.showToast({
          title: '下载文件失败',
          icon: "none",
          duration: 3000
        });
      }
    })
  },
  // 文件上传
  up_file() {
    util.upFile(this);
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
      util.upImage(this, 1);
    } else {
      util.upImage(this, 0);
    }
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
    util.Triggerflow(this, 'return', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '不同意。', JSON.stringify(this.data.info.API_Picurl), JSON.stringify(this.data.info.Minutesofmeeting))
  },
  sconfirm() {
    util.Triggerflow(this, 'next', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa', this.data.ApprovalOpinion ? this.data.ApprovalOpinion : '同意。', JSON.stringify(this.data.info.API_Picurl), JSON.stringify(this.data.info.Minutesofmeeting))
  },
  // 审核通过
  putin() {
    if (this.data.info.formid) {
      this.setData({
        show: true
      })
    } else {
      util.Triggerflow(this, 'next', 'paymentapproval', 'payment', '', '', '', '', '', '', 'oa')
    }
  },
  // 删除
  delete() {
    let that = this;
    wx.showModal({
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          cancelPayment({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              setTimeout(function () {
                util.OAreturn('payment');
              }, 1000)
            }
          })
        }
      }
    })
  },
  // 点击图片放大预览
  tap_pic(e) {
    console.log(e);
    let pic_arr = [],
      index = e.currentTarget.dataset.index;
    pic_arr.push(e.currentTarget.dataset.url);
    if (pic_arr.length) {
      wx.previewImage({
        urls: pic_arr, //需要预览的图片http链接列表，注意是数组
        current: pic_arr[index], // 当前显示图片的http链接，默认是第一个
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }
  },
  defaultimg(e) {
    let info = util.defaultimg(e, this);
    this.setData({
      info
    })
  },
})