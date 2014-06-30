import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    lines: {serialize: 'records', deserialize: 'records'},
    client: {serialize: 'records', deserialize: 'records'}
  }
});