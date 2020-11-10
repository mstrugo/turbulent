const DEFAULT_METHOD = 'GET';
const DEFAULT_CONTENT_TYPE = 'application/json; charset=UTF-8';

export const apiCall = async (content: any, url: string, method = DEFAULT_METHOD, TYPE = DEFAULT_CONTENT_TYPE) => {
  return await fetch(url, {
    method,
    body: JSON.stringify({ content }),
    headers: {
      'Content-type': TYPE,
    },
  })
    .then(response => response.json())
    .then(json => json);
};
