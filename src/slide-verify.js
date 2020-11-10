/* create by 23233 2020/11/8 */
import styles from './main.less'

const Verify = require('./Verify.pug');

const PI = Math.PI

const Icons = {
  gesture: `<svg t="1604817559308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1380" width="27" height="27"><path d="M420.266667 394.666667c4.266667 4.266667 10.666667 6.4 14.933333 6.4s10.666667-2.133333 14.933333-6.4l64-64c8.533333-8.533333 8.533333-21.333333 0-29.866667l-64-64c-8.533333-8.533333-21.333333-8.533333-29.866666 0s-8.533333 21.333333 0 29.866667l27.733333 27.733333h-204.8v42.666667H448l-27.733333 27.733333c-8.533333 8.533333-8.533333 21.333333 0 29.866667zM149.333333 256h204.8v-42.666667H149.333333l27.733334-27.733333c8.533333-8.533333 8.533333-21.333333 0-29.866667s-21.333333-8.533333-29.866667 0l-64 64c-8.533333 8.533333-8.533333 21.333333 0 29.866667l64 64c4.266667 4.266667 10.666667 6.4 14.933333 6.4s10.666667-2.133333 14.933334-6.4c8.533333-8.533333 8.533333-21.333333 0-29.866667L149.333333 256z" p-id="1381"></path><path d="M964.266667 552.533333c-8.533333-40.533333-29.866667-64-61.866667-66.133333-10.666667 0-21.333333 0-32 4.266667-8.533333-29.866667-34.133333-51.2-66.133333-51.2-14.933333 0-29.866667 4.266667-40.533334 12.8-12.8-17.066667-34.133333-29.866667-55.466666-29.866667-8.533333 0-19.2 2.133333-27.733334 6.4V234.666667c0-38.4-32-70.4-70.4-70.4s-70.4 32-70.4 70.4v292.266666l-49.066666 12.8c-40.533333 10.666667-70.4 49.066667-70.4 91.733334 0 38.4 0 66.133333 2.133333 85.333333 8.533333 76.8 51.2 134.4 83.2 179.2 19.2 25.6 36.266667 49.066667 36.266667 64h42.666666c0-27.733333-19.2-55.466667-44.8-87.466667-29.866667-40.533333-68.266667-93.866667-74.666666-157.866666-2.133333-17.066667-2.133333-44.8-2.133334-81.066667 0-23.466667 17.066667-44.8 38.4-51.2l40.533334-10.666667v130.133334h42.666666V234.666667c0-14.933333 12.8-27.733333 27.733334-27.733334s27.733333 12.8 27.733333 27.733334v356.266666h42.666667v-98.133333c0-14.933333 12.8-27.733333 27.733333-27.733333 14.933333 0 27.733333 12.8 27.733333 27.733333v98.133333h42.666667v-81.066666c0-14.933333 12.8-27.733333 27.733333-27.733334s27.733333 12.8 27.733334 27.733334v96h42.666666v-68.266667c6.4-4.266667 14.933333-6.4 25.6-6.4 6.4 0 17.066667 2.133333 23.466667 32 29.866667 145.066667-8.533333 270.933333-29.866667 339.2-8.533333 27.733333-12.8 44.8-12.8 57.6h42.666667c0-6.4 6.4-25.6 10.666667-44.8 19.2-74.666667 57.6-209.066667 25.6-362.666667z" p-id="1382"></path></svg>`,
  refresh: `<svg t="1604817526244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1122" width="27" height="27"><path d="M908.213073 209.095805l-56.344975 44.056975C775.043122 154.948683 655.559805 91.910244 521.390829 91.910244 289.717073 91.910244 102.200195 279.227317 101.900488 511.000976 101.60078 742.974439 289.517268 931.090732 521.390829 931.090732c181.123122 0 335.47239-114.887805 394.215025-275.830634 1.498537-4.195902-0.699317-8.891317-4.89522-10.289952l-56.644683-19.480975c-4.096-1.398634-8.59161 0.699317-10.090146 4.795317-1.798244 4.995122-3.796293 9.990244-5.894244 14.885463-17.283122 40.96-42.058927 77.724098-73.628098 109.293269-31.569171 31.569171-68.333268 56.344976-109.193365 73.728-42.258732 17.882537-87.314732 26.973659-133.669464 26.973658-46.454634 0-91.410732-9.091122-133.669463-26.973658-40.860098-17.283122-77.624195-42.058927-109.193366-73.728-31.569171-31.569171-56.344976-68.333268-73.628098-109.293269-17.882537-42.358634-26.973659-87.314732-26.973658-133.769366s9.091122-91.410732 26.973658-133.769365c17.283122-40.96 42.058927-77.724098 73.628098-109.293269 31.569171-31.569171 68.333268-56.344976 109.193366-73.728 42.258732-17.882537 87.314732-26.973659 133.669463-26.973658 46.454634 0 91.410732 9.091122 133.669464 26.973658 40.860098 17.283122 77.624195 42.058927 109.193365 73.728 9.890341 9.890341 19.181268 20.380098 27.772878 31.369366l-60.141268 46.954146c-5.294829 4.096-3.496585 12.487805 2.997073 14.086244l175.428683 42.958049c4.995122 1.198829 9.890341-2.597463 9.890342-7.692488l0.799219-180.723512c-0.099902-6.593561-7.79239-10.289951-12.987317-6.193951z" p-id="1123"></path></svg>`,
  error: `<svg t="1604817587034" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1510" width="27" height="27"><path d="M866.016 740.992q28.992 30.016 42.496 55.008T904 852.992q-4 6.016-11.008 14.496T878.496 884t-15.008 14.496T850.976 908q-24.992 15.008-59.008 8t-60.992-34.016l-236-236-128 128q-59.008 59.008-96 96.992-38.016 38.016-75.488 47.008t-66.496-16.992L100 872q-6.016-6.016-7.008-8Q81.984 849.984 80 835.488t2.496-28.512T96 779.968t20-24q8.992-8 32-30.016l54.016-56q32.992-32 73.504-72t84.512-84q-48-48-91.488-91.008t-78.016-76.992-56.512-55.488-27.008-26.496q-26.016-26.016-26.496-51.488t17.504-51.488q8-10.016 23.008-23.488T142.016 120q30.016-20 54.016-17.504t48 27.488l31.008 31.008q23.008 23.008 56.992 56t76.512 74.496 88.512 86.496q38.016-38.016 74.496-74.016t68-67.488 56.992-56.512 42.496-42.016q24-23.008 52-30.496t54.016 12.512q0.992 0.992 6.496 4.992t11.008 8.992 10.496 9.504 7.008 5.504q27.008 26.016 26.496 56.512t-26.496 56.512Q862.048 280 835.552 306.976t-59.008 59.008-68.512 68l-76 76q36.992 36 72.512 70.496t66.016 64.512T825.568 700t40.512 40.992z" p-id="1511"></path></svg>`,
  success: `<svg t="1604817593524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1639" width="27" height="27"><path d="M376.70007324 814.24047852l-274.21874999-274.21875c-16.47454834-16.47454834-16.47454834-43.18615722-1e-8-59.66235352l59.66070557-59.66235352c16.47454834-16.47619629 43.18780518-16.47619629 59.66235351 0L406.53125 605.42224122 802.19561768 209.75952148c16.47454834-16.47454834 43.18780518-16.47454834 59.66235351 0l59.66070557 59.66235352c16.47454834 16.47454834 16.47454834 43.18615722 0 59.66235352l-485.15625 485.15789794c-16.47619629 16.47454834-43.18780518 16.47454834-59.66235351-0.00164794z" p-id="1640"></path></svg>`,
}

