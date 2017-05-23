Page({
  data:{
    movies:[],
    hidden:true,
    inputValue:""
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // this.loadMovie();
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
  subject:function(subjects){
    var casts = [];
    var genres = [];
    var directors = [];
    // 演员
    for(var i =0 ;i<subjects.length;i++){
      for(var j =0;j<subjects[i].casts.length;j++){
          casts.push(subjects[i].casts[j].name);
        }
        casts.push("/");
        subjects[i].cast = casts.join("").split('/')[i];
    }
    //导演
       for(var i =0 ;i<subjects.length;i++){
      for(var j =0;j<subjects[i].directors.length;j++){
          directors.push(subjects[i].directors[j].name);
        }
        directors.push("/");
        subjects[i].director = directors.join("").split('/')[i];
    }

    // 类型
     for(var i =0 ;i<subjects.length;i++){
      for(var j =0;j<subjects[i].genres.length;j++){
          genres.push(subjects[i].genres[j]);
        }
        genres.push("/");
        subjects[i].genre = genres.join("").split('/')[i];
    }
  },
  //搜索 加成
  search:function(){
    var txt = this.data.inputValue;
    var page = this;
    page.setData({hidden:false});
    wx.request({
      url:'https://api.douban.com/v2/movie/search?q='+txt,
      header:{'content-type':'application/x-www-form-urlencoded'},
      success:function(res){
       var subjects = res.data.subjects;
       if(subjects.length !== 0){
          page.subject(subjects);
          page.setData({movies:subjects,hidden:true});
       }else{
         page.setData({hidden:true});
         wx.showToast({
            title: '搜索不到相关影片的信息',
            icon: 'loading',
            duration: 2000
          })
       }
       
      }
    })
  },

  //实时更新输入的数据
  bindKeyInput:function(e){
    var page = this;
    page.setData({
      inputValue: e.detail.value
    })
  },

  //跳转到详情页，存储对应的id
  toDetails:function(e){
    wx.setStorageSync('id', e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/details/details',
    })
  }
})