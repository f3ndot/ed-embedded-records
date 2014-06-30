import DS from 'ember-data';
import startApp from '../helpers/start-app';

var App;

/* global qd */

module('Embedded Records with Ember Data', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    qd.ajax.resetFixtures();
  }
});

/**
 * Ember Data serializes date to ISO8601 date format to test serialized date, you have to use an instance of DS.DateTransform to serialized the date.
 * @see https://github.com/emberjs/data/blob/master/packages/ember-data/lib/transforms/date.js
 */
var dateTransform = DS.DateTransform.create();

test('saving new invoice with several items', function() {
  /**
   When saving a model that has a hasMany relationships with EmbeddedRecordsMixin,
   hasMany relationships are serialized as objects and added to an array under plural property.
   */
  expect(1);
  var store = App.__container__.lookup('store:main');
  var createDate = new Date();
  var invoice;

  qd.ajax.defineFixture('/invoices', fixtureHandler);
  Em.run(createInvoiceWithLines);
  Em.run(invoice, invoice.save);

  function createInvoiceWithLines(){
    invoice = store.createRecord('invoice', {createDate: createDate});
    invoice.get('lines').then(function(){
      invoice.get('lines').pushObjects([
        store.createRecord('line', {title: 'line1', invoice: invoice}),
        store.createRecord('line', {title: 'line2', invoice: invoice})
      ]);
    });
  }

  function fixtureHandler(data, request){
    deepEqual(data, {
      invoice: {
        create_date: dateTransform.serialize(createDate),
        client_id: null,
        lines: [{
          invoice_id: null,
          title: 'line1'
        }, {
          invoice_id: null,
          title: 'line2'
        }]
      }
    });
    return this.success({
      invoice: {
        id: 1,
        create_date: dateTransform.serialize(createDate),
        client_id: null,
        lines: [
          {id: 1, title: 'line1'},
          {id: 2, title: 'line2'}
        ]
      }
    });
  }
});

asyncTest('loading response from the server', function(){
  expect(1);
  var store = App.__container__.lookup('store:main');
  var date = new Date();

  qd.ajax.defineFixture('/invoices/1', function(data){
    return this.success({
      invoice: {
        id: 4,
        createDate: dateTransform.serialize(date),
        lines: [
          {id: 3, title: 'Did some work.', invoice_id: 4},
          {id: 5, title: 'Did some other work.', invoice_id: 4}
        ]
      }
    });
  });

  store.find('invoice', 1)
    .then(function(model){
      return model.get('lines').then(function(){
        equal(model.get('lines.length'), 2);
      });
    }, function(reason){
      Em.Logger.error(reason);
      ok(false);
    })
    .finally(function(){
      start();
    });

});