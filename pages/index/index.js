//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    demoData:[
      {
        text: '定位'
      }, {
        text: '北京'
      }, {
        text: '上海'
      }, {
        text: '杭州'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  radioChange(el) {
    console.log(el)
    this.motto= el;
  },
  modalcnt: function () {
    var that = this
    //获取经纬度  
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          wd: latitude,
          jd: longitude
        })
        //显示模态窗口  
        wx.showModal({

          title: '获取到当前的经纬度',
          content: '经度：' + longitude + '，纬度：' + latitude,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  }
})
