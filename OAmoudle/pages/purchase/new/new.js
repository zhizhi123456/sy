// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  addPurchase,
  getPurchase,
  addPdetail,
  referPurchase,
  amendPurchase,
  qgroupapply,
  detailapply
} from '../../../../service/getData.js';
var util = require("../../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    departmenttext: "请选择",
    info: {
      API_Picurl: [],
    },
    currentDate: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_2: false,
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
    materials: [],
  },
  // 申购单名称
  showPopup11() {
    this.setData({
      show11: true
    });
  },
  onClose11() {
    this.setData({
      show11: false
    });
  },
  onConfirm11(e) {
    let info = util.editInfo(e, this, e.detail.value.text);
    this.setData({
      info,
      show11: false,
    })
    detailapply({
      ID: e.detail.value.value
    }).then(res => {
      console.log(res)
      console.log(e.detail.value.value)
      if (res.code == 10000 && res.Item) {
        var s = JSON.stringify(res.Item)
        var t = JSON.parse(s)
        var item = util.outflow(res.Item)
        util.handleData(item, this, app.globalData.department);
        // console.log(item)
        if(!item.API_Picurl){
          item.API_Picurl = []
        }
        this.setData({
          // 公司名称
          'info.Companytitle': item.Companytitle,
          'info.department': item.department,
          departmenttext: item.department,
          // 部门
          // 合同照片
          'info.API_Picurl': item.API_Picurl,
          // 项目编号
          'info.projcectCode': t.itemnumber,
          // 采购内容
          'info.purchaseContext': item.applybuyname,
         

        })
        console.log(item.API_Picurl)
      }
    })
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
    let info = util.editInfo(e, this, e.detail.value.value);
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
    let info = util.editInfo(e, this, e.detail.value.text);
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
    if (e.detail.name == "拍照") {
      util.upImage(this, 1);
    } else {
      util.upImage(this, 0);
    }
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
  confirm() {
    // console.log(this.data.info)
    if (this.data.info.department && this.data.info.Companytitle && this.data.info.purchasecontactCode && this.data.info.projcectCode && this.data.info.subprojectname && this.data.info.remark) {
      let info = this.data.info;
    
      util.checkContent(info, this);
    
      util.intro(info, this)
    
      this.setData({
        info
      })
      if (this.data.materials[0]) {
        addPurchase(this.data.info).then(res => {
          if (res.code == 10000) {
            return getPurchase()
          }
        }).then(res => {
          if (res.code == 10000) {
            let billlist = res.List;
            let id = billlist[billlist.length - 1].ID,
              materials = this.data.materials;
            materials.forEach(value => {
              value.quantity = parseInt(value.quantity);
              value.purchasecontactId = id;
            })
            this.setData({
              materials
            })
            return addPdetail({
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
            util.OAreturn('purchase');

          }
        })
      } else {
      
        addPurchase(this.data.info).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })

            util.OAreturn('purchase');
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

    util.OAreturn('purchase');
  },
  // 编辑页面的确定和返回
  editreturn() {

    util.OAreturn('purchase', this);
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    util.intro(info, this)
    this.setData({
      info
    })
    amendPurchase(this.data.info).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        util.OAreturn('purchase', this);
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
      goodscode: '',
      goodsname: '',
      specifications: '',
      unit: '',
      quantity: '',
      demo: ""
    };
    let materials = this.data.materials;
    materials.unshift(add_detail);
    this.setData({
      materials
    })
    // 页面滚动到底部
    if (this.data.materials.length < 2) {
      util.pageScrollToBottom();
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qgroupapply({
      applyman: userinfo.UserName
    }).then(res => {
      console.log(res)
      if (res.code == 10000 && res.List) {
        var res1 = JSON.stringify(res.List)
        let bidlist = JSON.parse(res1.replace(/ID/g, 'value').replace(/applybuyname/g, 'text'));
        this.setData({
          section11: bidlist
        })
        console.log(this.data.section11)
      } else {
        this.setData({
          section11: []
        })
      }
    })
    this.setData({
      firms: app.globalData.Companytitle,
      totals: app.globalData.MainProject,
      Supplier: app.globalData.Supplier,
      sections: app.globalData.department
    })
    if (options.id) {
      referPurchase({
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