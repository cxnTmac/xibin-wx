var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: "http://www.xbjg.org/xibin-web/",
    inputShowed: false,
    inputVal: '',
    types:[],
    currentType:'',
    models:[],
    skus:[],
    size:10,
    total:0,
    page:1,
    scrollHeight:'400px',
    scrollTop: 100,
    toView:'',
    icon60:'../../assets/images/1.jpg',
    searchResults:[],
    showSearchInner:'none',
    showMain:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 2 搜索栏初始化
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: (res.windowHeight-60)+'px'
        });
      }
    });
    that.showLoading('数据加载中');
    that.getAllTypes();
    that.getAllModels();
    
  },
  initLocation:function(){
    var that = this;
    that.setData({
      currentType: 'L'
    });
    for (var i = 4; i < that.data.types.length; ++i) {
      if (that.data.types[i].fittingTypeCode === 'L') {
        that.setData({
          toView: that.data.types[i - 1].fittingTypeCode
        })
        break
      }
    }
    that.querySku(true);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.querySku(true);
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
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    var totalPage = Math.ceil(this.data.total / this.data.size);
    if (this.data.page === totalPage){
      this.showToast('没有更多了！', 1500);
    }else{
      this.setData({
        page: this.data.page+1
      })
      this.querySku(false);
    }
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    var that = this;
    for (var i = 4; i < that.data.types.length; ++i) {
      if (that.data.types[i].fittingTypeCode === e.currentTarget.id) {
        that.setData({
          toView: that.data.types[i - 1].fittingTypeCode
        })
        break
      }
    }
    that.setData({
      currentType: e.currentTarget.id 
    })
    this.setData({
      total: 0,
      page: 1,
      skus: []
    });
    that.querySku(true);
  },
  getAllTypes:function(){
    var that = this;
    wx.request({
      url: 'https://www.xbjg.org/xibin/wx/showAllFittingTypeWithOutPage.shtml', 
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //that.types = res.data;
        that.setData({
          types: res.data
        })
        that.initLocation();
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },
  getAllModels:function(){
    
    var that = this;
    wx.request({
      url: 'https://www.xbjg.org/xibin/wx/showAllModel.shtml', 
      data: {
        conditions: {}
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //that.types = res.data;
        that.setData({
          models: res.data
        })
        wx.hideLoading()
      }
    })
  },
  showToast: function (msg,time) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: time
    });
  },
  showLoading:function(msg){
    wx.showLoading({
      title: msg
    });
  },
  querySku:function(requeryFlag){
    var that = this;
    that.showLoading('数据加载中');
    var conditions = { fittingTypeCode: that.data.currentType};
    if (that.data.inputVal !== null && that.data.inputVal !== '') {
      conditions['fuzzyCondition'] = that.data.inputVal
    }
    wx.request({
      url: 'https://www.xbjg.org/xibin/wx/showAllFittingSku.shtml', //仅为示例，并非真实的接口地址
      data: {
        page:that.data.page,
        size:that.data.size,
        conditions: conditions
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        //that.types = res.data;
        if (requeryFlag){
          that.setData({
            skus: res.data.list,
            total: res.data.size
          })
        }else{
          that.setData({
            skus: that.data.skus.concat(res.data.list),
            total: res.data.size
          })
        }
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },
  getSearchCondtionResult:function(modelName) {
    var that = this;
    that.setData({
      searchResults: []
    })
    var results = [];
    if (modelName !== null && modelName !== '') {
      for (var i = 0; i < that.data.models.length; i++) {
        if (that.data.models[i].modelName.indexOf(modelName) >= 0) {
          results.push({ modelCode: that.data.models[i].modelCode, modelName: that.data.models[i].modelName })
        }
      }
    }
    that.setData({
      searchResults: results
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      showSearchInner: 'inline'
    });
    this.setData({
      showMain: 'none'
    });
    this.setData({
      inputVal: e.detail.value
    });
    if(this.data.inputVal.length>=3){
      this.getSearchCondtionResult(this.data.inputVal);
    }
    
  },
  onResultItemClick: function (e) {
    this.setData({
      showSearchInner: 'none'
    });
    this.setData({
      showMain: ''
    });
   this.setData({
     inputVal:e.target.id
   });
   if (this.data.inputVal.length >= 3) {
     this.getSearchCondtionResult(this.data.inputVal);
   }
    this.querySku(true);
  },
  searchConfirm:function(e){
    this.setData({
      showSearchInner: 'none'
    });
    this.setData({
      showMain: ''
    });
    this.setData({
      total: 0,
      page: 1,
      skus:[]
    });
    this.querySku(true)
  }
})