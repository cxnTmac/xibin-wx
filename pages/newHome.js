// pages/newHome.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgSrc: "http://www.xbjg.org/xibin-web/",
        types: [],
        currentType: '',
        models: [],
        skus: [],
        size: 10,
        total: 0,
        page: 1,
        //搜索弹出框
        searchInputValue:'',
        searchResults:[],
        searchPopShow:false,
        //滚动条相关
        currentTypeIndex:10,
        scrollHeight:'400px',
        scrollTop: 100
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: (res.windowHeight-60)+'px'
                });
            }
        });
        console.log(that.data.scrollHeight)
        that.getAllTypes();
        that.getAllModels();
    },
    //设定初始产品类别
    initLocation:function(){
        var that = this;
        that.setData({
            currentType: 'L'
        });
        for (var i = 4; i < that.data.types.length; ++i) {
            if (that.data.types[i].fittingTypeCode === 'L') {
                that.setData({
                    currentTypeIndex : i
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
    tapSku:function (e) {
        console.log(e)
    },
    onSearchPopClose:function(){
        this.setData({ searchPopShow: false });
    },
    onSearchChange:function (e) {
        this.setData({
            searchInputValue: e.detail
        });
        if(e.detail.length<3){
            this.setData({ searchPopShow: false });
        }
        if(e.detail.length>=3){
            this.getSearchCondtionResult(e.detail);
            this.setData({ searchPopShow: true });
        }
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
        console.log(that.data.searchResults)
    },
    searchResultsClick:function (e) {
        this.querySku(true);
        this.setData({ searchPopShow: false });
    },
    onSearch:function (e) {
        this.querySku(true);
        this.setData({ searchPopShow: false });
    },
    onCancelSearch:function (e) {
        this.setData({ searchPopShow: false });
    },
    onChangeType: function (e) {
        var that = this;
        that.setData({
            currentType: that.data.types[e.detail].fittingTypeCode,
            currentTypeIndex:e.detail
        })
        this.setData({
            total: 0,
            page: 1,
            skus: []
        });
        that.querySku(true);
    },
    lower: function (e) {
        var totalPage = Math.ceil(this.data.total / this.data.size);
        if (this.data.page === totalPage){
            //
        }else{
            this.setData({
                page: this.data.page+1
            })
            this.querySku(false);
        }
    },
    getAllTypes: function () {
        var that = this;
        wx.request({
            url: 'https://www.xbjg.org/xibin/wx/showAllFittingTypeWithOutPage.shtml',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                //that.types = res.data;
                that.setData({
                    types: res.data
                })
                that.initLocation()
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
            }
        })
    },
    querySku:function(requeryFlag){
        var that = this;
        var conditions = { fittingTypeCode: that.data.currentType};
        if (that.data.searchInputValue !== null && that.data.searchInputValue !== '') {
            conditions['fuzzyCondition'] = that.data.searchInputValue
        }
        wx.request({
            url: 'https://www.xbjg.org/xibin/wx/showAllFittingSku.shtml',
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
                console.log(res.data)
            }
        })
    }
})