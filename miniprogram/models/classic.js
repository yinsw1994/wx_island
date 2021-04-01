import { HTTP } from '../util/http'
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        sCallback(res)
      }
    })
  }
}

export { ClassicModel }