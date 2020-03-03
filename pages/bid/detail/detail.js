// / pages/generalcontract/detail/detail.js
import {
  detailbid,
  delbid,
  updatebid
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
    tab: 'a',
    returned: true,
    isreturn: true,

  },
  // 返回
  return () {
    util.returnPrev('bid')
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
  up_file() {

    var that = this
    console.log("1")
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        const tempFiles = res.tempFiles[0].path
        const names = res.tempFiles[0].name
        console.log(res)
        console.log(tempFiles)
        wx.uploadFile({
          url: 'https://shangyongren.com:9098/api/record/Get_rec', //仅为示例，非真实的接口地址
          filePath: tempFiles,
          name: 'file_data',
          success(res) {
            console.log(res.data)
            if (res.statusCode == 200) {}
            var arr = that.data.info.API_uploadfile
            var s = {
              name: names,
              path: "https://shangyongren.com:9098" +JSON.parse(res.data)
            }
            arr.push(s)
            var infos = that.data.shuju
            infos.API_uploadfile = JSON.stringify(arr)
            console.log(infos)
            updatebid(
              infos
            ).then(res => {
              console.log(res)
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                mask: true,
                duration: 3000
              })
              util.returnPrev('bid', that)
            })
          }
        })
      }
    })
  },
  down(e) {
    console.log(e)
    // e.currentTarget.dataset.down
    wx.showLoading({
      title: '下载中',
    });
    wx.downloadFile({
      url: e.currentTarget.dataset.down, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.hideLoading()
          wx.showToast({
            title: '下载成功,预览中...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          var filePath = res.tempFilePath
          var index = filePath.lastIndexOf(".");
          var fileType = filePath.substring(index + 1).toLowerCase();
          wx.openDocument({
                  filePath: filePath,
                  fileType:fileType,
                  success: function (res) {
                    console.log('打开文档成功')
                    wx.hideToast();
                  },
                  fail(err) {
                    wx.showToast({
                      title: '预览文档失败,仅支持doc,docx,xls,xlsx,ppt,pptx,pdf',
                      icon:"none",
                      duration: 3000
                  });
                  }
                });
          // wx.saveFile({
          //   tempFilePath: res.tempFilePath,
          //   success(res) {
              
          //     wx.openDocument({
          //       filePath: res.savedFilePath,
          //       fileType:fileType,
          //       success: function (res) {
          //         console.log('打开文档成功')
          //         wx.hideToast();
          //       },
          //       fail(err) {
          //         wx.showToast({
          //           title: '预览文档失败,仅支持doc,docx,xls,xlsx,ppt,pptx,pdf',
          //           icon:"none",
          //           duration: 3000
          //       });
          //       }
          //     });
          //   },
          //   fail(err) {
          //     console.log(err, "不能下载")
          //     wx.getSavedFileList({
          //       success(res) {
          //         res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
          //           // 删除存储的垃圾数据
          //           wx.removeSavedFile({
          //             filePath: val.filePath
          //           });
          //         })
          //       }
          //     })
          //   }

          // })

        }
      },
      fail(err) {
        wx.showToast({
          title: '下载文件失败',
          icon:"none",
          duration: 3000
      });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    if (options.id) {
      this.setData({
        fileid: options.id
      })
    }
    if (options.id) {
      detailbid({
        ID: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          if (item.API_uploadfile == "[object Object]") {
            item.API_uploadfile = []
          } else {
            if (item.API_uploadfile) {
              item.API_uploadfile = JSON.parse(item.API_uploadfile)
            } else {
              item.API_uploadfile = []
            }
          }
          util.handleData(item, this, app.globalData.department);
          util.outflow(item, this)
          this.setData({
            info: item
          })
          wx.hideLoading();
          // 调取工作流记录
          //列表
          let mid = res.Item.formid;
          if (mid) {
            util.workList(this, mid, 'bidtoproject')
          }
          //处理状态判断
          util.checkState(this, mid, 'bidtoproject', item.CurStepbh);
        }
      })
      detailbid({
        ID: this.data.fileid
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          let item = res.Item;
          util.checkChange(item, this, app.globalData.department);
          util.intro(item, this)
          this.setData({
            shuju: item
          })
        }
      })
    }
  },
  // 工作流流转
  // 退回上步
  sendback() {
    util.Triggerflow(this, 'return', 'bidtoproject', 'bid')
  },
  // 提交下步
  putin() {
    util.Triggerflow(this, 'next', 'bidtoproject', 'bid')
  },
  // 删除
  delete() {
    util.expurgate(this, delbid, 'bid')
  },
})