import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  dataService: service('data'),

  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onSubmit({
        id: this.get('idSpeaker'),
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        img: this.get('img'),
      });
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    
    this.setProperties({
      idSpeaker: this.get('speaker.id') ? this.get('speaker.id') : undefined,
      firstName: this.get('speaker.firstName'),
      lastName: this.get('speaker.lastName'),
      img: this.get('speaker.img'),
    })
  }
});
