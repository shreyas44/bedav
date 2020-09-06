export function addCommas(num) {
  const number = num.toString().split('').reverse().join('')
  console.log(number)
  let i = 0
  let finalNum = ''

  for (const n of number) {
    console.log(i % 3)
    if (i % 3 === 0 && i != 0) {
      finalNum += ',' + n
    } else {
      finalNum += n
    }

    i++
  }
  
  return finalNum.split('').reverse().join('')
}
