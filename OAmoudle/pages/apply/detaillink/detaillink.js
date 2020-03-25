// pages/bill/detaillink/detaillink.js
import {
  detailapplysmall,
  delapplysmall,
  detailapply,
  addapplysmall,
  updateapplysmall,
  addDictionary,
  UnitType,
  queryapplysmall,
  updateapply,
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
      url: "/OAmoudle/pages/apply/detail/detail?id=" + this.data.info.applybuyid + "&table=c"
    })
  },
  delete() {
    // util.OAexpurgateDetail(this, delapplysmall, 'apply', this.data.info.applybuyid)
    var that = this
    wx.showModal({
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          delapplysmall({
            ID: that.data.info.ID
          }).then(res => {
            if (res.code == 10000) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              queryapplysmall({
                applybuyid: that.data.info.applybuyid
              }).then(res => {
                // console.log(res)
                if (res.code == 10000) {
                  let item = res.List;
                  var sum = 0
                  item.forEach(s => {
                    sum = s.quantity * s.univalence + sum
                  });
                  sum = Number(sum).toFixed(2)
                  detailapply({
                    ID: that.data.info.applybuyid
                  }).then(res => {
                    let item = res.Item;
                    var data1 = res.Item
                    var b = JSON.stringify(data1)
                    var c = JSON.parse(b)
                    util.ModifyRecord(c, "applybuyform")
                    item.TotalSum = sum
                    item.Chinesenumerals = util.Uppercase(sum)
                    util.checkChange(item, that, app.globalData.department);
                    util.intro(item, that)
                    updateapply(item).then(res => {
                      if (res.code == 10000) {
                        wx.showToast({
                          title: '编辑成功',
                          icon: 'success',
                          duration: 3000
                        })
                        wx.redirectTo({
                          url: "/OAmoudle/pages/apply/detail/detail?id=" + that.data.info.applybuyid + "&table=c"
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
      detailapplysmall({
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
          return detailapply({
            ID: this.data.info.applybuyid
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