function createCanvas(width, height) {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d")
}

function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start)
}

function createImg(onload, src, onError) {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = onload
  img.onerror = (err) => {
    onError && onError(err)
  }
  img.setSrc = function (src) {
    if (window.navigator.userAgent.indexOf('Trident') > -1) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      const xhr = new XMLHttpRequest()
      xhr.onloadend = function (e) {
        const file = new FileReader() // FileReader仅支持IE10+
        file.readAsDataURL(e.target.response)
        file.onloadend = function (e) {
          img.src = e.target.result
        }
      }
      xhr.open('GET', src)
      xhr.responseType = 'blob'
      xhr.send()
    } else img.src = src
  }
  let setSrc = ''
  if (src) {
    // 如果用户设置图片则使用
    if (typeof src === 'string') {
      setSrc = src
    } else if (Array.isArray(src)) {
      setSrc = src[getRandomNumberByRange(0, src.length - 1)]
    }
  }
  img.setSrc(setSrc)
  return img
}

function addClass(tag, className) {
  tag.classList.add(className)
}

function removeClass(tag, className) {
  tag.classList.remove(className)
}

function sum(x, y) {
  return x + y
}

function square(x) {
  return x * x
}

// 图片尺寸推荐310x210 尽可能的小
export default class SlideVerify {
  constructor({elementId, onSuccess, onFail, onRefresh, onVerify, lang, photo, position, extraInfo, fixed}) {
    let intlText = {}
    if (lang && lang === 'en') {
      intlText = {slideTips: 'slide to right'}
    } else {
      intlText = {slideTips: '向右滑动填充拼图'}
    }
    let conEl = document.getElementById(elementId)
    let wrap = document.createElement("div")
    wrap.classList.add("slide-wrap")
    if (fixed) {
      addClass(wrap, styles.slideFixed)
    }
    conEl.append(wrap)
    wrap.innerHTML = Verify({slideTips: intlText.slideTips})
    let el = wrap.firstChild
    let childNodes = el.childNodes
    this.element = wrap
    this.el = el
    this.onSuccess = onSuccess
    this.onFail = onFail
    this.onRefresh = onRefresh
    this.onVerify = onVerify
    this.photo = photo
    this.randomPosition = !position
    if (position) {
      this.x = position.x
      this.y = position.y
    }
    this.extraInfo = extraInfo

    this.l = 42// 滑块边长
    this.r = 7.5// 滑块半径
    this.w = 310// canvas宽度
    this.h = 210// canvas高度
    this.L = this.l + this.r * 2 + 9 // 滑块实际边长


    let canvas = childNodes[0]
    let refreshIcon = childNodes[1]
    refreshIcon.innerHTML = Icons.refresh
    let block = childNodes[2]
    let sliderContainer = childNodes[3]
    let sliderMask = sliderContainer.childNodes[0]
    let text = sliderContainer.childNodes[1]
    let slider = sliderMask.childNodes[0]
    let sliderIcon = slider.childNodes[0]
    sliderIcon.innerHTML = Icons.gesture

    Object.assign(this, {
      canvas,
      block,
      sliderContainer,
      refreshIcon,
      slider,
      sliderMask,
      sliderIcon,
      text,
      canvasCtx: canvas.getContext('2d'),
      blockCtx: block.getContext('2d')
    })
    this.initImg()
    this.bindEvents()

  }

