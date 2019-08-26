// new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: "http://www.xbjg.org/xibin-web/",
    skus:[],
    page:1,
    size:10,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.querySku();
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
    this.querySku();
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
    var totalPage = Math.ceil(this.data.total / this.data.size);
    if (this.data.page === totalPage) {
      this.showToast('没有更多了！', 1500);
    } else {
      this.setData({
        page: this.data.page + 1
      })
      this.querySku();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  showToast: function (msg, time) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: time
    });
  },
  showLoading: function (msg) {
    wx.showLoading({
      title: msg
    });
  },
  querySku: function () {
    var that = this;
    that.showLoading('数据加载中');
    var conditions = { fittingSkuStatus: 'NEW' };
    wx.request({
      url: 'https://www.xbjg.org/xibin/wx/showAllFittingSku.shtml', 
      data: {
        page: that.data.page,
        size: that.data.size,
        conditions: conditions
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        //that.types = res.data;
        that.setData({
          skus: that.data.skus.concat(res.data.list),
          total: res.data.size
        })
        console.log(res.data)
      }
    })
  },
})