<template>
  <v-list>
    <v-list-item>
      <v-text-field v-model="search" outlined append-icon="search" dense clearable
                    placeholder="جست و جو"></v-text-field>
    </v-list-item>
    <template v-if="!showLoader" v-for="(menuItem, i) in getItems" :to="menuItem.link">
      <v-list-item v-if="!_.has(menuItem,'items[0]') " :to="menuItem.link">
        <v-list-item-icon class="mx-1">
          <v-icon color="primary" size="15">{{ menuItem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title color="accent"><b class="font-13">{{ menuItem.title }}</b></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group v-else>
        <template v-slot:activator>
          <v-list-item-icon class="mx-1">
            <v-icon color="primary" size="15">{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title color="accent"><b class="font-13">{{ menuItem.title }}</b></v-list-item-title>
        </template>
        <template v-for="(item, i) in menuItem.items">
          <v-list-item
            :to="_.get(item,'link','')"
            router
            class="mr-1"
            exact
          >
            <v-list-item-icon v-show="false">
              <v-icon class="font-18 mx-0" color="primary">{{_.get(item,'icon','')}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-12 mr-5" v-text="_.get(item,'title','')"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>
    </template>
    <v-skeleton-loader
      v-else
      :loading="showLoader"
      height="30"
      type="list-item"
    ></v-skeleton-loader>
  </v-list>
</template>
<script>
  export default {
    props: ['data', 'value', 'label', 'items'],
    data() {
      return {
        search: '',
        searchItems: [],
      }
    },
    watch: {
      search(search) {
        let items = (this.items);
        console.log({items});
        this.searchItems = [];
        _.forEach(items, (obj) => {
            let menuTitle = _.get(obj, 'title', '');
            let hasPhrase = menuTitle.search(search) > -1;
            if (hasPhrase) {
              this.searchItems.push(obj);
            } else {
              if (_.has(obj, 'items')) {
                _.forEach(obj.items, (subObj) => {
                  let menuTitle = _.get(subObj, 'title', '');
                  let hasPhrase = menuTitle.search(search) > -1;
                  if (hasPhrase) {
                    this.searchItems.push(subObj);
                  }
                })
              }
            }
          }
        );
      }
    },
    methods: {
      goto(path) {
        return this.$router.push(path)
      },
    },
    computed: {
      showLoader() {
        return this.$store.state.navigation.loading;
      },
      getItems() {
        let search = this.search || null;
        let items = this.items;
        if (search && search.length > 0) {
          return this.searchItems;
        } else {
          return items;
        }
      }
    }
  }
</script>
