// pages/new/new.js
import Toast from 'vant-weapp/dist/toast/toast';
import {
  Role, //职位职称数据
  MainProject, //总包项目id
  detailfollow,
  updatefollow,
  addfollow
} from "../../../service/getData";
var util = require("../../../utils/util");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bianid: false,
    departmenttext: "",
    API_Picurl:[],
    info: {
      ProjectID: "",
      Checkman: "",
      Ranks: "",
      Address: "",
      CheckContext: "",
      Getoutofline: "",
      AccompanyKnowledge: "",
      API_Picurl: "",
      createman: "",
      createtime: "",
      updateman: "",
      updatetime: "",
    },
    i: 0,
    fileList: [],
    check_photo: [{
      name: "拍照"
    }, {
      name: "从相册选择"
    }],
    show_photo: false,
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime(),
    show: false,
    show_o: false,
    show_3: false,
    show_nature: false,
    show_time: false,
    show_endtime: false,
    // sections: [],
    // firms: [],
    // totals: [],
    // nature: [],
    section1: [],
    section2: [],
    roles: []
  },
  // 项目id
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
  // 职位职称
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
  // 分包工程编号 处理内容
  subprojcectCodeblur(e) {
    let info = util.editInfo(e, this, e.detail.value);
    this.setData({
      info
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
  onConfirm_endtime(e) {
    // console.log(e)
    // console.log(util.datefomate(e.detail))
    let info = util.editInfo(e, this, util.datefomate(e.detail));
    this.setData({
      info,
      show_endtime: false
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

    var that = this;
    // console.log("1")
    wx.chooseImage({
      success(res) {
        console.log(1)
        // console.log(res)
        // console.log(res.tempFilePaths)
        const tempFilePaths = res.tempFilePaths
        // console.log(res.tempFilePaths)
        //上传多个文件时 循环
        tempFilePaths.map(path => {
          wx.uploadFile({
            url: 'http://192.168.2.148:88/api/image/Get_photo',
            filePath: path,
            name: 'img_data',
            formData: {
              'userName':wx.getStorageSync("myInfo").UserName,
            },
            success(res) {
          
              that.setData({
                'userInfo.cover_thumb': "http://192.168.2.148:88" + JSON.parse(res.data)
              })
              var imgpath = "http://192.168.2.148:88" + JSON.parse(res.data)
              app.globalData.pic.push(imgpath)
              var pic1 = app.globalData.pic
              that.setData({
                API_Picurl: pic1
              })
              
              that.setData({
                show_photo: false
              })
            },
            fail(res) {
              const data = res.data
              wx.showModal({
                title: 'fail',
                content: 'fail',
              })
              // do something
            },
          })
          return path
        })

      }
    })
  },
  delpic(e) {
    app.globalData.pic.splice(e.currentTarget.dataset.index, 1)
    var pic1 =  app.globalData.pic
    this.setData({
      API_Picurl: pic1
    }) 
  },
  preimg(e){
    console.log(e.currentTarget.dataset.img)
    var url = e.currentTarget.dataset.img
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  dispose() {
    //发送前对数据的处理
    // app.globalData.pic = []
    let info = this.data.info;
    for (let i in info) {
      if (info[i] == "" || info[i] == "请选择") {
        info[i] = null
      }
    }
  
    if (info.Ranks) {
      // 对角色的处理
      var roles = this.data.roles
      console.log(roles)
      roles.forEach((m) => {
        if (info.Ranks == m.Value) {
          //  console.log(m.Value)
          info.Ranks = m.Key
          // console.log(info.Ranks)
        }
      })
    }
    if(this.data.API_Picurl){
      var pic = this.data.API_Picurl
      pic = pic.join(",")
      // console.log(pic)
      this.setData({
         "info.API_Picurl":pic
      })
     }
    this.setData({
      info
    })
  },
  confirm() {
    if (this.data.info.ProjectID  && this.data.info.Checkman) {

      let info = this.data.info;
      util.checkContent(info, this);
      this.dispose()
      let infodata = {
        Timestamp: app.globalData.time,
        ...this.data.info
      }
      // console.log(infodata)
     
      addfollow(infodata).then(res => {
        // console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 3000
          })
          wx.redirectTo({
            url: '/pages/workrecord/pact/pact'
          })
        }
      })
    } else {
      Toast({
        message: '请填写必填项 项目id,检查人 ',
        mask: true
      });
    }
  },
  // 返回
  return () {
    wx.redirectTo({
      url: "/pages/workrecord/pact/pact"
    })
  },
  // 编辑分包项目页面的确定和返回
  editreturn() {
    wx.redirectTo({
      url: "/pages/workrecord/detail/detail?id=" + this.data.info.ID
    })
  },
  editconfirm() {
    let info = this.data.info;
    util.checkChange(info, this, app.globalData.department);
    app.globalData.pic = []
    this.dispose()//发送前对数据的处理
    let infodata = {
      Timestamp: app.globalData.time,
      ...this.data.info
    }
    // console.log(infodata)
    updatefollow(infodata).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: "/pages/workrecord/detail/detail?id=" + this.data.info.ID
        })
      }
    })
  },
  // 请求基础数据  //总包项目id 职位职称
  qingqiu() {
    Role().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.Value
      })
      this.setData({
        section1: s,
        roles: q
      })
    
    })
    MainProject().then(res => {
      // console.log(res)
      var q = JSON.parse(res)
      var s = q.map(t => {
        return t.projectname
      })
      this.setData({
        section2: s
      })
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.pic = []
    this.qingqiu() //请求基本数据
    if (options.id) {
      wx.showLoading({
        title: '加载中',
      });
      this.setData({
        bianid: options.id // 页面判断是否有id
      })
      detailfollow({
        Timestamp: app.globalData.time,
        ID: options.id
      }).then(res => {
        // console.log(res)
        let item = res.Item;
        for (let i in item) {
          if (item[i] == null || item[i] == "null" || !item[i]) {
            item[i] = ""
          }
        }
     
        // 对图片进行处理
        if (item.API_Picurl) {
          item.API_Picurl = item.API_Picurl.split(",");
          app.globalData.pic = item.API_Picurl
          this.setData({
            API_Picurl:item.API_Picurl
          })
        }
        if (item.Ranks) {
          Role().then(res1 => {
            var ress = JSON.parse(res1)
            ress.forEach((m) => {
              if (item.Ranks == m.Key) {
                //  console.log(m.Value)
                item.Ranks = m.Value
                // console.log( value.Ranks)
              }
            })
            // 回调函数 请求完毕后赋值
            this.setData({
              info: item
            })
            wx.hideLoading();
          })
        } else {
          this.setData({
            info: item
          })
          wx.hideLoading();
        }

      })
    }
  },
})