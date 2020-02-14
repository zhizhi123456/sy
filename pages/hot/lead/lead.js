// pages/hot/lead/lead.js
var util = require("../../../utils/util");
let userinfo = wx.getStorageSync("myInfo");
var app = getApp();
var util = require("../../../utils/util");
import {
  hotjob
} from "../../../service/getData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: true,
    newscontent: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hotjob({
      UserName: userinfo.UserName
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {

        if (res.urgentTaskList.Num == 0) {
          this.setData({
            news: false
          })
        } else {
          var newscontent = res.urgentTaskList.List
          newscontent.forEach(item => {
            item.List.forEach(items => {
              console.log(items.CreateMan)
              app.globalData.Principal.forEach(s => {
                if (s.value == items.CreateMan) {
                  items.CreateMan = s.text
                }
              
              })
              item.TableName=  items.TableNameChinese
            })
          })
          this.setData({
            newscontent
          })
        }
      }
    })
  },
  return () {
    util.returnMenu(1002);
  },

})