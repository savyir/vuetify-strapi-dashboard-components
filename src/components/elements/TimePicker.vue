<template>
  <v-menu
    ref="menu"
    v-model="fromDateModel"
    :close-on-content-click="false"
    :return-value.sync="data"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :prepend-inner-icon="innerIcon!==false ? 'event': undefined"
        :prepend-icon="innerIcon==false ? 'event': undefined"
        :label="label"
        :filled="!!filled"
        :outlined="outlined!==undefined"
        dense
        color="primary"
        :value="data"
        class="mx-1"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker @click:minute="$refs.menu.save(data)" format="ampm" color="primary" dark landscape v-model="data"
                   label="انتخاب ساعت"/>
  </v-menu>
</template>
<script>
  export default {
    props: ['value', 'outlined', 'filled', 'label', 'innerIcon', 'type', 'field'],
    data() {
      return {
        fromDateModel: null,
        fromDateMenu: null,
        data: null
      }
    },
    methods: {
      chargeData() {
        this.data = this.value;
      }
    },
    mounted() {
      this.chargeData();
    },
    computed: {},
    watch: {
      data(val) {
        try {
          return this.$emit('input', val)
        } catch (e) {
          console.error({e})
        }
      },
      value(val) {
        this.chargeData();
      }
    }
  }
</script>
