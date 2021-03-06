import DS from 'ember-data';
import ENV from 'club-book/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.backendURL,

  init() {
    this._super(...arguments);
    this.set('headers', {
      'Content-Type': 'application/json',
    });
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    let url = this._super(...arguments);

    if (modelName === 'speaker' && requestType === 'findRecord' && id) {
      url += '?_embed=books';
    }
    if (modelName === 'book' && requestType === 'findRecord' && id) {
      url += '?_embed=reviews';
    }
    return url;
  },
  
  handleResponse(status, headers, payload) {
    const meta = {
      total: headers['x-total-count'],
    };
    payload.meta = meta;
    return this._super(status, headers, payload);
  },
});
