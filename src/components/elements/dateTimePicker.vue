<template>
  <v-row>
    <v-col v-if="!outlined" cols="12">
      <label>{{label}}</label>
    </v-col>
    <v-col sm="6">
      <date-picker :outlined="true" v-model="date"
                   label="انتخاب روز"/>
    </v-col>
    <v-col sm="6">
      <time-picker :outlined="true" v-model="time" label="انتخاب ساعت"/>
    </v-col>
  </v-row>
</template>
<script>
  import DatePicker from "./DatePicker";
  import TimePicker from "./TimePicker";

  export default {
    components: {TimePicker, DatePicker},
    props: ['value', 'label', 'outlined'],
    data() {
      return {
        date: null,
        time: null
      }
    },
    computed: {
      datetime() {
        if (this.date && this.time) {
          return this.$Helper.combineDateTime(this.date, this.time);
        } else if (this.date) {
          return this.date;
        } else if (this.time) {
          return this.time;
        }
      }
    },
    mounted() {
      this.chargeDateTime();
    },
    methods: {
      chargeDateTime() {
        let val = this.value;
        if (!val) return;
        let time = this.$Helper.getTime(val);
        this.time = time;
        this.date = val;
      }
    },
    watch: {
      value(val) {
        this.chargeDateTime()
      },
      datetime(val) {
        return this.$emit('input', val)
      }
    }
  }
</script>
