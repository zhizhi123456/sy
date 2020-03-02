// pages/generalcontract/pact/pact.js
import {
  queryplot,
  qgroupplot
} from '../../../../service/getData';
var app = getApp();
var util = require("../../../../utils/util");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seach: '',
    loading: false,
    InfoList: [],
    info: {
      applycancelman: "",
      Companytitle: "",
      department: "",
      begintime:"",
      endtime:""
    },
    sections: '',
    pull: false,
    show: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show_time: false,
    show_endtime: false,
  },
  // 返回
  return () {
    util.returnMenu2(2055,"日常办公")
  },
  setSeach(e) {
    // //console.log(e)
    this.setData({
      seach: e.detail.value
    })
  },
  // 模糊查询
  seachInfo() {
    wx.showLoading({
      title: '加载中',
    });
    queryplot({
      blockname: this.data.seach
    }).then(res => {
      // //console.log(res)
      if (res.code == 10000) {
        let item = res.List;
        util.listData(item, app.globalData.department);
        util.outflowlist(item, this)
        this.setData({
          InfoList: item.reverse()
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sections: app.globalData.Companytitle,
      section1:app.globalData.states,
      section2: app.globalData.department,
      section5: app.globalData.Principal,
      section4: app.globalData.Usesealtype,
      section3:app.globalData.Debitnotetype,
      section6:app.globalData.MainProject1,
      section7:app.globalData.MainSubproject
    })

    
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      seach:""
    })
    this.seachInfo()
   
    //console.log(this.data.section3)

  },
  meetplaceblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show1: false,
      // departmenttext: e.detail.value.text
    })
  },
   // 部门
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show2: false
    })
  },
  // 费用对象
  showPopup3() {
    this.setData({
      show3: true
    })
  },
  onClose3() {
    this.setData({
      show3: false
    })
  },
  onConfirm3(e) {
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show3: false
    })
  },
  // 费用类型
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
    // //console.log(e)
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show4: false
    })
  },
    // 创建人
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
      // //console.log(e)
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
        // //console.log(e)
        let info = util.editInfo(e, this, e.detail.value.value);
        this.setData({
          info,
          show6: false
        })
      },
        // 
    showPopup7() {
      this.setData({
        show7: true
      })
    },
    onClose7() {
      this.setData({
        show7: false
      })
    },
    onConfirm7(e) {
      // //console.log(e)
      let info = util.editInfo(e, this, e.detail.value.value);
      this.setData({
        info,
        show7: false
      })
    },
  // 计划开工时间
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
  // 计划完工时间
  showPopup_endtime() {
    this.setData({
      show_endtime: true
    })
  },
  onClose_endtime() {
    this.setData({
      show_endtime: false
    })
  },
  //公司抬头
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
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
    })
  },
  onConfirm_endtime(e) {
    // //console.log(e)
    // //console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
    })
  },
  change() {
    this.setData({
      pull: true,
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 组合查询
  seachqur() {
    util.qgroupdeliver(qgroupplot, this)
  },
})