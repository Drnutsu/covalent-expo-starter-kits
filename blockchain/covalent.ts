import URL from './url'

export const url = (path: string, params?: any) => {
  return URL(process.env.COVALENT_ENDPOINT, path, params)
}
