import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EdEmbeddedRecordsENV.locationType
});

Router.map(function() {
  this.resource('invoice', {path: 'invoices/:id'}, function(){

  });
});

export default Router;