  initImg() {
    this.runLoading()
    const img = createImg(() => {
      this.loading = false
      // 随机创建滑块的位置
      if (this.randomPosition) {
        this.x = getRandomNumberByRange(this.L + 70, this.w - (this.L + 10))
        this.y = getRandomNumberByRange(10 + this.r * 2, this.h - (this.L + 10))
      }
      // draw canvas 及 被抠出的 piece 留下的坑
      this.canvasCtx.drawImage(img, 0, 0, this.w, this.h)
      this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.35)'
      this.canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      this.drawPiece(this.canvasCtx, this.x, this.y)
      this.canvasCtx.fill()
      this.drawPieceInsideShadow(this.canvasCtx, this.x, this.y)
      this.drawBlock(img, this.blockCtx, this.x, this.y)
    }, this.photo, function (err) {
      console.error("loading img fail", err)
      this.runLoading("加载失败,请重试")
    }.bind(this))
    this.img = img
  }

  clean() {
    this.canvasCtx.clearRect(0, 0, this.w, this.h)
    this.blockCtx.clearRect(0, 0, this.w, this.h)
    this.block.width = this.w
    this.loading = false
  }

  runLoading(msg = "加载中...") {
    this.clean()
    this.loading = true
    this.canvasCtx.fillStyle = "#999"
    this.canvasCtx.font = "bold 18px sans-serif"
    this.canvasCtx.textAlign = "center"
    this.canvasCtx.strokeWidth = 1
    this.canvasCtx.strokeStyle = "#eee"
    this.canvasCtx.fillText(msg, this.w / 2, this.h / 2)
  }

  setNewInfo(result) {
    if (result) {
      if (result.hasOwnProperty("photo")) {
        this.photo = result.photo
      }
      if (result.hasOwnProperty("x") && result.hasOwnProperty("y")) {
        this.x = result.x
        this.y = result.y
        this.randomPosition = false
      } else {
        this.randomPosition = true
      }
      if (result.hasOwnProperty("extraInfo")) {
        this.extraInfo = result.extraInfo
      } else {
        this.extraInfo = {}
      }
    }
  }

  refresh() {
    if (typeof this.onRefresh === 'function') {
      const result = this.onRefresh()
      this.setNewInfo(result)
    }
    this.reset()
  }

  bindEvents() {
    this.el.onselectstart = () => false

    this.refreshIcon.onclick = () => this.refresh()

    let originX, originY, trail = [], isMouseDown = false

    const handleDragStart = function (e) {
      if (this.loading) return false;
      originX = e.clientX || e.touches[0].clientX
      originY = e.clientY || e.touches[0].clientY
      isMouseDown = true
    }

    const handleDragMove = (e) => {
      if (!isMouseDown) return false
      const eventX = e.clientX || e.touches[0].clientX
      const eventY = e.clientY || e.touches[0].clientY
      const moveX = eventX - originX
      const moveY = eventY - originY
      if (moveX < 0 || moveX + 38 >= this.w) return false
      this.slider.style.left = moveX + 'px'
      // const blockLeft = (w - 40 - 20) / (w - 40) * moveX
      this.block.style.left = moveX + 'px'

      addClass(this.sliderContainer, styles.sliderContainer_active)
      this.sliderMask.style.width = moveX + 12 + 'px'
      trail.push(moveY)
    }

    const handleDragEnd = (e) => {
      if (!isMouseDown) return false
      isMouseDown = false
      const eventX = e.clientX || e.changedTouches[0].clientX
      if (eventX === originX) return false
      removeClass(this.sliderContainer, styles.sliderContainer_active)
      this.trail = trail
      const success = this.verify()
      if (success) {
        this.sliderIcon.innerHTML = Icons.success
        addClass(this.sliderContainer, styles.sliderContainer_success)
        typeof this.onSuccess === 'function' && this.onSuccess({extra: this.extraInfo})
      } else {
        this.sliderIcon.innerHTML = Icons.error
        addClass(this.sliderContainer, styles.sliderContainer_fail)
        typeof this.onFail === 'function' && this.onFail({extra: this.extraInfo})
        setTimeout(() => {
          this.refresh()
        }, 1000)
      }
    }
    this.slider.addEventListener('mousedown', handleDragStart.bind(this))
    this.slider.addEventListener('touchstart', handleDragStart.bind(this))
    this.block.addEventListener('mousedown', handleDragStart.bind(this))
    this.block.addEventListener('touchstart', handleDragStart.bind(this))
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
  }

  verify() {
    const arr = this.trail // 拖动时y轴的移动距离
    const average = arr.reduce(sum) / arr.length
    const deviations = arr.map(x => x - average)
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length)
    const left = parseInt(this.block.style.left)
    if (Math.abs(left - this.x) < 10) {
      if (typeof this.onVerify === 'function') {
        return this.onVerify({average, deviations, arr, stddev, left, "extra": this.extraInfo})
      }
      return true
    }
    return false
  }

  reset() {
    this.sliderContainer.className = styles.sliderContainer
    this.sliderIcon.innerHTML = Icons.gesture
    this.slider.style.left = 0
    this.block.style.left = 0
    this.sliderMask.style.width = 0
    this.clean()
    this.initImg()
  }

  drawPiece(ctx, x, y) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x + this.l / 2, y - this.r + 2, this.r, 0.72 * PI, 2.26 * PI)
    ctx.lineTo(x + this.l, y)
    ctx.arc(x + this.l + this.r - 2, y + this.l / 2, this.r, 1.21 * PI, 2.78 * PI)
    ctx.lineTo(x + this.l, y + this.l)
    ctx.lineTo(x, y + this.l)
    ctx.arc(x + this.r - 2, y + this.l / 2, this.r + 0.4, 2.76 * PI, 1.24 * PI, true)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  drawPieceInsideShadow(ctx, x, y) {
    // 第一步生成一个piece图形模板
    let piece = document.createElement("canvas");
    piece.width = this.w
    piece.height = this.h
    let pieceCtx = piece.getContext("2d");
    pieceCtx.fillStyle = "white";

    this.drawPiece(pieceCtx, x, y)
    pieceCtx.lineWidth = 1
    pieceCtx.strokeStyle = 'rgba(0, 0, 0, 1)'
    pieceCtx.stroke()
    pieceCtx["clip"]()
    // document.body.appendChild(piece);

    // 第二部生成piece外围黑边准备用于内投影
    let hole = document.createElement("canvas");
    let holeContext = hole.getContext("2d");
    hole.width = this.w
    hole.height = this.h

    //first, I draw a big black rect
    holeContext.fillStyle = "#000000";
    holeContext.fillRect(0, 0, this.w, this.h)
    //then I use the image to make an hole in it
    holeContext.globalCompositeOperation = "xor";

    this.drawPiece(holeContext, x, y)
    holeContext.lineWidth = 0
    holeContext.fillStyle = "tranparent";
    holeContext.stroke()
    holeContext.fill()
    // document.body.appendChild(hole);

    // 第三部生成内shadow
    let shadow = document.createElement("canvas");
    let shadowContext = shadow.getContext("2d");
    shadow.width = this.w;
    shadow.height = this.h;
    shadowContext.filter = "drop-shadow(0px 0px " + "5px #000000 ) ";
    shadowContext.drawImage(hole, 0, 0);
    shadowContext.drawImage(hole, 0, 0);
    shadowContext.drawImage(hole, 0, 0);
    shadowContext.drawImage(hole, 0, 0);
    shadowContext.drawImage(hole, 0, 0);
    shadowContext.globalCompositeOperation = "destination-out";
    shadowContext.drawImage(hole, 0, 0);
    // document.body.appendChild(shadow);

    // 第四部应用shadow
    ctx.drawImage(shadow, 0, 0)
  }

  drawBlock(img, ctx, x, y) {
    // 第一步 生成包含图像的 piece 方块
    ctx.lineWidth = 0.5
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
    ctx.strokeStyle = 'rgba(253,255,29,0.7)'
    this.drawPiece(ctx, x, y)
    ctx.clip()
    ctx.globalCompositeOperation = 'source-over'

    // 设置图像及边长
    ctx.drawImage(img, 0, 0, this.w, this.h)
    const pieceY = y - this.r * 2 - 1
    const ImageData = ctx.getImageData(x - 3, pieceY, this.L, this.L)
    ctx.canvas.width = this.L
    ctx.putImageData(ImageData, 0, pieceY)

    // 第二步生成外shadow piece
    let shadowCtx = createCanvas(this.w, this.h)
    shadowCtx.canvas.width = this.L
    shadowCtx.shadowColor = "black";
    shadowCtx.shadowBlur = 6;
    shadowCtx.shadowOffsetX = 2;
    shadowCtx.shadowOffsetY = 5;
    this.drawPiece(shadowCtx, 3, y)
    shadowCtx.lineWidth = 1
    shadowCtx.fillStyle = 'rgba(0, 0, 0, 1)'
    shadowCtx.strokeStyle = 'rgba(0, 0, 0, 1)'
    shadowCtx.stroke()
    shadowCtx.fill()

    let compositeCtx = createCanvas(this.w, this.h)
    compositeCtx.canvas.width = this.L
    compositeCtx.drawImage(shadowCtx.canvas, 0, 0)
    compositeCtx.drawImage(ctx.canvas, 0, 0)
    // document.body.appendChild(compositeCtx.canvas);

    ctx.drawImage(compositeCtx.canvas, 0, 0)
  }

  destory() {
    this.element.remove()
  }

}

window.SlideVerify = SlideVerify
