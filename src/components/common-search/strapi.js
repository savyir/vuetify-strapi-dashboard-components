import common from './common.js'

export default {
  ...common,
  head: {
    ...common.head
  },
  data: {
    ...common.data,
    filter: {},
  },
  // alernative
  computed: {
    ...common.getCommonComputed
  },
  mounted() {
    common.getCommonMounted()
  },
  methods: {
    ...common.getMethods,
    loadData() {
      this.loading = true;

      let filters = this.filter || {};
      let search = this.search || {};
      let sort = _.get(this.options, 'sortBy.0', 'id');
      let sortDESC = _.get(this.options, 'sortDesc.0', true) ? 'DESC' : 'ASC';
      let page = _.get(this.options, 'page', this.page);
      let perPage = _.get(this.options, 'itemsPerPage', this.perPage);

      let meta = {
        ...filters,
        ...search
      };

      // check if this path exists
      this.$axios.$get(this.resource + '/count', {params: meta}).then(res => {
        this.length = res;
      });

      // strapi API
      let _sort = sort + ':' + sortDESC;
      meta._sort = _sort;
      if (perPage > 0) {
        meta._limit = perPage
        meta._start = (page - 1) * perPage
      }

      this.$axios.$get(this.resource, {params: meta}).then(res => {
        this.list = res;
        if (this.length < 1 && res.length > 0) {
          this.length = res.length;
        }
      }).catch(error => {
        this.$Helper.showError(error, this.$swal, this.$router);
      }).finally((res) => {
        this.loading = false;
      })
    },
    doFilter(val) {
      setTimeout(() => {
        this.loadData();
      }, 500)
    },
    doSearch(val) {
      this.searchText = val;
      this.search = {};

      if (val) {
        // Strapi API
        _.forEach(this.headers, (field) => {
          if (_.get(field, 'searchable', true)) _.set(this.search, _.get(field, 'value', 'title') + '_contains', val);
        })
      }

      // search after 1 second's
      setTimeout(() => {
        if (this.searchText == val) {
          // this.loadData();
        }
      }, 500)

    },
    update(id, property, val) {
      let data = {};
      data[property] = val;
      return this.$axios.$put(this.resource + '/' + id, data).then(res => {
        this.loadData();
        this.$notifSuccess('با موفقیت بروز شد.')
      }).catch(err => {
        this.$notifError(err)
      })
    },
    toggle(id, val) {
      return this.$strapi.update()
    },
    delete(id, reload = true) {
      this.loading = true;
      return this.$axios.$delete(this.resource + '/' + id).then(res => {
        if (reload) {
          this.loadData();
        }
        return true;
      }).catch(err => {
        this.$Helper.showError(err, this.$swal, this.$router)
        return false;
      }).finally(() => {
        this.loading = false;
      })
    },
  }
}
