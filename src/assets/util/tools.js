const getStyle = (el, style) => {
  return parseInt(window.getComputedStyle(el, false)[style])
}

const getDeviceRatio = () => {
  var isAndroid = window.navigator.appVersion.match(/android/gi);
  var isIPhone = window.navigator.appVersion.match(/iphone/gi);
  var devicePixelRatio = window.devicePixelRatio;
  var dpr;
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3) {
      dpr = 3;
    } else if (devicePixelRatio >= 2) {
      dpr = 2;
    } else {
      dpr = 1;
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1;
  }
  return dpr
}
// 解决403图片缓存问题
const getImages = (_url) => {
  if (_url !== undefined) {
    let _u = _url.substring(7);
    return 'https://images.weserv.nl/?url=' + _u;
  }
}

export {
  getStyle,
  getDeviceRatio,
  getImages
}