import Route from '@ember/routing/route';
import { PER_PAGE } from '../controllers/meetings';
import RSVP from 'rsvp';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true,
    },
    speaker: {
      refreshModel: true,
    },
    book: {
      refreshModel: true,
    },
    searchDate: {
      refreshModel: true,
    }
  },

  model({ page, speaker, book, searchDate }) {
    const query = {
      _page: page,
      _limit: PER_PAGE,
    };

    if (speaker) {
      query.speaker = speaker;
    }

    if (book) {
      query.book = book;
    }

    if (searchDate) {
      query.searchDate = searchDate;
    }
    return this.get('store').findAll('meeting');
    /*return RSVP.hash({
      speakers: this.get('store').findAll('speaker'),
      books: this.get('store').findAll('book'),
      meetings: this.get('store').query('meeting', query),
      reports: this.get('store').findAll('report'),  
  });*/
  },

  setupController() {
    this._super(...arguments);
  },

  actions: {
    loading() {
      return true;
    },
  },
});