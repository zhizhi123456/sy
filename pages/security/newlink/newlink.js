// pages/bill/newlink/newlink.js
import {
  addsecuritysmall,
  updatesecuritysmall,
  detailsecuritysmall
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materials: [{
      SecurityKgRecordId: '',
      projectType:'',
      stipulateContent:"",
      selfInspectionRecord:"",
      checkRecord:""

    }],
    billid: 0,
    section2: ['主控项目', '一般项目'],
    section3: ['合格', '不合格'],
    section4: ['符合要求', '不符合要求'],
    show6: false,
    show5: false,
    show4: false,
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/security/detail/detail?id=" + this.data.billid + "&table=c"
    })
  },
  // 获取材料明细输入框中的数据并设置给data
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
  // 新增领料单材料明细
  confirm() {
    let materials = this.data.materials;
    materials[0].SecurityKgRecordId = this.data.billid;
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
    // console.log(this.data.materials)
    addsecuritysmall({
      adate: JSON.stringify(this.data.materials)
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '新建成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/security/detail/detail?id=" + this.data.billid + "&table=c"
        })
      } else {
        wx.showToast({
          title: '请输入正确信息',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  // 编辑材料明细时的返回和确定
  linkreturn() {
    wx.redirectTo({
      url: "/pages/security/detaillink/detaillink?detailid=" + this.data.materials[0].ID
    })
  },
  linkconfirm() {
    // console.log(this.data.materials)
   let materials = this.data.materials;
    for (let k of materials) {
      for (let i in k) {
        if (k[i] == '请选择') {
          k[i] = ""
        }
      }
    } 
    updatesecuritysmall({
      ID: this.data.materials[0].ID,
      uptdate: JSON.stringify(this.data.materials)
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/security/detaillink/detaillink?detailid=" + this.data.materials[0].ID
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 领料单id
    if (options.id) {
      this.setData({
        billid: options.id,
      })
    }
    // 明细表id
    if (options.detailid) {
      detailsecuritysmall({
        ID: options.detailid
      }).then(res => {
        // console.log(res.Item)
        let materials = this.data.materials;
        materials[0] = res.Item;
        this.setData({
          materials
        })
        // console.log(this.data.materials);
      })
    }
  },

  
})