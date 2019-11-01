// Based on https://github.com/DevExpress/DevExtreme.AspNet.Data/blob/experiment/ng-http-client/experiments/ng-http-client-helper.js

import { Deferred } from 'devextreme/core/utils/deferred';
import { HttpClient, HttpParams } from '@angular/common/http';

export function sendRequestFactory(httpClient: HttpClient) {
  let nonce = Date.now();

  function createXhrSurrogate(response) {
    function getResponseHeader(name) {
      return response.headers.get(name);
    }

    function makeResponseText() {
      const body = 'error' in response ? response.error : response.body;

      if (typeof body !== 'string' || String(getResponseHeader('Content-Type')).indexOf('application/json') === 0) {
          return JSON.stringify(body);
      }

      return body;
    }

    return {
      status: response.status,
      statusText: response.statusText,
      getResponseHeader,
      responseText: makeResponseText()
    };
  }

  return (options) => {
    const d = Deferred();

    const method = (options.method || 'get').toLowerCase();
    const data = options.data;
    const xhrFields = options.xhrFields;

    if (options.cache === false && method === 'get' && data) {
      data._ = nonce++;
    }

    httpClient
      .request(
        method,
        options.url,
        {
          params: data,
          responseType: options.dataType,
          headers: options.headers,
          withCredentials: xhrFields && xhrFields.withCredentials,
          observe: 'response'
        }
      )
      .subscribe(
        (response) => d.resolve(response.body, 'success', createXhrSurrogate(response)),
        (response) => d.reject(createXhrSurrogate(response), 'error')
      );

    return d.promise();
  };
}
