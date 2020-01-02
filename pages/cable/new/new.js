// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  // addPurchase,
  // addPdetail,
  // referPurchase,
  // amendPurchase
  querycable,
  detailcable,
  addcable,
  updatecable,
  addcablesmall,
  staff
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    departmenttext: "",
    info: {
      number: '',
      projectName: "",
      subentryProjectName: '',
      itemManage: '',
      constructCompany: '',
      checkPart: '',
      constructNameNumber: '',
      qualityCheckRecord: '',
      installTechnologyUser: '',
      installDate: '',
      remark: '',
      supervisorCheckVerdict: "",
      supervisorUser: "",
      supervisorDate: "",
    },
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_2: false,
    show6: false,
    show5: false,
    show4: false,
    show_time: false,
    show_photo: false,
    firms: [],
    totals: [],
    Supplier: [],
    sections: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    section2: ['主控项目', '一般项目'],
    section3: ['合格', '不合格'],
    section4: ['符合要求', '不符合要求'],
    materials: [],
  },
  // 部门
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
      departmenttext: e.detail.value.text
    })
  },
  // 公司
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
  // 采购合同编号
  purchasecontactCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 总包项目
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
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info,
      show_3: false
    })
  },
  // 供应商
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
  // 采购合同名称
  subprojectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 签订日期
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
  // 签订日期
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

  // 采购内容
  purchaseContextblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 采购合同金额
  contcactamountblur(e) {
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
  // 备注
  remarkblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 质量验收规范的规定
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
  // 施工单位自检记录
  showPopup7() {
    this.setData({
      show5: true
    });
  },
  onClose7() {
    this.setData({
      show5: false
    });
  },
  onConfirm7(e) {
    let materials = util.updateValue(e, this);
    console.log(materials)
    this.setData({
      materials,
      show5: false
    })
  },
  // 监理单位验收记录
  showPopup8() {
    this.setData({
      show4: true
    });
  },
  onClose8() {
    this.setData({
      show4: false
    });
  },
  onConfirm8(e) {
    let materials = util.updateValue(e, this);
    console.log(materials)
    this.setData({
      materials,
      show4: false
    })
  },

  confirm() {
    // console.log(this.data.info)
    if ("1") {
      let info = this.data.info;
      util.checkContent(info, this);
      util.intro(info,this)
      this.setData({
        info
      })
      if (this.data.materials[0]) {
        addcable(this.data.info).then(res => {
          if (res.code == 10000) {
            return querycable()
          }
        }).then(res => {
          if (res.code == 10000) {

            let billlist = res.List;
            let id = billlist[billlist.length - 1].ID,
              materials = this.data.materials;
            for (let k of materials) {
              for (let i in k) {
                if (k[i] == '请选择') {
                  k[i] = ""
                }
              }
            }
            materials.forEach(value => {
              value.quantity = parseInt(value.quantity);
              value.CableQualityCheckId = id;
            })
            this.setData({
              materials
            })
            // console.log(JSON.stringify(materials))
            return addcablesmall({
              adate: JSON.stringify(materials)
            })
          }
        }).then(res => {
          if (res.code == 10000) {
            // console.log(res)
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.returnPrev('cable');
          }else{
            Toast({
              message: '请输入正确的内容',
              mask: true
            });
          }
        })
      } else {
        addcable(this.data.info).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.returnPrev('cable');
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
    util.returnPrev('cable');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.returnPrev('cable', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);

    util.intro(info,this)
    this.setData({
      info
    })
    updatecable(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.returnPrev('cable', this);
      }
    })
  },
  // 获取采购明细输入框中的数据并设置给data
  getgcode(e) {
    util.updateValue(e, this);
  },
  getgname(e) {
    util.updateValue(e, this);
  },
  getSize(e) {
    util.updateValue(e, this);
  },
  getUnit(e) {
    util.updateValue(e, this);
  },
  getQuantity(e) {
    util.updateValue(e, this);
  },
  getRecord(e) {
    util.updateValue(e, this);
  },
  // 添加材料明细
  add_more() {
    let add_detail = {
      num: this.data.materials.length + 1,
      projectType: '',
      stipulateContent: '',
      selfInspectionRecord: '',
      checkRecord: '',
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
  qingqiu() {
    var c = app.globalData.MainProject
    c = c.map((item) => {
      return item.value
    })
    staff().then(res => {
      //项目经理
      console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.Name
      })
      this.setData({
        sections: s,
      })
    })
    this.setData({
      firms: app.globalData.Companytitle, //施工单位
      totals: c, //工程名称
      // Supplier: app.globalData.Supplier,
      // sections: app.globalData.department
    })
    console.log(this.data.totals)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingqiu()
    if (options.id) {
      detailcable({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          info: item
        })
      })
    }
  },

})