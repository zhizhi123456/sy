// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  Projecttype,
  Projectprop,
  Progress1,
  Progress2,
  Progress3,
  department,
  Companytitle,
  Contactman,
  Principal,
  projectadd,
  projectup,
  projectone,
  Customer
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
      projcectCode: "",
      projectname: "",
      FirstCompanyName: "",
      workplace: "",
      FirstReportPrjcode: "",
      Ifmakecontact: "",
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
      department: "",
      mainbuildcontext: "",
      Companytitle: "",
      chiefcontactman: "",
      chargeman: "",
      ifmaterialinto: '',
      ifmaterialcomplete: '',
      projectpercent: 0,
      ifprocessinfosubmit: '',
      ifcompleteinfosubmit: '',
      iftoexam: '',
      iftocheck: '',
      makecontactdemo: "",
      ifbindtoproject: '',
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
    section16: ["是", "否"], //过程资料/隐蔽资料是否已提交
    section17: ["是", "否"], //竣工资料是否已提交
    section18: ["是", "否"], //是否送审
    section19: ["是", "否"], //是否报验
    section20: ["是", "否"], //是否招投标
    section21: ["已签订", "未签订"], //是否招投标
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
    let info = util.editInfo(e, this, e.detail.value);
    // console.log(info)
    this.setData({
      info,
      show_o: false,
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
  // onConfirm1(e) {
  //   let info = util.editInfo(e, this, e.detail.value);
  //   this.setData({
  //     info,
  //     show1: false,
  //   })
  // },
  onConfirm1(e) {
    console.log("1")
    var s = this.data.section1
    var t = s.filter((y) => {
      return y.show
    })
    t = t.map((x) => {
      return x.Value
    })
    t = t.join(",")
    console.log(t)
    let info = util.editInfo(e, this, t);
    this.setData({
      info,
      show1: false,
    })
  },
  onChange(event) {
    // console.log(this.data.section4)
    console.log(event)
    // console.log(event.currentTarget.dataset.name)
    // console.log(this.data.section4)
    var s = this.data.section1
    var y = s.findIndex((r) => {
      return r.Value == event.currentTarget.dataset.name
    })
    // console.log(y)
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show2: false,
    })
  },
  // 工程进度一
  showPopup3() {
    this.setData({
      show4: true
    });
  },
  onClose3() {
    this.setData({
      show4: false
    });
  },
  onConfirm3(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show4: false,
    })
  },
  // 工程进度er

  showPopup4() {
    this.setData({
      show5: true
    });
  },
  onClose4() {
    this.setData({
      show5: false
    });
  },
  onConfirm4(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show5: false,
    })
  },
  // 工程进度3

  showPopup5() {
    this.setData({
      show6: true
    });
  },
  onClose5() {
    this.setData({
      show6: false
    });
  },
  onConfirm5(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show6: false
    })
  },
  // 是否中标

  showPopup6() {
    this.setData({
      show7: true
    });
  },
  onClose6() {
    this.setData({
      show7: false
    });
  },
  onConfirm6(e) {
    let info = util.editInfo(e, this, e.detail.value);
    // console.log("11")
    this.setData({
      info,
      show7: false
    })
  },
  // 市场部邮箱

  showPopup7() {
    this.setData({
      show8: true
    });
  },
  onClose7() {
    this.setData({
      show8: false
    });
  },
  onConfirm7(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show8: false,
    })
  },
  // 成本核算部邮箱
  showPopup8() {
    this.setData({
      show9: true
    });
  },
  onClose8() {
    this.setData({
      show9: false
    });
  },
  onConfirm8(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show9: false,
    })
  },
  // 工程部邮箱
  showPopup9() {
    this.setData({
      show10: true
    });
  },
  onClose9() {
    this.setData({
      show10: false
    });
  },
  onConfirm9(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show10: false,
    })
  },
  // 工程部邮箱
  showPopup10() {
    this.setData({
      show11: true
    });
  },
  onClose10() {
    this.setData({
      show11: false
    });
  },
  onConfirm10(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show11: false,
    })
  },
  // 公司抬头
  showPopup11() {
    this.setData({
      show12: true
    });
  },
  onClose11() {
    this.setData({
      show12: false
    });
  },
  onConfirm11(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show12: false
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show13: false
    })
  },
  // 负责人
  showPopup13() {
    this.setData({
      show14: true
    });
  },
  onClose13() {
    this.setData({
      show14: false
    });
  },
  onConfirm13(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show14: false
    })
  },
  // 材料是否进场
  showPopup14() {
    this.setData({
      show15: true
    });
  },
  onClose14() {
    this.setData({
      show15: false
    });
  },
  onConfirm14(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show15: false
    })
  },
  // 进场资料是否齐全
  showPopup15() {
    this.setData({
      show16: true
    });
  },
  onClose15() {
    this.setData({
      show16: false
    });
  },
  onConfirm15(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show16: false
    })
  },
  // 过程资料/隐蔽资料是否已提交
  showPopup16() {
    this.setData({
      show17: true
    });
  },
  onClose16() {
    this.setData({
      show17: false
    });
  },
  onConfirm16(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show17: false
    })
  },
  // 竣工资料是否已提交
  showPopup17() {
    this.setData({
      show18: true
    });
  },
  onClose17() {
    this.setData({
      show18: false
    });
  },
  onConfirm17(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show18: false
    })
  },
  // 是否送审
  showPopup18() {
    this.setData({
      show19: true
    });
  },
  onClose18() {
    this.setData({
      show19: false
    });
  },
  onConfirm18(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show19: false
    })
  },
  // 是否校验
  showPopup19() {
    this.setData({
      show20: true
    });
  },
  onClose19() {
    this.setData({
      show20: false
    });
  },
  onConfirm19(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show20: false
    })
  },
  // 是否招投标
  showPopup20() {
    this.setData({
      show21: true
    });
  },
  onClose20() {
    this.setData({
      show21: false
    });
  },
  onConfirm20(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show21: false
    })
  },
  // 合同
  showPopup21() {
    this.setData({
      show22: true
    });
  },
  onClose21() {
    this.setData({
      show22: false
    });
  },
  onConfirm21(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show22: false
    })
  },
  // 合同名称
  maincontactnameblur(e) {
    // 输入的内容
    // console.log(e.detail.value)
    let info = util.editInfo(e, this, e.detail.value);
    // console.log(info)
    this.setData({
      info
    })
    // console.log(this.data.info)
  },
  maincontactnameblur1(e) {
    // 输入的百分比
    const c = parseInt(e.detail.value)
    e.detail.value = c
    let info = util.editInfo(e, this, e.detail.value);
    // console.log(info)
    this.setData({
      info
    })
    // console.log(this.data.info)
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
  // 创建时间
  showPopup_time2() {
    this.setData({
      show_time3: true
    })
  },
  onClose_time2() {
    this.setData({
      show_time3: false
    })
  },
  onConfirm_time2(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time3: false
    })
  },
  // 创建时间
  showPopup_time3() {
    this.setData({
      show_time4: true
    })
  },
  onClose_time3() {
    this.setData({
      show_time4: false
    })
  },
  onConfirm_time3(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time4: false
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
  dispose() {
    // 对上传的数据的处理
    let info = this.data.info;

    // if (info.ifwinbid) {
    //   var whether = util.whether(info.ifwinbid)
    //   info.ifwinbid = whether
    // }
    if (info.ifmaterialinto) {
      var whether = util.whether(info.ifmaterialinto)
      info.ifmaterialinto = whether
    }
    if (info.ifmaterialcomplete) {
      var whether = util.whether(info.ifmaterialcomplete)
      info.ifmaterialcomplete = whether
    }
    if (info.ifprocessinfosubmit) {
      var whether = util.whether(info.ifprocessinfosubmit)
      info.ifprocessinfosubmit = whether
    }
    if (info.ifcompleteinfosubmit) {
      var whether = util.whether(info.ifcompleteinfosubmit)
      info.ifcompleteinfosubmit = whether
    }
    if (info.iftoexam) {
      var whether = util.whether(info.iftoexam)
      info.iftoexam = whether
    }
    if (info.iftocheck) {
      var whether = util.whether(info.iftocheck)
      info.iftocheck = whether
    }
    if (info.ifbindtoproject) {
      var whether = util.whether(info.ifbindtoproject)
      info.ifbindtoproject = whether
    }
  
    this.setData({
      info
    })
  },
  confirm() {
    let info = this.data.info;
    util.checkContent(info, this);
    util.intro(info,this)
    if (info.projcectCode && info.FirstCompanyName && info.projectname && info.workplace && info.FirstReportPrjcode && info.Ifmakecontact && info.projectprop && info.projecttype && info.projectaddress && info.planbegindate && info.planenddate && info.demo) {
      this.dispose()
      let infodata = {
        Timestamp: app.globalData.time,
        ...this.data.info
      }
      console.log(infodata)
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
        console.log(error);
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
    this.dispose()
    let infodata = {
      Timestamp: app.globalData.time,
      ...this.data.info
    }
    console.log(infodata)
    projectup(infodata).then(res => {
      console.log(res)
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
    Customer().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.customername
      })
      this.setData({
        section: q
      })
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
      console.log(this.data.section1)
    })
    // 总包项目属性
    Projectprop().then(res => {

      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section2: q
      })

    })
    //工程进度一
    Progress1().then(res => {

      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section3: q
      })

    })
    //工程进度二
    Progress2().then(res => {

      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section4: q
      })
    })
    //工程进度3
    Progress3().then(res => {

      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section5: q
      })
    })

    //部门
    department().then(res => {
      // console.log(res)
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.techofficename
      })
      this.setData({
        section10: q
      })
    })
    Companytitle().then(res => {
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Value
      })
      this.setData({
        section11: q
      })
    })
    // Contactman,
    // Principal
    Contactman().then(res => {
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.Name
      })
      this.setData({
        section12: q
      })
    })
    Principal().then(res => {
      var w = JSON.parse(res)
      var q = w.map(s => {
        return s.EmpName
      })
      this.setData({
        section13: q
      })
    })

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

        let item = res.Item;
        util.handleData(item, this, app.globalData.department);

        // item.ifwinbid = util.whethercontent(item.ifwinbid)
        item.ifmaterialinto = util.whethercontent(item.ifmaterialinto)
        item.ifmaterialcomplete = util.whethercontent(item.ifmaterialcomplete)
        item.iftoexam = util.whethercontent(item.iftoexam)
        item.iftocheck = util.whethercontent(item.iftocheck)
        item.ifprocessinfosubmit = util.whethercontent(item.ifprocessinfosubmit)
        item.ifcompleteinfosubmit = util.whethercontent(item.ifcompleteinfosubmit)
        item.ifbindtoproject = util.whethercontent(item.ifbindtoproject)
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