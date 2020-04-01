// components/tree/tree.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tree: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    treeData: []
  },

  ready: function () {
    this.setData({

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
      console.log(e.currentTarget.dataset.id)
      var original = this.data.treeData
      var changedata = this.screen(this.data.treeData, e.currentTarget.dataset.id)
      console.log(changedata)
      if (changedata) {
        console.log(changedata)
        var myEventDetail = changedata // detail对象，提供给事件监听函数
        var myEventOption = {}
        this.triggerEvent('myevent', myEventDetail, myEventOption)
      }
    },
    screen(data, id) {
      var that = this
      data.forEach(s => {
        if (s.ID == id) {
          s.IsEnabled = !s.IsEnabled
          console.log('找到了！')
          return s
        }
        if (s.Submenu.length > 0) {
          that.screen(s.Submenu)
        }
      })
      return data
    },
    checkboxChange: function (e) {
      console.log(e)

    }
  },

})