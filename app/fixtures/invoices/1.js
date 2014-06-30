import Ember from 'ember';

export default function(data) {
  Ember.Logger.info(data);
  return this.success({
    invoice: {
      id: "1",
      createDate: new Date(),
      lines: [
        {
          id: "2",
          title: "Do something",
          invoice_id: "1"
        },
        {
          id: "4",
          title: "Do something else",
          invoice_id: "1"
        }
      ],
      client: {
        id: "5",
        first_name: "Bob",
        last_name: "Smith"
      }
    }
  });
}