/* create by Micheal Xiao 2019/7/19 17:53 */
import SlideVerify from './slide-verify'


let Slide = new SlideVerify({
  elementId: "slide-wrap",

  onSuccess: ({extra}) => {
    console.log("success", extra)
    Slide.destory()
  },
  onFail: () => {
    console.log("fail")
  },
  onVerify: (params) => {
    console.log("验证", params)
    return true
  },
  extraInfo: {
    id: "834585438"
  },
  onRefresh: () => {
    console.log("refresh")
    // return {photo: 'https://picsum.photos/310/110', x: 100, y: 60, extraInfo: {id: "123913289321"}}
    const id = Math.floor(Math.random()*1500+1)
    return {photo: `https://picsum.photos/id/${id}/310/210`}
  },
  photo: 'https://picsum.photos/seed/picsum/310/210'
  // photo: ['https://picsum.photos/310/210', 'https://picsum.photos/310/210', 'https://picsum.photos/310/210']
})

