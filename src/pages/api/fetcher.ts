import { API_URL, API_KEY } from '@/constants/'

interface IFetcher {
  method: string
  url: string
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: any
  redirect?: RequestRedirect
  referrerPolicy?: ReferrerPolicy
  body?: any
  accessToken?: string
}

const fetcher = async ({ method, url, body, accessToken, ...rest }: IFetcher) => {
  const { cache, credentials, headers, redirect, referrerPolicy, mode } = rest
  const response = await fetch(`${API_URL}${url}`, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode, // no-cors, *cors, same-origin
    cache, // *default, no-cache, reload, force-cache, only-if-cached
    credentials: credentials ? credentials : 'include', // include, *same-origin, omit
    headers: headers
      ? headers
      : {
          'x-api-key': API_KEY,
          Authorization: `Bearer ${accessToken || ''}`,
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    redirect, // manual, *follow, error
    referrerPolicy, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  })
  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(JSON.parse(text).message)
    })
  }
  return await response.json() // parses JSON response into native JavaScript objects
}

export { fetcher }
