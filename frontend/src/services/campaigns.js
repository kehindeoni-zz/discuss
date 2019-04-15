import fetchApi from './api'

export default {
  list: () => {
    return fetchApi.get('campaigns')
  },
  read: (campaignId) => {
    return fetchApi.get(`campaigns/${campaignId}`)
  }
} 
