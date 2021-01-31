export default {
  computed: {
    getHeaders() {
      let headers = [];
      for (let item of this.fields) {
        if (item.show === undefined || item.show === true) headers.push(item)
      }
      return headers;
    },
    item() {
      return _.get(this, 'value', {});
    },
    back() {
      return this.name ? '/admin/' + this.name : './.'
    }
  },
  methods: {
    canShow(field) {
      //console.log(_.get(field, 'show', undefined) !== false, {field})
      return _.get(field, 'show', undefined) !== false;
    }
  }
}
