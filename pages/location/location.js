// pages/oa/oa.js
import {
  location,
  track,
  userID
} from "../../service/getData";
var util = require("../../utils/util");
var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'EL5BZ-FNQK4-KPBUO-XSOS5-K2P5J-URF7O' // 必填
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    controls: '',
    show: false,
    resultList: [],
    //输入绑定同时显示隐藏删除按钮
    inputAddress: '',
    city: '',
    street: '',
    latitude: 0,
    longitude: 0,
    polyline: [],
    distance: '',
    steps: [],
    inputFocus: false,
    time: 0,
    hadNew: 1,
    showmap: true
  },
  return () {
    util.returnMenu();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.userid) {
      this.setData({
        hadNew: 0
      })
      userID({
        UserName: options.userid
      }).then(res => {
        if (res) {
          let resarr = JSON.parse(res);
          track({
            UserID: resarr[0].ID,
            Todaydate: util.formatday(new Date()),
          }).then(res => {
            if (res.code == 10000) {
              let item = res.List;
              if (item.length) {
                this.setData({
                  poi: {
                    latitude: item[item.length - 1].latitude,
                    longitude: item[item.length - 1].longitude
                  },
                  markers: [{
                    title: item[item.length - 1].addres,
                    id: 0,
                    latitude: item[item.length - 1].latitude,
                    longitude: item[item.length - 1].longitude,
                    width: 20,
                    height: 20,
                    callout: { //在markers上展示地址名称
                      content: options.title + '的位置:\n' + item[item.length - 1].addres,
                      color: '#fff',
                      display: 'ALWAYS',
                      padding: 5,
                      bgColor: '#008080'
                    }
                  }]
                })
              } else {
                wx.showToast({
                  title: '暂无定位信息',
                  icon: 'none',
                  duration: 5000
                })
                this.setData({
                  showmap: false
                })
              }
            }
          })
        }
      })
    } else {
      let that = this;
      that.getUserLocation();
      // 每隔半个小时存储一次位置
      setInterval(function () {
        that.getUserLocation()
      }, 1800000)
    }
  },
  // 点击重新定位
  againlocaltion() {
    if (this.data.hadNew) {
      this.getUserLocation();
    }
  },
  //地图定位
  getUserLocation: function () {
    let that = this;
    wx.getSetting({
      success: (res) => {
        // console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          //调用wx.getLocation的API
          that.getLocation();
        }
        if (res.authSetting['scope.userLocationBackground']) {
          wx.startLocationUpdateBackground({
            success(res) {
              console.log('开启后台定位', res)
            },
            fail(res) {
              console.log('开启后台定位失败', res)
            }
          })
        } else {
          wx.showModal({
            title: '请求开启后台定位',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝开启后台定位',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocationBackground"] == true) {
                      wx.showToast({
                        title: '已开启后台定位',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      wx.startLocationUpdateBackground({
                        success(res) {
                          console.log('开启后台定位', res)
                        },
                        fail(res) {
                          console.log('开启后台定位失败', res)
                        }
                      })
                    } else {
                      wx.showToast({
                        title: '拒绝开启后台定位',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  getLocation() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success(result) {
        // console.log(res);
        qqmapsdk.reverseGeocoder({
          //位置坐标，默认获取当前位置
          location: result.latitude + ',' + result.longitude || '',
          success: function (res) {
            // console.log(res);
            var res = res.result;
            var mks = [];
            mks.push({
              title: res.formatted_addresses.recommend,
              id: 0,
              latitude: res.location.lat,
              longitude: res.location.lng,
              width: 20,
              height: 20,
              callout: { //在markers上展示地址名称
                content: res.address,
                color: '#fff',
                display: 'ALWAYS',
                padding: 5,
                bgColor: '#008080'
              }
            });
            that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
              markers: mks,
              city: res.address_component.city,
              street: res.address_component.street,
              poi: {
                latitude: res.location.lat,
                longitude: res.location.lng
              }
            });
            // 存储定位地点
            let user = wx.getStorageSync("myInfo");
            if (user) {
              location({
                UserID: user.ID,
                Todaydate: util.formatday(new Date()),
                Todaytime: util.format(new Date()),
                latitude: res.location.lat,
                longitude: res.location.lng,
                addres: res.address
              }).then(res => {
                if (res.code == 10000) {
                  console.log('位置存储成功')
                }
              })
            } else {
              wx.showToast({
                title: '请您登录',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            // console.log(res);
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  showNewMarkerClick() {
    this.setData({
      show: true,
      inputFocus: true
    })
  },
  onClose() {
    this.setData({
      show: false,
      inputAddress: '',
      resultList: []
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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

  },

  // /**
  //  * 绑定输入框
  //  */
  bindAddressInput: function (e) {
    var that = this;
    that.setData({
      inputAddress: e.detail.value,
    })
    if (e.detail.value) {
      that.suggestionSearch(e.detail.value);
    }
  },
  showinput() {
    this.setData({
      inputFocus: true
    })
  },
  // /**
  //  * 热词检索
  //  */
  suggestionSearch: function (searchValue) {
    var that = this;
    qqmapsdk.getSuggestion({
      keyword: searchValue,
      region: that.data.city,
      region_fix: 1,
      policy: 1,
      success: function (res) {
        // console.log(res.data);
        that.setData({
          resultList: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  // /**
  //  * 删除输入内容
  //  */
  deleteInput: function () {
    this.setData({
      inputAddress: '',
      resultList: [],
      inputFocus: true
    })
  },

  /**
   * item点击事件,将地址回调到地图页面
   */
  itemAddressClick: function (e) {
    let time = this.data.time;
    time++;
    this.setData({
      time
    })
    var item = this.data.resultList[Number(e.currentTarget.id)];
    // console.log(item)
    var that = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: that.data.poi.latitude + ',' + that.data.poi.longitude || '',
      to: item.location.lat + ',' + item.location.lng || '',
      success: function (res) {
        // console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        let mak = that.data.markers;
        if (that.data.time > 1) {
          mak.splice(1, 1, {
            id: 1,
            height: 30,
            iconPath: '../../img/end.png',
            latitude: item.location.lat,
            longitude: item.location.lng,
            callout: { //在markers上展示地址名称
              content: '终点：' + item.title,
              color: '#fff',
              display: 'ALWAYS',
              padding: 5,
              bgColor: '#008080'
            }
          })
        } else {
          mak.push({
            id: 1,
            height: 30,
            iconPath: '../../img/end.png',
            latitude: item.location.lat,
            longitude: item.location.lng,
            callout: { //在markers上展示地址名称
              content: '终点：' + item.title,
              color: '#fff',
              display: 'ALWAYS',
              padding: 5,
              bgColor: '#008080'
            }
          })
        }
        // console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        that.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#008080',
            width: 4,
            arrowLine: true
          }],
          markers: mak
        })
        // 使用 wx.createMapContext 获取 map 上下文
        // 使轨迹居中
        this.mapCtx = wx.createMapContext('myMap')
        this.mapCtx.includePoints({
          padding: [100],
          points: pl
        })
        // console.log(that.data.markers)
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        // steps
        that.setData({
          distance: (res.result.routes[0].distance / 1000).toFixed(1),
          steps: res.result.routes[0].steps
        })
      }
    });
    that.setData({
      inputAddress: '',
      resultList: [],
      show: false
    })
  },
})