// pages/new/new.js


import Toast from 'vant-weapp/dist/toast/toast';
import {
  addcease,
  updatecease,
  detailcease,
  MainSubproject, //工程编号
  Companytitle, //施工单位 建设单位
  Principal, //主送人 抄送人调用
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upimg: false,
    departmenttext: "请选择",
    info: {
      projectcode: '',
      site: '',
      Developerunit: '',
      Constructionunit: '',
      meetbriefcontext: '',
      planDate: '',
      practicalDate: '',
      issue: "",
      suggest: "",
      readpeople: '',
      copypeople: '',
      Companytitle: ''
    },
    checked: false,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show_time: false,
    show_time1: false,
    sections: [],
    section2: [],
    section3: [],
    section4: []

  },
  // 工程编号及名称
  showPopup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onConfirm(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 职位职称
  showPopup_o() {
    this.setData({
      show_o: true
    });
  },
  onClose_o() {
    this.setData({
      show_o: false
    });
  },
  onConfirm_o(e) {
    let info = util.editInfo(e, this, e.detail.value);
    // console.log(info)
    this.setData({
      info,
      show_o: false,
    })
  },
  // 施工单位
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  onClose1() {
    this.setData({
      show1: false
    });
  },
  onConfirm1(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show1: false,
    })
  },
  //主送人
  showPopup2() {
    this.setData({
      show2: true
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },
  onConfirm2(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show2: false,
    })
  },
  // 抄送人
  showPopup3() {
    this.setData({
      show3: true
    });
  },
  onClose3() {
    this.setData({
      show3: false
    });
  },
  onConfirm3(e) {
    console.log("1")
    var s = this.data.section4
    var t = s.filter((y) => {
      return y.show
    })
    t = t.map((x) => {
      return x.userName
    })
    t = t.join(",")
    let info = util.editInfo(e, this, t);
    this.setData({
      info,
      show3: false,
    })
  },
  onChange(event) {
    // console.log(this.data.section4)
    // console.log(event)
    // console.log(event.currentTarget.dataset.name)
    // console.log(this.data.section4)
    var s = this.data.section4
    var y = s.findIndex((r) => {
      return r.userName == event.currentTarget.dataset.name
    })
    // console.log(y)
    s[y].show = !s[y].show
    this.setData({
      section4: s
    })

  },
  // 填报单位
  showPopup4() {
    this.setData({
      show4: true
    });
  },
  onClose4() {
    this.setData({
      show4: false
    });
  },
  onConfirm4(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show4: false,
    })
  },
  // 会议名称
  meetnamelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 计划停(复)工日期
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
  // 实际停(复)工日期
  showPopup_time1() {
    this.setData({
      show_time1: true
    })
  },
  onClose_time1() {
    this.setData({
      show_time1: false
    })
  },
  onConfirm_time1(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time1: false
    })
  },
  // 会议地点
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 会议纪要
  meetbriefcontextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
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
    util.upImage(this);
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.projectcode && this.data.info.site) {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      addcease(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('workorder');
        } else {
          let info = this.data.info;
          info.API_Picurl = [];
          this.setData({
            info
          })
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
    util.returnPrev('workorder');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('workorder', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    updatecease(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('workorder', this);
      }
    })
  },
  // MainSubproject,//工程编号
  // Companytitle,//施工单位 建设单位
  // Principal,//主送人 抄送人调用
  qingqiu() { //项目类型请求
    MainSubproject().then(res => {
      console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.subprojectname
      })
      this.setData({
        section1: q
      })
    })

    Companytitle().then(res => {
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section2: q
      })
    })
    // Principal

    Principal().then(res => {
      var w = JSON.parse(res)
      var q = w.map(s => {
        s.show = false
        return s
      })
      var p = w.map(s => {

        return s.EmpName
      })
      this.setData({
        section3: p,
        section4: q
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    this.setData({
      sections: app.globalData.department
    })
    if (options.id) {
      detailcease({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item,this)
       
        var t = this.data.section4
        var q = item.copypeople
        q = q.split(",")
        let y
        q.forEach((s) => {
          y = t.map((w) => {
            if (w.userName == s) {
              w.show = true
              return w
            }
          })
        })
        this.setData({
          section4: t,
          info: item
        })
      })
    }
  },

})