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
    lrcArr.push({time, words})
  })
  console.log(lrcArr)
  return lrcArr
}
// '00:49.754'
function parseTime(str) {
  let [minute, second] = str.split(':')
  return Number(minute) * 60 + Number(second)
}
parseLrc()