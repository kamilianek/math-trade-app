export function MathtradeApiError(errorJson) {
  Error.call(this);
  this.statusCode = errorJson.status;
  this.name = errorJson.error;
  this.message = errorJson.message;
}
MathtradeApiError.prototype = Error.prototype;

export function handleResponse(response, expectedStatusCode, description) {
  if (expectedStatusCode === response.status) {
    if (response.status === 204) {
      return Promise.resolve();
    }
    return response.json();
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') >= 0) {
    return response.json().then((errorJson) => {
      throw new MathtradeApiError(errorJson);
    });
  }

  throw new Error(`${description} failed with status code ${response.status}.`);
}

export default {
  handleResponse,
};
