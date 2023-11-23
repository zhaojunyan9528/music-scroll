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
  ul: document.querySelector('ul')
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
  for (let index = 0; index < lrcData.length; index++) {
    const lrc = lrcData[index];
    let li = document.createElement('li')
    li.textContent =  lrc.words
    doms.ul.appendChild(li)
  }
}
createLrcElements()