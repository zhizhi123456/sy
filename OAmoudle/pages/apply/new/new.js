// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  queryapply,
  detailapply,
  addapply,
  updateapply,
  addapplysmall,
  staff,
  qgroupdeep,
  querydeepsmall,
  queryapplysmall,
  updateapplysmall,
  delapplysmall
} from "../../../../service/getData";
var util = require("../../../../utils/util");
var app = getApp();
let userinfo = wx.getStorageSync("myInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      applybuyname: '',
      purpose: "",
      applyman: '',
      Companytitle: '',
      department: '',
      receivephone: '',
      delievryaddress: '',
      enterdatetime: '',
      enterstate: '',
      itemnumber: '',
      API_Picurl: []
    },
    currentDate: new Date().getTime(),
  
    show: false,
    show1: false,
    show_o: false,
    show_3: false,
    show_2: false,
    show6: false,
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
    section2: [],
    section3: [],
    section4: [],
    materials: [],
    section5: [],
    detailID: null
  },
  // 公司抬头
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
    })
  },
  // 项目编号
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
    console.log(e.detail.value.value)
    querydeepsmall({
      inwarehouseID: e.detail.value.value
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        if (res.List) {
          if ("p") {
            // this.data.materials
            var materials = res.List
            var m = this.data.materials
            materials.forEach((s, index) => {
              s.num = index + this.data.materials.length
              s.buyitemname = s.goodsname
              s.ID = ''
              var news = {}
              news.applybuyid = this.data.detailID;
              news.chargeman = s.chargeman
              news.buyitemname = s.goodsname
              news.specifications = s.specifications
              news.brand = s.brand
              news.unit = s.unit
              news.quantity = s.quantity
              news.demo = s.demo
              m.push(news)
            })


            this.setData({
              materials: m
            })
          // } else {
          //   // this.data.materials
          //   var materials = res.List
          //   materials.forEach((s, index) => {
          //     s.num = index + this.data.materials.length
          //     s.buyitemname = s.goodsname
          //   })
          //   this.setData({
          //     materials
          //   })
          }

        }
      }
    })
  },
  // 部门
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
  // 申请人
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
  // 采购合同名称
  subprojectnameblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
    })
  },
  // 进场日期
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
    util.upImage(this);
  },
  delimg(e) {
    util.deleteImg(this, e)
  },
  tap_pic(e) {
    util.preview(this, e)
  },

  // 明细表

  // 负责人
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
    // console.log(materials)
    this.setData({
      materials,
      show6: false
    })
  },

  confirm() {
    let info = this.data.info;
    // console.log(this.data.info)
    if (info.applybuyname && info.applyman && info.Companytitle && info.department && info.receivephone && info.delievryaddress) {
      var materials = this.data.materials;
      for (let k of materials) {
        for (let i in k) {
          if (k[i] == '请选择') {
            k[i] = ""
          }
        }
      }
      console.log("1")
      if (this.data.materials[0]) {
        if (!(materials[0].chargeman && materials[0].buyitemname && materials[0].specifications && materials[0].brand &&
            materials[0].unit && materials[0].quantity && materials[0].demo)) {
          Toast({
            message: '请填写明细表必填项',
            mask: true
          });
        } else {
          util.checkContent(info, this);
          util.intro(info, this)
          this.setData({
            info
          })
          // if (this.data.materials[0]) {
          addapply(this.data.info).then(res => {
            if (res.code == 10000) {
              return queryapply()
            }
          }).then(res => {
            console.log(res)
            if (res.code == 10000) {
              let billlist = res.List;
              let id = billlist[billlist.length - 1].ID
              // console.log(id)

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
                value.applybuyid = id;
              })
              this.setData({
                materials
              })
              console.log({
                adate: JSON.stringify(materials)
              })
              return addapplysmall({
                adate: JSON.stringify(materials)
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
              util.OAreturn('apply');
            } else {
              Toast({
                message: '请输入正确的内容',
                mask: true
              });
            }
          })
        }

      } else {
        util.checkContent(info, this);
        util.intro(info, this)
        this.setData({
          info
        })
        addapply(this.data.info).then(res => {
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '新建成功',
              icon: 'success',
              duration: 3000
            })
            util.OAreturn('apply');
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
    util.OAreturn('apply');
  },
  // 编辑页面的确定和返回
  editreturn() {
    util.OAreturn('apply', this);
  },
  editconfirm() {
    var materials = this.data.materials
    console.log(materials)
    if (materials) {
      var gather = []
      materials.forEach(material => {
        console.log(material)
        if (!(material.chargeman && material.buyitemname && material.specifications && material.brand &&
            material.unit && material.quantity !== '' && material.demo)) {
          gather.push(true)
        } else {
          material.quantity = parseInt(material.quantity);
          for (let k in material) {
            if (material[k] == '请选择') {
              material[k] = ""
            }
            if (material[k] == null) {
              material[k] = ""
            }
          }
          gather.push(false)
        }
      })
      var gathers = gather.some(d => {
        return d === true
      })
      if (gathers) {
        Toast({
          message: '请填写明细表必填项',
          mask: true
        });
      } else {
        console.log("11")
        var assemble = []
        let info = this.data.info;
        util.checkChange(info, this, app.globalData.department);
        util.intro(info, this)
        this.setData({
          info
        })
        updateapply(this.data.info).then(res => {
          // console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '编辑成功',
              icon: 'success',
              duration: 3000
            })
            util.ModifyRecord(this.data.information, "applybuyform")
            assemble.push(false)
            // util.OAreturn('apply', this);
          } else {
            assemble.push(true)
          }
          console.log(this.data.materials)
          if (this.data.materials) {
            var materials = this.data.materials
            materials.forEach(s => {
              if (s.ID) {
                var arr = []
                arr.push(s)
                updateapplysmall({
                  ID: s.ID,
                  uptdate: JSON.stringify(arr)
                }).then(res => {
                  console.log(res)
                  if (res.code == 10000) {
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      duration: 3000
                    })
                    assemble.push(false)
                  } else {
                    assemble.push(true)
                  }
                })
                arr = []
              } else {
                var news = {}
                news.applybuyid = this.data.detailID;
                news.chargeman = s.chargeman
                news.buyitemname = s.buyitemname
                news.specifications = s.specifications
                news.brand = s.brand
                news.unit = s.unit
                news.quantity = s.quantity
                news.demo = s.demo
                console.log(s)
                // s.ID = ''
                // s.applybuyid = this.data.detailID;
                var arr1 = []
                arr1.push(news)
                console.log(JSON.stringify(arr1))
                addapplysmall({
                  adate: JSON.stringify(arr1)
                }).then(res => {
                  console.log(res)
                  console.log("新建成功")
                  if (res.code == 10000) {
                    wx.showToast({
                      title: '新建成功',
                      icon: 'success',
                      duration: 3000
                    })
                    assemble.push(false)
                  } else {
                    assemble.push(true)
                  }
                })
                arr1 = []
              }
            })
          }

        })
        var that = this
        var i = setInterval(function () {
          console.log(materials.length + 1 == assemble.length)
          if (materials.length + 1 == assemble.length) {
            console.log(assemble)
            console.log(assemble.length)
            var assembles = assemble.some((p, l) => {
              return p
            })
            console.log(assembles)
            if (assembles) {
              wx.showToast({
                title: '请输入正确内容',
                icon: 'none',
                duration: 3000
              })
            } else {
              util.OAreturn('apply', that);
            }
            clearInterval(i)

          }

        }, 2000);


      }


    } else {
      let info = this.data.info;
      util.checkChange(info, this, app.globalData.department);
      util.intro(info, this)
      this.setData({
        info
      })
      updateapply(this.data.info).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 3000
          })
          util.ModifyRecord(this.data.information, "applybuyform")
          util.OAreturn('apply', this);
        }
      })
    }




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
      num: this.data.materials.length,
      chargeman: '',
      buyitemname: '',
      specifications: '',
      brand: '',
      unit: '',
      quantity: '',
      demo: ''
    };
    let materials = this.data.materials;
    materials.unshift(add_detail);
    this.setData({
      materials
    })
    if (!this.data.detailID) {
      // 页面滚动到底部
      console.log("xinjian")
      if (this.data.materials.length < 2) {
        util.pageScrollToBottom1();
      }
    }

  },
  // 删除材料明细
  reduce_detail(e) {
    console.log(e)
    var that = this
    if (e.currentTarget.dataset.id) {
      wx.showModal({
        content: '确定删除吗？',
        success(res) {
          console.log(e.currentTarget.dataset.id)
          if (res.confirm) {
            delapplysmall({
              ID: e.currentTarget.dataset.id
            }).then(res => {
              if (res.code === 10000) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 3000
                })
                let materials = that.data.materials,
                  i = e.currentTarget.dataset.i;
                materials.splice(i, 1);
                materials.forEach((item, index, arr) => {
                  if (i > index) {
                    item.num = item.num - 1
                  };
                });
                that.setData({
                  materials
                })
              }

            })
          }
        }
      })

    } else {
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

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      section1: app.globalData.Principal,
      section2: app.globalData.Companytitle,
      section3: app.globalData.department,
      section4: app.globalData.projectall1
    })
    var c = app.globalData.Principal
    var a = c.map(s => {
      return s.text
    })
    this.setData({
      section5: a
    })
    qgroupdeep({
    
    }).then(res => {
      console.log(res)
      if (res.code == 10000 && res.List) {
        var res1 = JSON.stringify(res.List)
        let bidlist = JSON.parse(res1.replace(/ID/g, 'value').replace(/projcectCode/g, 'text'));
        this.setData({
          section22: bidlist
        })
        console.log(this.data.section22)
      } else {
        this.setData({
          section22: []
        })
      }
    })
    if (options.id) {
      this.setData({
        detailID: options.id
      })
      detailapply({
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        var data1 = res.Item
        var b = JSON.stringify(data1)
        var c = JSON.parse(b)
        this.setData({
          information: c
        })
        util.handleData(item, this, app.globalData.department);
        util.outflow(item, this)
        this.setData({
          info: item
        })
      })
      queryapplysmall({
        applybuyid: options.id
      }).then(res => {
        console.log(res)
        if (res.code == 10000) {
          if (res.List) {
            // this.data.materials
            var materials = res.List
            materials.forEach((s, index) => {
              s.num = index + this.data.materials.length
            })
            this.setData({
              materials
            })
          }
        }
      })

    }
  },

})