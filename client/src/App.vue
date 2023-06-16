<template>
    <router-view/>
</template>

<script>
import io from "socket.io-client"
import {mapGetters, mapMutations} from "vuex"

export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      socket: null
    }
  },
  computed: mapGetters(["getChosen"]),
  methods: {
    ...mapMutations(["setCourse", "setDate", "refreshCourse", "refreshDate", "setCost",
                     "refreshCost", "setChartData", "refreshChartData", "refreshChart"])
  },
  created (){
    this.socket = io("http://localhost:9999")
  },
  mounted() {
    this.socket.on("course-changed", (courses, date) => {
      this.setCourse(courses);
      this.setDate(date);
      this.setChartData({course: courses, date: date});
      if (this.getChosen) {
        this.setCost(courses.filter(course => course[0] === this.getChosen)[0][1]);
      }
    });

    this.socket.on("end", () => {
      this.refreshCourse();
      this.refreshChartData();
      this.refreshDate();
      this.refreshChart();
      this.refreshCost();
    });
  }
}
</script>

<style scoped>

</style>
