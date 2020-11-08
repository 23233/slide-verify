/* create by 23233 2020/11/8 */
import styles from './main.css'

const Verify = require('./Verify.pug');

const PI = Math.PI

function createCanvas(width, height) {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d")
}

function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start)
}

function createImg(onload, src) {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = onload
  img.onerror = () => {
    throw "loading img fail"
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

// 图片尺寸推荐400x300 尽可能的小
export default class SlideVerify {
  constructor({elementId, onSuccess, onFail, onRefresh, onVerify, lang, photo, position, extraInfo}) {
    // 载入css文件
    document.head.innerHTML += `<link type ="text/css" rel="stylesheet" href="https://at.alicdn.com/t/font_2188076_ohmopgkua9.css">`;
    let intlText = {}
    if (lang && lang === 'en') {
      intlText = {slideTips: 'slide to right'}
    } else {
      intlText = {slideTips: '向右滑动填充拼图'}
    }
    let conEl = document.getElementById(elementId)
    let wrap = document.createElement("div")
    wrap.classList.add("slide-wrap")
    conEl.append(wrap)
    wrap.innerHTML = Verify({slideTips: intlText.slideTips})
    let el = wrap.firstChild
    let childNodes = el.childNodes
    this.element = conEl
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
    let block = childNodes[2]
    let sliderContainer = childNodes[3]
    let sliderMask = sliderContainer.childNodes[0]
    let text = sliderContainer.childNodes[1]
    let slider = sliderMask.childNodes[0]
    let sliderIcon = slider.childNodes[0]

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
    const img = createImg(() => {
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
    }, this.photo)
    this.img = img
  }

  clean() {
    this.canvasCtx.clearRect(0, 0, this.w, this.h)
    this.blockCtx.clearRect(0, 0, this.w, this.h)
    this.block.width = this.w
  }

  refresh() {
    if (typeof this.onRefresh === 'function') {
      const result = this.onRefresh()
      if (result) {
        this.photo = result.photo
        this.x = result.x
        this.y = result.y
        this.extraInfo = result.extraInfo
        this.randomPosition = false
      }
    }
    this.reset()
  }

  bindEvents() {
    this.el.onselectstart = () => false

    this.refreshIcon.onclick = () => this.refresh()

    let originX, originY, trail = [], isMouseDown = false

    const handleDragStart = function (e) {
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
        this.sliderIcon.childNodes[0].setAttribute("class", "slide-icon icon-check")
        addClass(this.sliderContainer, styles.sliderContainer_success)
        typeof this.onSuccess === 'function' && this.onSuccess({extra: this.extraInfo})
      } else {
        this.sliderIcon.childNodes[0].setAttribute("class", "slide-icon icon-error")
        addClass(this.sliderContainer, styles.sliderContainer_fail)
        typeof this.onFail === 'function' && this.onFail()
        setTimeout(() => {
          this.reset()
        }, 1000)
      }
    }
    this.slider.addEventListener('mousedown', handleDragStart)
    this.slider.addEventListener('touchstart', handleDragStart)
    this.block.addEventListener('mousedown', handleDragStart)
    this.block.addEventListener('touchstart', handleDragStart)
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
    this.sliderIcon.childNodes[0].setAttribute("class", "slide-icon icon-gesture")
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
    this.element.innerHTML = ""
  }

}

window.SlideVerify = SlideVerify
