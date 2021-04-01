// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function(newVal, oldVal, changedPath) {
        let val = newVal < 10? "0" + newVal: newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  // wxs

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月', '十二月'
    ],
    year: 2021,
    month: 3,
    _index: ''
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      this.setData({
        year: year,
        month: this.data.months[month]
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
