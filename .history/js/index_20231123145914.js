// console.log(lrc)

/**
 * 解析歌词对象
 * 得到歌词数组
 * 每个歌词对象： {time: 开始时间, words: 歌词内容}
 * @returns 歌词数组
 */
function parseLrc() {
  let lines = lrc.split('\n')
  let lrcArr = []
  lines.forEach(line => {
    let [time, words] = line.slice(1).split(']')
    lrcArr.push({time: parseTime(time), words})
  })
  return lrcArr
}
// '00:49.754'
function parseTime(str) {
  let [minute, second] = str.split(':')
  return (Number(minute) * 60 + Number(second)).toFixed(3)
}

let doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('ul'),
  container: document.querySelector('.container')
}
// 获取歌词数据
let lrcData = parseLrc()

// 歌词高亮显示的下标，哪一行
function findIndex() {
  // 播放器当前时间
  let curTime = doms.audio.currentTime
  for (let index = 0; index < lrcData.length; index++) {
    const lrc = lrcData[index];
    if (curTime < lrc.time) {
      return index - 1
    }
  }
  return lrcData.length - 1
}

function createLrcElements() {
  let fragment = document.createDocumentFragment()
  for (let index = 0; index < lrcData.length; index++) {
    const lrc = lrcData[index];
    let li = document.createElement('li')
    li.textContent =  lrc.words
    fragment.appendChild(li)
  }
  doms.ul.appendChild(fragment)
}
createLrcElements()

let containerHeight = doms.container.clientHeight
let liHeight = doms.ul.children[0].clientHeight
let maxHeight = doms.ul.clientHeight - containerHeight

// 设置歌词偏移量
function setOffset() {
  let index = findIndex()
  console.log(index)
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2
  let result = offset < 0 ? 0 : offset > maxHeight ? maxHeight : offset
  doms.ul.style.transform = `translateY(-${result}px)`

  let li = document.querySelector('.active')
  if (li) {
    li.classList.remove('active')
  }
  li = doms.ul.children[index]
  if (li) {
    li.classList.add('active')
  }
}
doms.audio.addEventListener('timeupdate', function() {
  setOffset()
})