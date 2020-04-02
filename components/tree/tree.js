// components/tree/tree.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tree: {
      type: Array,
      value: []
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    treeData: [],
    num: 1,
    index: []
  },

  ready: function () {
    this.setData({
      treeData: this.data.tree
    })
  },
  observers: {
    'tree': function () {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        treeData: this.data.tree
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toggle: function (e) {
      const id = e.currentTarget.dataset.id;
      const isFolder = e.currentTarget.dataset.isfolder;
      const url = e.currentTarget.dataset.url;
      if (isFolder) {
        const treeData = this._findChild(id, this.data.treeData);
        this.setData({
          treeData: treeData
        })
      } else if (url && url.length > 0) {
        wx.navigateTo({
          url: url
        })
      }
    },
    _findChild: function (id, arr) {
      const that = this;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ID == id) {
          arr[i].isOpen = !arr[i].isOpen;
          break;
        }
        if (arr[i].Submenu && arr[i].Submenu.length > 0) {
          that._findChild(id, arr[i].Submenu)
        }
      }
      return arr;
    },
    handleTap: function (e) {
      this.setData({
        index: []
      })
      console.log(e.currentTarget.dataset.id)
      var original = this.data.treeData
      console.log(this.data.treeData)
      var changedata = this.screen(this.data.treeData, e.currentTarget.dataset.id)

      // if (changedata) {
      //   console.log(changedata)
      //   var myEventDetail = changedata // detail对象，提供给事件监听函数
      //   var myEventOption = {}
      //   this.triggerEvent('myevent', myEventDetail, myEventOption)
      // }
    },
    screen(data, id) {
      var that = this
      data.forEach(s => {
        if (s.ID == id) {
          s.IsEnabled = !s.IsEnabled
          console.log('找到了！')
          return data
        }
        if (s.Submenu.length > 0) {
          that.screen(s.Submenu, id)
        }
      })
      // console.log(data)
      // console.log(id)
      // data.forEach((s, index) => {
      //   console.log(s)
      //   console.log(s.ID == id)
      //   if (s.ID == id) {
      //     console.log("1级")
      //     var arr0 = this.data.index
      //     arr0.push(index)
      //     this.setData({
      //       index: arr0
      //     })
      //     return data
      //   }
      //   console.log(s.Submenu.length)
      //   console.log(s.Submenu)
      //   if (s.Submenu.length > 0) {
      //     s.Submenu.forEach((t, ts) => {
      //       if (t.ID == id) {
      //         console.log("2级")
      //         var arr = this.data.index
      //         arr.push(ts)
      //         this.setData({
      //           index: arr
      //         })
      //         return data
      //       }
      //       if (t.Submenu.length > 0) {
      //         t.Submenu.forEach((p, ps) => {
      //           if (p.ID == id) {
      //             console.log("3级")
      //             var arr1 = this.data.index
      //             arr.push(ps)
      //             this.setData({
      //               index: arr1
      //             })
      //             return data
      //           }
      //         })
      //       }
      //     })
      //   }
      // })

      console.log(this.data.index)
    },
    checkboxChange: function (e) {
      console.log(e)
     
        var myEventDetail = e.detail.value // detail对象，提供给事件监听函数
        var myEventOption = {}
        this.triggerEvent('myevent', myEventDetail, myEventOption)
      
    }
  },

})