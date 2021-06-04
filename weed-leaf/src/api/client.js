// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, { body, ...customConfig } = {}) {

    const url = `https://localhost:44303${endpoint}`
    const headers = { 
      'Content-Type': 'application/json'
    }
  
    const config = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    }
  
    if (body) {
      config.body = JSON.stringify(body)
    }
  
    let data
    try {
      const response = await window.fetch(url, config)
      data = await response.json()
      if (response.ok) {
        return data
      }
      throw new Error(response.statusText)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
  }
  
  client.get = function (url, customConfig = {}) {
    let results = client(url, { ...customConfig, method: 'GET' });
    return results;
  }
  
  client.post = function (url, body, customConfig = {}) {
    return client(url, { ...customConfig, body })
  }
  