const axios = require('axios')
const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`

const checkAvailability = async (req, res, next) => {
  const body = req.body

  const message = `
    *Уточнення повтору*
    *Номер телефону*: ${body.phone}
    *Товар*: [тут](${body.link})
  `

  const { ok } = await axios.post(url, {
    parse_mode: 'MarkdownV2',
    chat_id: process.env.CHAT_ID,
    text: message,
  })

  return res.json({ done: ok })
}

const newOrder = async (req, res, next) => {
  const order = req.body

  let total = 0
  const productsString = order.products.map((product, index) => {
    if (product.discount > 0) {
      total += product.discount
    } else {
      total += product.price
    }
    const modifiedIndex = index + 1
    const price = product.discount > 0 ? product.discount + ' \\\(акційна\\\)' : product.price
    return `${modifiedIndex}\\\. ${product.name}, ${price} грн, [посилання](https://ekomom.com/shop/product/${product.id})`
  })
  
  const message = `
    *Нове замовлення*
    *Клієнт*: ${order.name}, ${order.phone}
    *Товари*: ${productsString}
    *Загальна сума*: ${total} грн
  `

  const { ok } = await axios.post(url, {
    parse_mode: 'MarkdownV2',
    chat_id: process.env.CHAT_ID,
    text: message,
  })

  return res.json({ done: ok })
}

module.exports = {
  newOrder,
  checkAvailability,
}