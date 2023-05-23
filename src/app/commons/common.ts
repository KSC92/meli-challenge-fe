export const reformat_price = (price: Number) => {
  let [fromInt, decimals] = price.toString().split(".")
  let realprice = fromInt.toString().split("").reverse()
  let counter = 0
  realprice = realprice.map((n) => {
    if (counter == 3) {
      n = n + ","
      counter = 0
    }
    counter++
    return n
  })
  return realprice.reverse().join("") + (decimals ? "." + decimals : "")
}
