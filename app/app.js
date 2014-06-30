import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'ed-embedded-records', // TODO: loaded via config
  Resolver: Resolver
});

/* global qd */
qd.ajax.loadFixtures('ed-embedded-records/fixtures', '/');

loadInitializers(App, 'ed-embedded-records');

export default App;
