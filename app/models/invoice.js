import DS from 'ember-data';

export default DS.Model.extend({
  createDate: DS.attr('date'),
  lines: DS.hasMany('line', {async: true, dependent: true}),
  client: DS.belongsTo('client', {async: true, dependent: true})
});