// pages/new/new.js
import {
  addbuilding,
  detailbuilding,
  updatebuilding,
  addbuildingsmall,
  MainProject,
  querybuilding,
  MainSubproject,
  Companytitle

} from "../../../service/getData";
import Toast from 'vant-weapp/dist/toast/toast';
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    departmenttext: "",
    info: {
      projectcode: "",
      structureType: "",
      numberOfPlies: "",
      constructionOrganization: "",
      skillCheckMan: "",
      qualityCheckMan: "",
      subcontracto: "",
      subcontractorCheckMan: "",
      subskillCheckMan: "",
      acceptanceOfWorksIdea: "",
      performanceTestIdea: "",
      qualityRecordsIdea: "",
      offSizeIdea: "",
      appearanceQualityIdea: "",
      subcontractorsShall: "",
      Constructionunit: "",
      Developerunit: "",
      architect: "",
      supervisionunit: "",
      subcontractorsShallCheckMan: "",
      ConstructionunitCheckMan: "",
      DeveloperunitCheckMan: "",
      architectCheckMan: "",
      supervisionunitCheckMan: "",
      subcontractorsShallDate: "",
      ConstructionunitDate: "",
      DeveloperunitDate: "",
      Date: "",
      supervisionunitDate: ""

    },
    materials: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    currentDate2: new Date().getTime(),
    currentDate3: new Date().getTime(),
    currentDate4: new Date().getTime(),
    currentDate5: new Date().getTime(),
    show: false,
    show_o: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show_time: false,
    show_time1: false,
    show_time2: false,
    show_time3: false,
    show_time4: false,
    show_time5: false,
    sections: [],
    section1: [],
    section2: ["是", "否"],
    firms: [],
    totals: [],
    upimg: false,
  },
  //项目或合同编号
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
    this.setData({
      info,
      show_o: false,
      // departmenttext: e.detail.value.text
    })
  },
  // 公司抬头
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show: false
    })
  },
  //分包单位
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
      show1: false
    })
  },
  //施工单位
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
      show2: false
    })
  },
  //建设单位
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show3: false
    })
  },
  //设计单位
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
      show4: false
    })
  },
  //监理单位
  showPopup5() {
    this.setData({
      show5: true
    });
  },
  onClose5() {
    this.setData({
      show5: false
    });
  },
  onConfirm5(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show5: false
    })
  },
  // 创建时间
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
    // console.log(this.data.info)
  },
  // 设备材料进场日期
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
    // console.log(this.data.info)
  },
  // 设备材料进场日期
  showPopup_time2() {
    this.setData({
      show_time2: true
    })
  },
  onClose_time2() {
    this.setData({
      show_time2: false
    })
  },
  onConfirm_time2(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time2: false
    })
    // console.log(this.data.info)
  },
  // 设备材料进场日期
  showPopup_time3() {
    this.setData({
      show_time3: true
    })
  },
  onClose_time3() {
    this.setData({
      show_time3: false
    })
  },
  onConfirm_time3(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time3: false
    })
    // console.log(this.data.info)
  },
  // 设备材料进场日期
  showPopup_time4() {
    this.setData({
      show_time4: true
    })
  },
  onClose_time4() {
    this.setData({
      show_time4: false
    })
  },
  onConfirm_time4(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time4: false
    })
    // console.log(this.data.info)
  },
  showPopup_time5() {
    this.setData({
      show_time5: true
    })
  },
  onClose_time5() {
    this.setData({
      show_time5: false
    })
  },
  onConfirm_time5(e) {
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_time5: false
    })
    // console.log(this.data.info)
  },
  //施工单位检查评定
  showPopup6() {
    this.setData({
      show6: true
    });
  },
  onClose6() {
    this.setData({
      show6: false
    });
  },
  onConfirm6(e) {
    let materials = util.updateValue(e, this);
    console.log(materials)
    this.setData({
      materials,
      show6: false
    })
  },
  //
  receivemanphoneblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  // 点击确定新增并跳转
  confirm() {
    let info = this.data.info;
    // 判断是否填了有必选项 
    if (info.structureType && info.numberOfPlies && info.projectcode && info.constructionOrganization) {
      if (this.data.materials[0]) {
        var materials = this.data.materials;
        // console.log(JSON.stringify(materials))
        // 新增详细表
        for (let k of materials) {
          for (let i in k) {
            if (k[i] == '请选择') {
              k[i] = ""
            }
          }
        }
        this.setData({
          materials
        })
        console.log(materials)
        if (materials[0].ConstructionunitCheck&& materials[0].Idea) {
          util.checkContent(info, this);
          util.intro(info,this)
          this.setData({
            info
          })
          // console.log(info)
          let infodata = {
            Timestamp: app.globalData.time,
            ...this.data.info
          }
          // console.log(infodata, this.data.materials)
          // 如果有详细表的情况下
          // 判断明细表内容
          // 新增退料单
          console.log(infodata)
          addbuilding(infodata).then(res => {
            // console.log(res)
            if (res.code == 10000) {
              return querybuilding({
                Timestamp: app.globalData.time
              })
            }
          }).then(res => {
            if (res.code == 10000) {
              let billlist = res.List;
              // console.log(res)
              // console.log(billlist.length)
              // console.log(billlist[billlist.length - 1].ID)
              // console.log(this.data.materials)
              let id = billlist[billlist.length - 1].ID,
                materials = this.data.materials;
              materials.forEach(value => {
                value.quantity = parseInt(value.quantity);
                value.buildingAcceptanceId = id;
                value.ConstructionunitCheck = util.whether(value.ConstructionunitCheck)
              })
              // console.log(materials)

              // console.log(JSON.stringify(materials))
              // 新增详细表
              for (let k of materials) {
                for (let i in k) {
                  if (k[i] == '请选择') {
                    k[i] = ""
                  }
                }
              }
              this.setData({
                materials
              })
              console.log(JSON.stringify(materials))
              return addbuildingsmall({
                Timestamp: app.globalData.time,
                details: JSON.stringify(materials)
              })
            }
          }).then(res => {
            console.log(res)
            if (res.code == 10000) {
              wx.showToast({
                title: '新建成功',
                icon: 'success',
                duration: 3000
              })
              wx.redirectTo({
                url: '/pages/building/pact/pact'
              })
            }else{
              Toast({
                message: '请输入正确的内容',
                mask: true
              });
            }
          })
        } else {
          Toast({
            message: '请填写明细表必填项',
            mask: true
          });
        }

      } else {
        // 没有详细表的情况下
        console.log(infodata)
        util.checkContent(info, this);
        util.intro(info,this)
        this.setData({
          info
        })
        // console.log(info)
        let infodata = {
          Timestamp: app.globalData.time,
          ...this.data.info
        }
        // console.log(infodata, this.data.materials)
        // 如果有详细表的情况下
        // 判断明细表内容
        addbuilding(infodata).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            wx.redirectTo({
              url: '/pages/building/pact/pact'
            })
          }
        })
      }
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
      url: "/pages/building/pact/pact"
    })
  },
  // 编辑领料单
  editreturn() {
    wx.redirectTo({
      url: "/pages/building/detail/detail?id=" + this.data.info.ID
    })
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info,this)
    this.setData({
      info
    })
    wx.showLoading({
      title: "加载中",
    })
    // console.log(info)
    updatebuilding(info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('building', this);
        wx.hideLoading();
      }
    })
  },
  // 获取材料明细输入框中的数据并设置给data  明细的双向绑定
  getgcode(e) {
    let materials = util.updateValue(e, this);
    console.log(materials)
    this.setData({
      materials
    })
  },
  // 添加材料明细
  add_more() {
    let add_detail = {
      num: this.data.materials.length + 1,
      name: '',
      checkoutNum: '',
      Idea: '',
      ConstructionunitCheck: '',
    };
    let materials = this.data.materials;
    materials.unshift(add_detail);
    this.setData({
      materials
    })
    // 页面滚动到底部
    if (this.data.materials.length < 2) {
      util.pageScrollToBottom1();
        

    }
  },
  // 删除材料明细
  reduce_detail(e) {
    let materials = this.data.materials,
      i = e.currentTarget.dataset.i;
    materials.splice(i, 1);
    materials.forEach((item, index, arr) => {
      if (i > index) {
        item.num = item.num - 1
      };
    });
    this.setData({
      materials
    })

  },
  // 基础材料 的请求
  qingqiu() {
    MainSubproject().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.subprojectname
      })
      this.setData({
        sections: s,
      })
      // console.log(this.data.section1)
    })
    Companytitle().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.Value
      })
      // console.log(s)
      this.setData({
        section1: s,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      wx.showLoading({
        title: '加载中',
      });
      detailbuilding({
        ID: options.id
      }).then(res => {
        if (res.code == 10000) {
          let item = res.Item;
          util.handleData(item, this, app.globalData.department);
          util.outflow(item,this)
          this.setData({
            info: item
          })
          wx.hideLoading();
        }
      })
    }
    this.setData({
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
    })
  },

})