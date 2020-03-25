// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  adddaily,
  detaildaily,
  updatedaily,
  department,
  Principal
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      API_Picurl: [],
      fileurl: [],
      dailylogman:'',
      department:'',
      dailylogdate:'',
      dailylogTopic:'',
      dailylogContext:'',
      specialexplan:''

    },
    show2: false,
    show_time: false,
    currentDate: new Date().getTime(),
    show_photo: false,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    fileshow: true,
    up_F: true,
    ifsame:true
  },
  // 文件上传
  up_file() {
    util.upFilelog(this);
  },
  delF(e) {
    util.delFillog(this, e);
  },
  downF(e) {
    util.lookFileIDEA(e);
  },
  // 图片
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
    util.upImage(this);
  },

  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司名称
  showPopup_4() {
    this.setData({
      show_nature: true
    })
  },
  onClose_4() {
    this.setData({
      show_nature: false
    })
  },
  onConfirm_4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_nature: false
    })
  },
  // 部门
  showPopup1() {
    this.setData({
      show1: true
    })
  },
  onClose1() {
    this.setData({
      show1: false
    })
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show1: false
    })
  },
  // 所有人
  showPopup2() {
    this.setData({
      show2: true
    })
  },
  onClose2() {
    this.setData({
      show2: false
    })
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false
    })
  },
  // 公司名称
  showPopup4() {
    this.setData({
      show4: true
    })
  },
  onClose4() {
    this.setData({
      show4: false
    })
  },
  onConfirm4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false
    })
  },
  // 分包项目编号
  showPopup5() {
    this.setData({
      show5: true
    })
  },
  onClose5() {
    this.setData({
      show5: false
    })
  },
  onConfirm5(e) {
    // ////console.log(e)
    let info = util.editInfo(e, this, e.detail.value.value);
    this.setData({
      info,
      show5: false
    })
  },
  // 项目编号
  showPopup6() {
    this.setData({
      show6: true
    })
  },
  onClose6() {
    this.setData({
      show6: false
    })
  },
  onConfirm6(e) {
    // ////console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show6: false
    })
  },
  // 进场日期
  showPopup_time() {
    this.setData({
      show_time: true
    })
  },
  onClose_time() {
    this.setData({
      show_time: false
    })
  },
  onConfirm_time(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time: false
    })
  },
  confirm() {
    if (this.data.info.dailylogman && this.data.info.dailylogdate &&
      this.data.info.dailylogTopic) {
      let info = this.data.info;

      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      adddaily(this.data.info).then(res => {
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('daily')
        }
      })
    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }
  },
  // 返回
  return () {
    util.OAreturn('daily')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.OAreturn('daily', this)
  },
  editconfirm() {
    let info = this.data.info
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    console.log((info.fileurl.length && this.data.fileshow))
    this.setData({
      info
    })
    updatedaily(this.data.info).then(res => {
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "dailylog")
        util.OAreturn('daily', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      section11: app.globalData.moredep,

    })
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = app.globalData.message
      console.log(app.globalData.message)
      let info = this.data.info;
      info.dailylogman = message.userId
      info.department = message.departmenttext
      info.dailylogTopic = message.userId + '的' + util.formatTime1(new Date()) + '工作日志'
      this.setData({
        info
      })
    }
    console.log(options)
    if (options.id) {
      detaildaily({
        ID: options.id
      }).then(res => {
        console.log(res)
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          info: item
        })
        if(item.dailylogdate.slice(0,10)==(util.format(new Date()).slice(0,10))){
          console.log('同一天')
          this.setData({
            ifsame:true
          }) 
        }else{
          console.log('不是同一天')
          this.setData({
            ifsame:false
          }) 
        }
      })
    }



  },


})