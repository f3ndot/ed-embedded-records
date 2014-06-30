import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(){
  return new Ember.Handlebars.SafeString('<small style="font-size: 16px">(isDirty: <strong>%@</strong>, isNew: <strong>%@</strong>)</small>'.fmt(this.get('isDirty'), this.get('isNew')));
});