// home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage1:true,
    showPage2:false,
    showPage3:false,
    showInfo : true,
    logoSrc : "../../assets/logo/LOGO4.jpg",
    grids: [{ title: '主要产品', icon: '../../assets/icons/product.png' }, { title: '公司简介', icon: '../../assets/icons/company.png' },{ title: '联系我们', icon: '../../assets/icons/customer.png' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onShareAppMessage: function () {
  
  },
  onScanBtnTap:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  onWxImageTap:function(){
    debugger
    var urls = [];
    var imgs = this.data.imgs;
    for (var i = 0; i < imgs.length; i++) {
      urls.push(this.data.imgSrc + imgs[i].fittingSkuPicUrl);
    }
    wx.previewImage({
      current: urls[0], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  iconTap:function(e){
    if(e.currentTarget.id === "0"){
      this.setData({
        showPage1:true,
        showPage2: false,
        showPage3: false,
      });
    }
    if (e.currentTarget.id === "1") {
      this.setData({
        showPage1: false,
        showPage2: true,
        showPage3: false,
      });
    }
    if (e.currentTarget.id === "2") {
      this.setData({
        showPage1: false,
        showPage2: false,
        showPage3: true,
      });
    }
  },
  addToPhone:function(){
    wx.addPhoneContact({
      firstName:'西滨精工汽车零配件有限公司',
      weChatNumber:"15305000658",
      workPhoneNumber:"0595-85129500",
      organization:'西滨精工汽车零配件有限公司',
      success:function(){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
})