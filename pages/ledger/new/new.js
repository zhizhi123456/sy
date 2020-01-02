// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addLedger,
  referLedger,
  amendLedger
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      reportbuildnumber: '',
      tasknumber: '',
      projectname: '',
      operators: '',
      intecoordinationunit: '',
      cableputintounit: '',
      supervisorunit: '',
      area: '',
      buildarea: '',
      orderissueddate: '',
      planstartdate: '',
      planenddate: '',
      contructstate: '',
      designstate: '',
      designman: '',
      onsiteinitialcheckdate: '',
      designentrustdate: '',
      designjointhearingdate: '',
      jointhearsubdate: '',
      pipedesignpublishdate: '',
      linedesignpublishdate: '',
      designplanmark: '',
      indoorpipefinishratio: '',
      outdoorpipefinishratio: '',
      projectcontactman: '',
      circuitcheckfinishdate: '',
      pipedesignreviewdate: '',
      pipedesignfinishdate: '',
      pipestartdate: '',
      pipefinishdate: '',
      pipefirstcheck: '',
      checkstampdate: '',
      panmeetingstartdate: '',
      panworkcontactman: '',
      pancompletionrate: '',
      panreportdate: '',
      linefinrate: '',
      easterncablefinishrate: '',
      linedesignfindate: '',
      linestartdate: '',
      lineteardown: '',
      address: '',
      currentquestion: ''
    },
    currentDate: new Date().getTime(),
    show_time1: false,
    show_time2: false,
    show_time3: false,
    show_time4: false,
    show_time5: false,
    show_time6: false,
    show_time7: false,
    show_time8: false,
    show_time9: false,
    show_time10: false,
    show_time11: false,
    show_time12: false,
    show_time13: false,
    show_time14: false,
    show_time15: false,
    show_time16: false,
    show_time17: false,
    show_time18: false,
    show_time19: false,
    show_time20: false,
    show_time21: false,
  },
  // 报建编号
  reportbuildnumberblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 任务单编号
  tasknumberblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 项目名称
  projectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 运营商
  operatorsblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 综合协调单位
  intecoordinationunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 线缆实施单位
  cableputintounitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理单位
  supervisorunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 所属区
  areablur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 建筑面积
  buildareablur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 任务单下发时间
  showPopup_time1() {
    this.setData({
      show_time1: true
    });
  },
  onClose_time1() {
    this.setData({
      show_time1: false
    });
  },
  onConfirm_time1(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time1: false
    })
  },
  // 计划开工时间
  showPopup_time2() {
    this.setData({
      show_time2: true
    });
  },
  onClose_time2() {
    this.setData({
      show_time2: false
    });
  },
  onConfirm_time2(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time2: false
    })
  },
  // 计划完工时间
  showPopup_time3() {
    this.setData({
      show_time3: true
    });
  },
  onClose_time3() {
    this.setData({
      show_time3: false
    });
  },
  onConfirm_time3(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time3: false
    })
  },
  // 施工状态
  contructstateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 设计状态
  designstateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 设计人员
  designmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 现场初步勘察时间
  showPopup_time4() {
    this.setData({
      show_time4: true
    });
  },
  onClose_time4() {
    this.setData({
      show_time4: false
    });
  },
  onConfirm_time4(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time4: false
    })
  },
  // 设计委托时间
  showPopup_time5() {
    this.setData({
      show_time5: true
    });
  },
  onClose_time5() {
    this.setData({
      show_time5: false
    });
  },
  onConfirm_time5(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time5: false
    })
  },
  // 设计会审时间
  showPopup_time6() {
    this.setData({
      show_time6: true
    });
  },
  onClose_time6() {
    this.setData({
      show_time6: false
    });
  },
  onConfirm_time6(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time6: false
    })
  },
  // 会审提交日期
  showPopup_time7() {
    this.setData({
      show_time7: true
    });
  },
  onClose_time7() {
    this.setData({
      show_time7: false
    });
  },
  onConfirm_time7(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time7: false
    })
  },
  // 管道设计出版日期
  showPopup_time8() {
    this.setData({
      show_time8: true
    });
  },
  onClose_time8() {
    this.setData({
      show_time8: false
    });
  },
  onConfirm_time8(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time8: false
    })
  },
  // 线路设计出版日期
  showPopup_time9() {
    this.setData({
      show_time9: true
    });
  },
  onClose_time9() {
    this.setData({
      show_time9: false
    });
  },
  onConfirm_time9(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time9: false
    })
  },
  // 设计计划备注
  designplanmarkblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 室内管道完成比例
  indoorpipefinishratioblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 室外管道完成比例
  outdoorpipefinishratioblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 项目联系人
  projectcontactmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 线路查勘完成时间
  showPopup_time10() {
    this.setData({
      show_time10: true
    });
  },
  onClose_time10() {
    this.setData({
      show_time10: false
    });
  },
  onConfirm_time10(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time10: false
    })
  },
  // 管道设计评审时间
  showPopup_time11() {
    this.setData({
      show_time11: true
    });
  },
  onClose_time11() {
    this.setData({
      show_time11: false
    });
  },
  onConfirm_time11(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time11: false
    })
  },
  // 管道设计完成时间
  showPopup_time12() {
    this.setData({
      show_time12: true
    });
  },
  onClose_time12() {
    this.setData({
      show_time12: false
    });
  },
  onConfirm_time12(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time12: false
    })
  },
  // 管道开工时间
  showPopup_time13() {
    this.setData({
      show_time13: true
    });
  },
  onClose_time13() {
    this.setData({
      show_time13: false
    });
  },
  onConfirm_time13(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time13: false
    })
  },
  // 管道完工时间
  showPopup_time14() {
    this.setData({
      show_time14: true
    });
  },
  onClose_time14() {
    this.setData({
      show_time14: false
    });
  },
  onConfirm_time14(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time14: false
    })
  },
  // 管道初检时间
  showPopup_time15() {
    this.setData({
      show_time15: true
    });
  },
  onClose_time15() {
    this.setData({
      show_time15: false
    });
  },
  onConfirm_time15(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time15: false
    })
  },
  // 验收单盖章时间
  showPopup_time16() {
    this.setData({
      show_time16: true
    });
  },
  onClose_time16() {
    this.setData({
      show_time16: false
    });
  },
  onConfirm_time16(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time16: false
    })
  },
  // 平移会召开时间
  showPopup_time17() {
    this.setData({
      show_time17: true
    });
  },
  onClose_time17() {
    this.setData({
      show_time17: false
    });
  },
  onConfirm_time17(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time17: false
    })
  },
  // 平移工作联系人
  panworkcontactmanblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 平移完成率
  pancompletionrateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 平移报备日期
  showPopup_time18() {
    this.setData({
      show_time18: true
    });
  },
  onClose_time18() {
    this.setData({
      show_time18: false
    });
  },
  onConfirm_time18(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time18: false
    })
  },
  // 线路完成率
  linefinrateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 东方有线完成率
  easterncablefinishrateblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 线路设计完成时间
  showPopup_time19() {
    this.setData({
      show_time19: true
    });
  },
  onClose_time19() {
    this.setData({
      show_time19: false
    });
  },
  onConfirm_time19(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time19: false
    })
  },
  // 线路开工时间
  showPopup_time20() {
    this.setData({
      show_time20: true
    });
  },
  onClose_time20() {
    this.setData({
      show_time20: false
    });
  },
  onConfirm_time20(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time20: false
    })
  },
  // 线路拆除时间
  showPopup_time21() {
    this.setData({
      show_time21: true
    });
  },
  onClose_time21() {
    this.setData({
      show_time21: false
    });
  },
  onConfirm_time21(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time21: false
    })
  },
  // 地址
  addressblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 当面需解决问题
  currentquestionblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.projectname) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addLedger(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('ledger')
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
    util.returnPrev('ledger')
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('ledger', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    this.setData({
      info
    })
    amendLedger(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('ledger', this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      referLedger({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        this.setData({
          info: item
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})