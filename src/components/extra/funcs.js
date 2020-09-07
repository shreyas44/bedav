export function addCommas(num) {
  if (num == "N.A.") {
    return num
  }

  const number = num.toString().split('').reverse().join('')
  let i = 0
  let finalNum = ''

  for (const n of number) {
    if (i % 3 === 0 && i != 0) {
      finalNum += ',' + n
    } else {
      finalNum += n
    }

    i++
  }
  
  return finalNum.split('').reverse().join('')
}

export function getFormattedTimestamp(time) {
  const getTime = obj => {
    const minutes = obj.getMinutes()
    let hours = obj.getHours()
    let ap = hours < 12 ? "AM" : "PM"

    if(hours > 12) {
      hours -= 12
    } else if (hours == 0) {
      hours = 12
    }

    return `${hours}:${minutes.toString().length == 1 ? "0" + minutes.toString() : minutes} ${ap}`
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const timestamp = new Date(time * 1000)
  const date = timestamp.getDate()
  const month = months[timestamp.getMonth()]
  const stamp = getTime(timestamp)
  
  return `${date} ${month}, ${stamp}`
}
