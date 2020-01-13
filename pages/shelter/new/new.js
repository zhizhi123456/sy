// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addShelter,
  referShelter,
  amendShelter
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
    },
    currentDate: new Date().getTime(),
    show: false,
    show_0: false,
    show_1: false,
    show_2: false,
    show_3: false,
    show_4: false,
    show_5: false,
    show_6: false,
    show_7: false,
    show_8: false,
    show_9: false,
    show_time1: false,
    show_time2: false,
    show_time3: false,
    totals: [],
    quality: []
  },
  // 工程名称
  projectnamelur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 工程编号
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show: false
    })
  },
  // 施工单位
  constructionunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理单位
  supervisionunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 建设单位
  developerunitblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 土建安装质量
  showPopup_0() {
    this.setData({
      show_0: true
    });
  },
  onClose_0() {
    this.setData({
      show_0: false
    });
  },
  onConfirm_0(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_0: false
    })
  },
  // 土建楼层部位
  CivilWorkFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 土建图号
  CivilWorkDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 土建工艺安装质量
  showPopup_1() {
    this.setData({
      show_1: true
    });
  },
  onClose_1() {
    this.setData({
      show_1: false
    });
  },
  onConfirm_1(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_1: false
    })
  },
  // 土建工艺楼层部位
  CivilTechFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 土建工艺图号
  CivilTechDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工电源安装质量
  showPopup_2() {
    this.setData({
      show_2: true
    });
  },
  onClose_2() {
    this.setData({
      show_2: false
    });
  },
  onConfirm_2(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_2: false
    })
  },
  // 施工电源楼层部位
  ConstruPowerFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工电源图号
  ConstruPowerDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 地板铺设安装质量
  showPopup_3() {
    this.setData({
      show_3: true
    });
  },
  onClose_3() {
    this.setData({
      show_3: false
    });
  },
  onConfirm_3(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_3: false
    })
  },
  // 地板铺设楼层部位
  FloorLayFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 地板铺设图号
  FloorLayDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 外观检查安装质量
  showPopup_4() {
    this.setData({
      show_4: true
    });
  },
  onClose_4() {
    this.setData({
      show_4: false
    });
  },
  onConfirm_4(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_4: false
    })
  },
  // 外观检查楼层部位
  AppearCheckFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 外观检查图号
  AppearCheckDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 设备安装质量
  showPopup_5() {
    this.setData({
      show_5: true
    });
  },
  onClose_5() {
    this.setData({
      show_5: false
    });
  },
  onConfirm_5(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_5: false
    })
  },
  // 设备安装楼层部位
  EquipiInstaFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 设备安装图号
  EquipiInstaDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 电气性能安装质量
  showPopup_6() {
    this.setData({
      show_6: true
    });
  },
  onClose_6() {
    this.setData({
      show_6: false
    });
  },
  onConfirm_6(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_6: false
    })
  },
  // 电气性能楼层部位
  ElectPropFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 电气性能图号
  ElectPropDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 消防器材安装质量
  showPopup_7() {
    this.setData({
      show_7: true
    });
  },
  onClose_7() {
    this.setData({
      show_7: false
    });
  },
  onConfirm_7(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_7: false
    })
  },
  // 消防器材楼层部位
  FireFitEquFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 消防器材图号
  FireFitEquDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 危险物品安装质量
  showPopup_8() {
    this.setData({
      show_8: true
    });
  },
  onClose_8() {
    this.setData({
      show_8: false
    });
  },
  onConfirm_8(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_8: false
    })
  },
  // 危险物品楼层部位
  DangerGoodFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 危险物品图号
  DangerGoodDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 孔洞防火安装质量
  showPopup_9() {
    this.setData({
      show_9: true
    });
  },
  onClose_9() {
    this.setData({
      show_9: false
    });
  },
  onConfirm_9(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show_9: false
    })
  },
  // 孔洞防火楼层部位
  HoleFirePrevFlorPosiblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 孔洞防火图号
  HoleFirePrevDrawNoblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 验收意见
  AcceptanceCommentsblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 建设单位验收人
  DeveloperunitCheckManblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 建设单位验收日期
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
  // 施工单位验收人
  ConstructionunitCheckManblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 施工单位验收日期
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
  // 监理单位验收人
  SafetyscoreCheckManblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 监理单位验收日期
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
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.projectname&&this.data.info.projectcode) {
      let info = this.data.info;
      util.checkContent(info, this);
      this.setData({
        info
      })
      addShelter(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          util.returnPrev('shelter')
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
    util.returnPrev('shelter')
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('shelter',this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this,app.globalData.department);
    this.setData({
      info
    })
    let infodata = {
      ...this.data.info
    }
    // console.log(infodata)
    amendShelter(infodata).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('shelter',this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totals: app.globalData.MainProject,
      quality:app.globalData.InstallQuality
    })
    if (options.id) {
      referShelter({
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

})