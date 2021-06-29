// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper


export async function client(endpoint, rejectWithValue, { body, ...customConfig } = {}) {
    const url = `https://localhost:44303${endpoint}`
    const headers = { }

    let formData;
    if (body) {
      if(body instanceof FormData){
        formData = body
      }else{
        headers['Content-Type'] = 'application/json'
        formData = JSON.stringify(body)
      }
    }
    
    const config = {
      method: formData ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
      body: formData
    }
  
    let data
    try {
      const response = await window.fetch(url, config)
      data = await response.json()
      if (response.ok) {
        return data
      }
      return rejectWithValue(data);

    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
  }
  
  client.get = function (url, rejectWithValue = () => {}, customConfig = {}) {
    let results = client(url, rejectWithValue, { ...customConfig, method: 'GET' });
    return results;
  }
  
  client.post = async function (url, rejectWithValue = () => {}, body, customConfig = {}) {
    return client(url, rejectWithValue, { ...customConfig, body })
  }
  