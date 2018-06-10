var app = getApp()

Page({
  data: {
    userInfo: {},
    isFail:false,
    hotList: [],
    recommendList: [],
    userName:'',
  },
  //事件处理函数
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    });
    
    wx.request({
      url: "https://htcc.fendous.cn/api/firstpage/index",
      data: { isFresh: "yes" },
      method: 'GET',
      success: function (res) {
        var arr = [];
        for (var i = 0; i < res.data.length; i++) {
          arr[i] = { 'content': res.data[i]};
        }
          that.setData({
            hotList: arr
          })
      },
      fail:function(res){
         that.setData({
           isFail:true
         })
         console.log(res.errMsg);
      }
    });
   
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?s=' + e.currentTarget.dataset.id
    })
  },
  focusHandler: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  excuteSearch: function (e) {
    if (this.data.userName==""){
      wx.showToast({
        title: '请先输入关键字',
        icon: 'loading',
        duration: 1000
      });return;
    }
    wx.navigateTo({
      url: '../search/search?q=' + this.data.userName
    })
  },
  excuteHotSearch:function(e){
     var sub= e.currentTarget.dataset.sub;
     var content=this.data.hotList[sub].content;
     wx.navigateTo({
      url: '../search/search?q='+ content
    })
  },
  onShareAppMessage: function () {
    return {
      title: '网盘搜索',
      desc: '网盘数据建搜。',
      path: '/pages/index/index'
    }
  }
})
