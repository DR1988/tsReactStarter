
export default (url, opts = {}, token = null) => {
  const headers = new Headers((opts && opts.headers) || {})
  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }
  return fetch(`${url}`, {
    ...opts,
    headers,
  })
  .then((response) => {
    if (response.status >= 200 && response.status < 400) {
      return response.json()
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
}
