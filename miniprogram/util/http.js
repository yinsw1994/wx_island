import {config} from '../config.js'
import { Base64 } from 'js-base64'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'token错误',
  3000: ''
}
class HTTP {
  request(params) {
    if (!params.method) params.method = 'GET'
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'Authorization': HTTP._encode()
      },
      success: res => {
        console.log('=====>', res)
        let code = res.statusCode + ''
        if (code.startsWith('2')) {
          params.success && params.success(res)
        } else {
          // 服务器异常
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      // api
      fail: err => {
        wx.showToast(1)
      }
    })
  }

  // 报错弹窗处理
  _show_error(error_code) {
    if(!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }

  // base64 加密
  static _encode() {
    // token: 
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token+ ':')
    return 'Basic ' + base64
  }

  static onGetToken() {
    // 如何获取当前code
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: config.api_base_url + '/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: (res1) => {
              console.log(res1.data)
              const code = res1.statusCode.toString()
              if (code.startsWith('2')) {
                // 将令牌写入缓存中，其他请求要用的时候，可以调用
                wx.setStorageSync('token', res1.data.token)
              }
            }
          })
        }

      }
    })
  }
}

export { HTTP }