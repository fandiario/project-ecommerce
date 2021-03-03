function moneyConverter (num) {
let result ="Rp. "

let millions = Math.floor (num / 1000000)
let hundredThousands = Math.floor (num % 1000000 / 100000)
let tenThousands = Math.floor (num % 1000000 % 100000 / 10000)
let thousands = Math.floor (num % 1000000 % 100000 % 10000 / 1000)
let hundreds =  Math.floor (num % 1000000 % 100000 % 10000 % 1000 / 100)
let tens =  Math.floor (num % 1000000 % 100000 % 10000 % 1000 % 100 / 10)
let singles =  Math.floor (num % 1000000 % 100000 % 10000 % 1000 % 100 % 10)

result += `${millions}.${hundredThousands}${tenThousands}${thousands}.${hundreds}${tens}${singles}`

return result
}

console.log (moneyConverter (5000000))
console.log (moneyConverter (25510000))