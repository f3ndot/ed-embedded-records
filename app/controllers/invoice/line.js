import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    update: function() {
      this.set('isEditing', false);
    }
  },
  makeEditable: function() {
    if (this.get('content.isNew')) {
      this.set('isEditing', true);
    }
  }.on('init')
});