import qs from 'qs'

export default function url(url, path, params) {
  let queryParams = qs.stringify(params)
  return `${url}${path || ''}?${queryParams}`
}
