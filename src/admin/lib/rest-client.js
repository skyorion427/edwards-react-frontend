import { queryParameters, fetchJson } from 'admin-on-rest/lib/util/fetch';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'admin-on-rest/lib/rest/types';

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('admin-token')
    options.headers.set('x-access-token', token);
    switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        count: perPage,
        page: page - 1,
        sort: `${ (order === 'DESC' ? '-' : '') }${ field }`
      };
      url = `${apiUrl}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case GET_MANY: {
      const query = {
      };
      url = `${apiUrl}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        count: perPage,
        page: page - 1,
        sort: `${ (order === 'DESC' ? '-' : '') }${ field }`
      };
      url = `${apiUrl}/${resource}?${queryParameters(query)}`;
      break;
    }
    case UPDATE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      if (params.data instanceof FormData) {
        options.body = params.data;
      }
      else {
        options.body = JSON.stringify(params.data);
      }
      break;
    case DELETE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
    case GET_LIST:
      if (!headers.has('content-range')) {
        throw new Error('The Content-Range header is missing in the HTTP Response. The simple REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?');
      }
      return {
        data: json.map(x => x),
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      };
    case CREATE:
      return { data: Object.assign({}, params.data, { id: json.id }) };
    default:
      return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. 'posts'
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options)
      .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };
};
