var util = require('../../md5.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    article: {},
    articles: {},
    url: 'url',
    isset: ""
  },
  onLoad: function (option) {
  console.log(option)
    var that = this
    that.setData({
      article: decodeURIComponent(option.s),
      title: option.k,
    })
    wx.request({
      url: "https://htcc.fendous.cn/api/",
      data: {
        jsonrpc: app.globalData.jsonrpc,
        "method": "Detectionlink.index",
        params: { "username": app.globalData.username, "password": app.globalData.password, "uid": option.uid, "url": decodeURIComponent(option.s)},
        id: app.globalData.id,
      },
      method: 'POST',
      success: function (res) {
        //list = res.result
        if(res.data.result[0] == 0){
          wx.showToast({
            title: '检测链接可用',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            isset: "检测链接可用"
          })
        }else{
          wx.showToast({
            title: '链接已失效',
            icon: 'error',
            duration: 2000
          })
          that.setData({
            isset: "链接已失效"
          })
        }
      }})
    
    
  },
  show(e) {
    let that = this
    wx.setClipboardData({
      data: e.target.id,
      success() {
        that.setData({
          url: 'url2'
        })
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })  
      }
    })
    wx.getClipboardData({
      success(res) {
        //console.log(res.data)
      }
    })
  },
  onback:function(){
    wx.navigateBack({
       delta: 1
    })
  },
  
  onShareAppMessage: function (e) {
    let that = this
    return {
      title: '网盘搜索',
      desc: '网盘数据建搜。',
      path: '/pages/index/index',
      success: function (res) {
        wx.setClipboardData({
          data: e.target.id,
          success() {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "复制失败",
          duration: 2000
        });
      }
    }
  }
  
  
})
