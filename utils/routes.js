const axios = require('axios')

module.exports = async function getRoutes() {
  const { data: routes } = await axios.get(`${process.env.BASE_URL}/api/seo`)
  return routes
}