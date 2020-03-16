// pages/generalcontract/detail/detail.js
import {
  referLedger,
  amendLedger,
  cancelLedger,
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    info: {},
    steps: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
  },
  onChange(e) {
    this.setData({
      tab: e.detail.name
    })
  },
  upp_f() {
    if (this.data.info.Minutesofmeeting.length || this.data.info.API_Picurl.length) {
      let info = this.data.info;
      util.checkChange(info, this, app.globalData.department);
      this.setData({
        info
      })
      amendLedger(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('ledger', this);
          this.setData({
            isup: true
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先选择文件',
        icon: 'none',
        duration: 2000
      })
    }
  },
  delF(e) {
    console.log(e)
    let info = this.data.info,
      i = e.currentTarget.dataset.index;
    info.Minutesofmeeting.splice(i, 1);
    this.setData({
      info
    })
  },
  downF(e) {
    console.log(e)
    wx.downloadFile({
      url: this.data.info.Minutesofmeeting[e.currentTarget.dataset.index].url,
      success: function (res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '已下载，预览中',
            icon: 'loading',
            duration: 10000
          })
          var Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
          var index = Path.lastIndexOf(".");
          var fileType = Path.substring(index + 1).toLowerCase();
          wx.openDocument({
            filePath: Path,
            fileType: fileType,
            success: function (res) {
              // console.log('打开文档成功');
              wx.hideToast();
            },
            fail: function (res) {
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
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  // 返回
  return () {
    util.returnPrev('ledger')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      referLedger({
        ID: options.id
      }).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          this.setData({
            info: item
          })
          wx.hideLoading();
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
    // console.log(this.data.info)
  },
  // 删除
  delete() {
    // console.log(this.data.info)
    util.expurgate(this, cancelLedger, 'ledger')
  },
})