const axios = require('axios')

const basicAddress = `https://api.novaposhta.ua/v2.0/json/`
const buildQuery = (params) => {
  return {
    apiKey: process.env.NOVA_POSHTA_KEY,
    modelName: params.model,
    calledMethod: params.method,
    methodProperties: { ...params.props },
  }
}

const searchCities = async (req, res, next) => {
  const { city } = req.body

  const params = buildQuery({ 
    model: 'Address',
    method: 'searchSettlements',
    props: {
      'CityName': city,
      'Limit': 5,
    }
  })

  const response = await axios.post(basicAddress, { ...params })
  return res.json({
    cities: response.data.data[0].Addresses
  })
}

const searchWarehouse = async (req, res, next) => {
  const { city } = req.body
  const params = buildQuery({
    model: 'AddressGeneral',
    method: 'getWarehouses',
    props: {
      'CityName': city,
    }
  })

  const response = await axios.post(basicAddress, { ...params })
  return res.json({
    warehouses: response.data.data
  })
}

module.exports = {
  searchWarehouse,
  searchCities,
}