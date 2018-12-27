export const toast = (msg, time = 3000) => {
  let dismissTime = 300
  let node = document.createElement("div");
  node.className = "bodyToast"
  node.innerHTML = msg
  document.body.appendChild(node)
  setTimeout(() => {
    node.setAttribute('class', "bodyToast dismiss")
    setTimeout(() => {
      document.body.removeChild(node)
    }, dismissTime)
  }, time - dismissTime)
}

export const loading = {
  open: () => {
    let loading = document.getElementById("bodyLoading")
    if (!loading) {
      let node = document.createElement("div");
      node.id = "bodyLoading"
      node.appendChild(document.createElement("div"))
      document.body.appendChild(node)
    }
  },
  close: () => {
    let loading = document.getElementById("bodyLoading")
    if (loading) {
      document.body.removeChild(loading)
    }
  }
}

export const webEnv = () => {
  let UA = navigator.userAgent,
    isAndroid = /android|adr|linux/gi.test(UA),
    isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
    isBlackBerry = /BlackBerry/i.test(UA),
    isWindowPhone = /IEMobile/i.test(UA),
    isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone
  return {
    isAndroid: isAndroid,
    isIOS: isIOS,
    isMobile: isMobile,
    isWeixin: /MicroMessenger/gi.test(UA),
    isQQ: /QQ/gi.test(UA),
    isPC: !isMobile,
    isWeibo: /WeiBo/gi.test(UA)
  }
}

export const formatDate = (time, format) => {
  if (time == '' || time == null || time == undefined)
    return ''
  time = new Date(time)
  const datetime = new Date()
  datetime.setTime(time)
  const year = datetime.getFullYear()
  const month = datetime.getMonth() + 1 < 10
    ? '0' + (
    datetime.getMonth() + 1)
    : datetime.getMonth() + 1
  const date = datetime.getDate() < 10
    ? '0' + datetime.getDate()
    : datetime.getDate()
  const hour = datetime.getHours() < 10
    ? '0' + datetime.getHours()
    : datetime.getHours()
  const minute = datetime.getMinutes() < 10
    ? '0' + datetime.getMinutes()
    : datetime.getMinutes()
  const second = datetime.getSeconds() < 10
    ? '0' + datetime.getSeconds()
    : datetime.getSeconds()
  const timeArr = [
    year,
    month,
    date,
    hour,
    minute,
    second
  ]
  let _mapper = {};
  [
    'YYYY',
    'MM',
    'DD',
    'hh',
    'mm',
    'ss'
  ].forEach((_symbol, i) => (_mapper[_symbol] = timeArr[i]))
  if (format) {
    const matchArr = format.match(/\w+/g)
    matchArr.forEach(match => {
      format = format.replace(match, _mapper[match])
    })
    return format
  } else {
    return (year + '月' + month + '月' + date + '日 ' + ' ' + hour + ':' + minute)
  }
}


export default {
  formatDate,
  webEnv,
  toast,
  loading,
}
