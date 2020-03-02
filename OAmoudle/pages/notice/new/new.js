// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addnotice,
  detailnotice,
  updatenotice,
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
      type: '',
      name: '',
      contenttext: "",
      cover: [],
      uplodfile: '',
      isstick: '',
      receivedepartment: '',
      issubdivision: '',
      receivestaff: '',
      API_Picurl: [],
    },
    show_nature: false,
    nature: [],
    sections: [],
    section1: [],
    section2: [],
    section3: [],
    section4: [],
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate3: new Date().getTime(),
    currentDate4: new Date().getTime(),
    show_photo: false,
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
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
    // util.upImage(this);
    util.upImages(this, this.data.info.cover)
  },

  delimg(e) {
    // util.deleteImg(this, e)
    util.deleteImgs(this, e, this.data.info.cover)
  },
  tap_pic(e) {
    // util.preview(this, e)
    util.previews(this, e, this.data.info.cover)
  },
  // 总包项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 公司抬头
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
    // ////console.log(e)
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
    // ////console.log(e)
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
    // ////console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false
    })
  },
  // 公司抬头
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
    // ////console.log(e)
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

  onClose1() {
    this.setData({
      show1: false
    });
  },
  // onConfirm1(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info,
  //     show1: false,
  //   })
  // },
  onConfirm1(e) {
    //console.log("1")
    var s = this.data.section1
    var t = s.filter((y) => {
      return y.show
    })
    t = t.map((x) => {
      return x.Value
    })
    t = t.join(",")
    //console.log(t)
    let info = util.editInfo(e, this, t);
    this.setData({
      info,
      show1: false,
    })
  },
  onChange(event) {
    // //console.log(this.data.section4)
    //console.log(event)
    // //console.log(event.currentTarget.dataset.name)
    // //console.log(this.data.section4)
    var s = this.data.section1
    var y = s.findIndex((r) => {
      return r.Value == event.currentTarget.dataset.name
    })
    // //console.log(y)
    s[y].show = !s[y].show
    this.setData({
      section1: s
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
    //console.log("1")
    var s = this.data.section4
    var t = s.filter((y) => {
      return y.show
    })
    t = t.map((x) => {
      return x.userName
    })
    t = t.join(",")
    let info = util.editInfo(e, this, t);
    // console.log(info)
    this.setData({
      info,
      show3: false,
    })
  },
  onChange1(event) {
    var s = this.data.section4
    var y = s.findIndex((r) => {
      return r.userName == event.currentTarget.dataset.name
    })
    // //console.log(y)
    s[y].show = !s[y].show
    this.setData({
      section4: s
    })

  },
  confirm() {
    // ////console.log(this.data.info)
    if (this.data.info.type && this.data.info.name &&
      this.data.info.isstick) {
      let info = this.data.info;
      if (info.cover) {
        // console.log("tupian")
        this.setData({
          upimg: false
        })
        info.cover = info.cover.join(",")
      }
      util.checkContent(info, this);
      util.intro(info, this)
      this.setData({
        info
      })
      addnotice(this.data.info).then(res => {
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.OAreturn('notice')
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
    util.OAreturn('notice')
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    util.OAreturn('notice', this)
  },
  editconfirm() {
    let info = this.data.info;
    if (info.cover) {
      // console.log("tupian")
      this.setData({
        upimg: false
      })
      info.cover = info.cover.join(",")
    }
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    updatenotice(this.data.info).then(res => {
      // ////console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.ModifyRecord(this.data.information, "OfficeCharge")
        util.OAreturn('notice', this)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nature: app.globalData.YesOrNo,
      sections: app.globalData.department,
      section2: app.globalData.Usesealtype,
      section6: app.globalData.YesOrNo,
      section5: app.globalData.MainSubproject,
      section11: app.globalData.AnnouncementType
    })
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
    department().then(res => {
      //console.log(res)
      var w = JSON.parse(res.replace(/ID/g, 'Value').replace(/techofficename/g, 'text'));
      //console.log(w)
      var q = w.map(s => {
        s.show = false
        return s
      })
      //console.log(q)
      this.setData({
        section1: q
      })
      //console.log(this.data.section1)
    })
    if (options.id) {
      detailnotice({
        ID: options.id
      }).then(res => {
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        if (item.cover) {
          item.cover = item.cover.split(",");
          this.setData({
            upimg: true
          })
        } else {
          item.cover = [];
        }
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        //  对多选的处理
        department().then(res => {
          //console.log(res)
          var w = JSON.parse(res.replace(/ID/g, 'Value').replace(/techofficename/g, 'text'));
          var q = w.map(s => {
            s.show = false
            return s
          })
          //console.log(q)
          this.setData({
            section1: q
          })
          //console.log(this.data.section1)
          var t = this.data.section1
          var q = item.receivedepartment
          console.log(q)
          console.log(typeof q)
          if (q) {
            q = q.split(",")
            let y
            console.log(q)
            q.forEach((s) => {
              y = t.map((w) => {
                if (w.Value == s) {
                  w.show = true
                  return w
                }
              })
            })
            this.setData({
              section1: t
            })
          }


        })
        var t = this.data.section4
        var q = item.receivestaff
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
          info: item,
          section4: t,
        })
      })
    }



  },


})