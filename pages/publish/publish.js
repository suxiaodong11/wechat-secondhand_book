Page({

  data: {
    imageList: [],   //图片路径
    focus: false,    //文字聚焦
    items: [
      { name: '计软', value: '计软' },
      { name: '心理', value: '心理', checked: 'true' },
      { name: '外汉', value: '外汉' },
      { name: '设计', value: '设计' },
      { name: '特殊教育', value: '特殊教育' },
    ]
  },

  //book对象
  Book: {
    bookID: 0,
    bookName: "",
    college: "",
    phone: "",
    weChat: "",
    descript: "",
    imageList: [],
    time: 0
  },

  //书名
  bindBookNameBlur: function (e) {
    this.Book.bookName = e.detail.value,
      console.log('书名12：', this.Book.bookName)
  },

//描述
  bindTextBlur:function(e){
     this.Book.descript = e.detail.value,
     console.log("描述：", this.Book.descript)
  },

  //院系
  radioChange: function (e) {
    this.Book.academic = e.detail.value,
      console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  //电话
  bindPhoneBlur: function (e) {
    this.Book.phone = e.detail.value,
      console.log('电话：', this.Book.phone)
  },

  //微信
  bindWechatBlur: function (e) {
    this.Book.weChart = e.detail.value,
      console.log('微信：', this.Book.weChart)
  },



  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'],
      sizeType: ['compressed'],           //压缩照片
      count: 3,
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])
        console.log('chooseImage success, temp path is', res.tempFilePaths[1])
        console.log('chooseImage success, temp path is', res.tempFilePaths[2])

        that.setData({
          imageList: res.tempFilePaths
        })
        console.log('shuzu')
      }
    })
  },

  //上传函数
  uploadBook: function (e) {

    console.log('上传')
    var book = this.Book;
    var myDate = new Date();
    book.time = myDate.getTime();
    book.imageList = this.data.imageList

    var formData = new FormData();
    formData.append('img', this.data.imageList[0]);


    var blob = new Blob([this.data.imageList[0]], { type: "application/json" });
    book.imageList[0] = blob;


    console.log('调用1')
    wx.request({
      url: 'http://localhost:8080/JSPHello/HelloServlet',   //上传路径，服务器地址   https://www.suyaodong.com/JSPHello/HelloServlet
      data: book,
      //filePath: tempFilePaths[0],

      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('uploadImage success, res is:', res)

        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000
        })

      },
      fail: function ({errMsg}) {
        console.log('POST fail, errMsg is', errMsg)
      }
    })
  },

  //下载函数
  downloadBook: function (e) {
    wx.downloadFile({
      url: 'https://www.suyaodong.com/JSPHello/images/533720.jpg', //仅为示例，并非真实的资源
      success: function (res) {

        console.log('downloadImage success, res is:', res)

        //打开文件
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
            console.log(res)
            show('打开文档成功')
          },
          fail: function (res) {
            console.log('fail')
            console.log(res)
            showTip();
          },
          complete: function (res) {
            console.log('complete')
            console.log(res)
          }
        })


        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  }
})
