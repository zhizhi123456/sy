// pages/generalcontract/pact/pact.js
import {
  queryPersonal,
  qgroupPersonal,
} from '../../../service/getData.js';
var app = getApp();
var util = require("../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    val: 0,
    InfoList: [],
    item: {
      UserName: "",
      Password: "",
      Email: "",
      MobilePIN: "",
      PasswordQuestion: '',
      PasswordAnswer: '',
      IslockedOut: '',
      LastLoginDate: '',
      LastPasswordChangedDate: '',
      LastLockoutDate: '',
      Memo: '',
      EmpCode: '',
      EmpName: '',
      ReportViewPermissions: '',
      FCD: '',
      LUD: ''
    },

  },
  // 返回
  return () {
    util.returnMenu2(1055,'我的信息');
  },
  setSeach(e) {
    // console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    queryPersonal({
      PersonalName: this.data.seach
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        util.outflowlist(item, this)
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();

        this.setData({
          sections: app.globalData.ConstructionTeam
        })
      }
    })
  },
  dispose(that) {
    wx.getStorage({
      key: 'myInfo',
      success(res) {
        // console.log(res.data)
        var s  = res.data
        for(var key in  s){
         if(s[key]===null){
          s[key] = ''
         }
        //  console.log(res.data.IslockedOut)
       }
       res.data.IslockedOut = util.whethercontent(res.data.IslockedOut)
        that.setData({
          'item.UserName': res.data.UserName,
          'item.Password': res.data.Password,
          'item.Email': res.data.Email,
          'item.MobilePIN': res.data.MobilePIN,
          'item.PasswordQuestion': res.data.PasswordQuestion,
          'item.PasswordAnswer': res.data.PasswordAnswer,
          'item.IslockedOut': res.data.IslockedOut,
          'item.LastLoginDate': res.data.LastLoginDate,
          'item.LastPasswordChangedDate': res.data.LastPasswordChangedDate,
          'item.LastLockoutDate': res.data.LastLockoutDate,
          'item.Memo': res.data.Memo,
          'item.EmpCode': res.data.EmpCode,
          'item.EmpName': res.data.EmpName,
          'item.ReportViewPermissions': res.data.ReportViewPermissions,
          'item.FCD': res.data.FCD,
          'item.LUD': res.data.LUD
        })
        wx.hideLoading();
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
    var that = this
    this.dispose(that)

  },
})