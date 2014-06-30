import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['invoice'],
  itemController: 'invoice/line',
  invoiceModel: Ember.computed.alias('controllers.invoice.model'),
  actions: {
    'new': function() {
      var line = this.store.createRecord('line', {
        invoice: this.get('invoiceModel')
      });
      this.get('content').unshiftObject(line);
    }
  }
});