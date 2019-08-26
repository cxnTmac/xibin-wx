// productDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: "http://www.xbjg.org/xibin-web/",
    windowWidth:'',
    windowHeight:'',
    skuCode:'',
    sku:{},
    skuPics:[],
    imgsZip:[],
    imgs:[],
    picHeight:'700rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.skuCode = options.skuCode;
    this.getSkuDetail();
    this.getSkuPics();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
        console.log(that.data)
      }
    })
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
  onShareAppMessage: function (options) {
    return {
      title: this.data.sku.fittingSkuName,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onImageTap:function(e){
    var urls = [];
    for(var i = 0;i<this.data.imgs.length;i++){
      urls.push(this.data.imgSrc+this.data.imgs[i].fittingSkuPicUrl);
    }
    wx.previewImage({
      current: urls[0], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  getSkuDetail:function(){
    var that = this;
    wx.request({
      url: 'https://www.xbjg.org/xibin/wx/getFittingTypeSkuBySkuCode.shtml',
      data: {
        fittingSkuCode:that.data.skuCode
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //that.types = res.data;
        that.setData({
          sku: res.data
        })
      }
    })
  },
  getSkuPics:function(){
    var that = this;
    wx.request({
      url: 'https://www.xbjg.org/xibin/wx/getFittingSkuPic.shtml',
      data: {
        fittingSkuCode:that.data.skuCode
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //that.types = res.data;
        that.setData({
          skuPics: res.data
        })
        that.convertPics();
        that.initSwiperHeight(that.data.imgs[0]);
      }
    })
  },
  convertPics:function(){
    var that = this;
    var result = this.data.skuPics;
    that.setData({
      imgsZip: [],
      imgs:[]
    })
    var imgsZip = [];
    var imgs = [];
    for (var i = 0; i < result.length;i++){
      if (result[i].type === 'ZIP'){
        imgsZip.push(result[i]);
      } else if (result[i].type === 'NORMAL'){
        imgs.push(result[i]);
      }
    }
    that.setData({
      imgsZip: imgsZip,
      imgs: imgs
    })
  },
  initSwiperHeight:function(img){
    if(img!==null){
      var height = 0;
      height = 750/img.width*img.height+'rpx';
      this.setData({
        picHeight: height
      })
    }
  },
  back:function(){
    wx.switchTab({
      url: '../product/product',
      success:function(){
        
      },fail:function(){
        
      }
    })
    // wx.navigateBack({
    //   delta: 1
    // })
  }
})