// pages/bill/detaillink/detaillink.js
import {
  detailapplyForsmall,
  delapplyForsmall,
  detailapplyFor,
  addapplyForsmall,
  updateapplyForsmall,
  addDictionary,
  applytype,
  UnitType,
  queryapplyForsmall,
  delapplyFor,
  updateapplyFor,
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    speak: '',
    show: false,
    info: {},
    bill: {},
    active: 0,
    steps: [],
    material_list: [],
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/OAmoudle/pages/applyFor/detail/detail?id=" + this.data.info.applyid + "&table=c"
    })
  },
  delete() {
    // util.OAexpurgateDetail(this, delapplyForsmall, 'applyFor', this.data.info.applyid)
    var that = this
    wx.showModal({
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          delapplyForsmall({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              queryapplyForsmall({
                applyid: that.data.info.applyid
              }).then(res => {
                // console.log(res)
                if (res.code == 10000) {
                  let item = res.List;
                  var sum = 0
                  item.forEach(s => {
                    sum = s.quantity * s.unitprice + sum
                  });
                  sum = Number(sum).toFixed(2)
                  detailapplyFor({
                    ID: that.data.info.applyid
                  }).then(res => {
                    let item = res.Item;
                    var data1 = res.Item
                    var b = JSON.stringify(data1)
                    var c = JSON.parse(b)
                    util.ModifyRecord(c, "applyform")
                    item.TotalSum = sum
                    item.Chinesenumerals = util.Uppercase(sum)
                    util.checkChange(item, that, app.globalData.department);
                    util.intro(item, that)
                    updateapplyFor(item).then(res => {
                      if (res.code == 10000) {
                        wx.showToast({
                          title: '编辑成功',
                          icon: 'success',
                          duration: 3000
                        })
                        wx.redirectTo({
                          url: "/OAmoudle/pages/applyFor/detail/detail?id=" + that.data.info.applyid + "&table=c"
                        })
                      }
                    })
                  })

                }
              })
            }
          })
        }
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
    if (options.detailid) {
      // 资料详情
      this.setData({
        billid:options.detailid
      })
      detailapplyForsmall({
        ID: options.detailid
      }).then(res => {
        if (res.code == 10000) {
          // console.log(res)
          let item = res.Item;
          util.handleData(item, this, app.globalData.department)
          util.outflowsmall(item)
          this.setData({
            info: item
          })
          return detailapplyFor({
            ID: this.data.info.applyid
          })
        }
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department)
        this.setData({
          bill: item
        })
        wx.hideLoading();
      })
    }
  },

})