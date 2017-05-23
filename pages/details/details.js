// pages/movie/movie.js
Page({
  data:{
    movies:[],
    casts:[],
    hidden:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadMovie();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  //获取数据
  loadMovie:function(){
    var page = this;
    var id = wx.getStorageSync("id")
    wx.request({
      url:'https://api.douban.com/v2/movie/subject/'+id,
      header:{'content-type':'application/x-www-form-urlencoded'},
      success:function(res){
          console.log(res);
       var subjects = res.data;
       var casts = res.data.casts;
       page.setData({movies:subjects,casts:casts,hidden:true});
      }
    })
  },
})