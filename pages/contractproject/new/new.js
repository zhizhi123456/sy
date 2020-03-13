// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  Projecttype,
  projectadd,
  projectup,
  projectone,
  qgroupbid,
  detailbid,
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upimg: false,
    departmenttext: "请选择",
    info: {
      projcectCode: "",
      projectname: "",
      FirstCompanyName: "",
      workplace: "",
      FirstReportPrjcode: "",
      Ifmakecontact: "已签订",
      projectprop: "",
      projecttype: "",
      projectaddress: "",
      planbegindate: "", //日期
      planenddate: "", //日期
      demo: "",
      progress1: "",
      progress2: "",
      progress3: "",
      ifwinbid: "",
      engineeremail: "",
      costacountemail: "",
      marketemail: "",
      department: '',
      mainbuildcontext: "",
      Companytitle: "",
      chiefcontactman: "",
      chargeman: userinfo.UserName,
      ifmaterialinto: false,
      ifmaterialcomplete:false,
      projectpercent: 0,
      ifprocessinfosubmit:false,
      ifcompleteinfosubmit: false,
      iftoexam: false,
      iftocheck: false,
      makecontactdemo: "",
      ifbindtoproject:false,
      bindtoprojectcode: "",
      updateman: "",
      updatetime: "",
      createman: "",
      createtime: "",
      contcatphoto: [],
      API_Picurl: []

    },
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate3: new Date().getTime(),
    currentDate4: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_time: false,
    show_time1: false,
    show_time3: false,
    show_time14: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
    show8: false,
    show9: false,
    show10: false,
    show11: false,
    show12: false,
    show13: false,
    show14: false,
    show15: false,
    show16: false,
    show17: false,
    show18: false,
    show19: false,
    show20: false,
    show21: false,
    show22: false,
    section: [],
    sections: [],
    firms: [],
    totals: [],
    section1: [], //项目类型
    section2: [], //总包项目属性
    section3: [], //工程进度一
    section4: [], //工程进度2
    section5: [], //工程进度3
    section6: ["中标", "丢标"], //是否中标
    section7: ["shichangbuyouxiang8"], //市场部邮箱
    section8: ["chengbeb@163.com9"], //成本核算部邮箱
    section9: ["gongchengbu@163.com1"], //工程部邮箱
    section10: [], //部门
    section11: [], //公司抬头
    section12: [], //主要联系人
    section13: [], //负责人
    section14: ["是", "否"], //材料是否进场
    section15: ["是", "否"], //进场材料是否齐全
    YesOrNo: app.globalData.YesOrNo, //过程资料/隐蔽资料是否已提交
    section17: ["是", "否"], //竣工资料是否已提交
    section18: ["是", "否"], //是否送审
    section19: ["是", "否"], //是否报验
    section20: ["是", "否"], //是否招投标
    section21: ["已签订", "未签订"], //是否招投标
    radio: '1',
  },
  onClick(e) {
    let info = util.editInfo(e, this, e.currentTarget.dataset.state);
    this.setData({
      info
    });
  },
  // 总包项目
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
    // //console.log(e.detail.value.text)
    let info = util.editInfo(e, this, e.detail.value.text);
    // //console.log(info)
    this.setData({
      info,
      show_o: false,
    })
    detailbid({ID:e.detail.value.value}).then(res=>{
      if(res.code == 10000 && res.Item){
        var item = util.outflow(res.Item)
        this.setData({
          // projectname
          'info.projectname':item.projectname,
          // 项目名称
          'info.projecttype':item.projecttype,
          // 项目类型
          'info.projectprop':item.projectprop,
          // 总包项目属性
          'info.projectaddress':item.projectaddress,
          // 项目地址
          'info.bindtoprojectcode':e.detail.value.text
        })
      }
    })

  },
  // 项目类型
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

    var s = this.data.section1
    var y = s.findIndex((r) => {
      return r.Value == event.currentTarget.dataset.name
    })

    s[y].show = !s[y].show
    this.setData({
      section1: s
    })

  },
  //总包项目属性

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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false,
    })
  },
  // 主要联系人
  showPopup12() {
    this.setData({
      show13: true
    });
  },
  onClose12() {
    this.setData({
      show13: false
    });
  },
  onConfirm12(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show13: false
    })
  },
  // 合同名称
  maincontactnameblur(e) {
    // 输入的内容
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  maincontactnameblur1(e) {
    // 输入的百分比
    const c = parseInt(e.detail.value)
    e.detail.value = c
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 签订时间
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
  // 计划开工时间
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
  // 照片
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
    let info = this.data.info;
    util.checkContent(info, this);
    util.intro(info,this)
    if (info.projcectCode && info.FirstCompanyName && info.projectname && info.workplace && info.FirstReportPrjcode && info.Ifmakecontact && info.projectprop && info.projecttype && info.projectaddress && info.planbegindate && info.planenddate && info.demo) {
      let infodata = {
        Timestamp: app.globalData.time,
        ...this.data.info
      }
      projectadd(infodata).then(res => {
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: '/pages/contractproject/pact/pact'
          })
        }
      }).catch(error => {
        //console.log(error);
      });

    } else {
      Toast({
        message: '请填写必填项',
        mask: true
      });
    }


  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/contractproject/pact/pact"
    })
  },
  // 编辑合同页面的确定和返回
  editreturn() {
    wx.redirectTo({
      url: "/pages/contractproject/detail/detail?id=" + this.data.info.ID
    })
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this,app.globalData.department);
    util.intro(info,this)
    let infodata = {
      Timestamp: app.globalData.time,
      ...this.data.info
    }
    //console.log(infodata)
    projectup(infodata).then(res => {
      //console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/contractproject/detail/detail?id=" + this.data.info.ID
        })
      }
    })
  },
  qingqiu() {
    //甲方单位名称
    this.setData({
      section2:app.globalData.Projectprop,
      section12: app.globalData.Contactman,
    })
    //项目类型请求
    Projecttype().then(res => {
      var w = JSON.parse(res)
      var q = w.map(s => {
        s.show = false
        return s
      })
      this.setData({
        section1: q
      })
      //console.log(this.data.section1)
    })
    qgroupbid().then(res=>{
      //console.log(res)
      if(res.code==10000&&res.List){
        var res1 = JSON.stringify(res.List)
        let bidlist = JSON.parse(res1.replace(/ID/g, 'value').replace(/bidprojectcode/g, 'text'));
        this.setData({
          section22 : bidlist
        })
      }else{
        this.setData({
          section22 :[]
        })
      }
      //console.log(this.data.section22)
    })
    // chargeman
    var user = wx.getStorageSync("myInfo");
    if (user) {
      var message = wx.getStorageSync("message");
      //console.log(message)
      let info = this.data.info;
      info.department = message.department
      info.Companytitle = message.Companytitletext,
      info.chargeman = message.userId
      this.setData({
        info,
        departmenttext:message.departmenttext
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      projectone({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
      //console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item,this)
        //  对多选的处理
        var t = this.data.section1
        var q = item.projecttype
        q = q.split(",")
        let y
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
        this.setData({
          info: item
        })
      })
    }
  },
})