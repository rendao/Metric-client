<template>
  <div class="page-home-wrap mt-4">
    <!-- tests list -->
    <b-container class="home-test-wrap">
      <b-card-group deck>
        <b-card v-for="(test, i) in tests" :key="i" :img-src="test.image" img-top class="shadow-sm">
          
            <b-card-title>{{test.name}}</b-card-title>
            <b-card-text>
              {{ test.short_description }}
            </b-card-text>
          
          <template #footer>
            <div class="d-flex align-items-center">
              <small class="text-muted flex-grow-1">
                <b-icon icon="card-checklist"></b-icon> {{test.total}} 
                <b-icon icon="clock"></b-icon> {{test.duration}}s
              </small>
              <b-button href="#" size="sm" pill variant="outline-secondary" class="px-4">Start</b-button>
            </div>
          </template>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { category } from "@/api/home";
// @ is an alias to /src

export default {
  name: "category",
  components: {},
  data() {
    return {
      categories: [],
      tests: [],
    };
  },
  filters: {
    formatImage(uri) {
      return Window.MeConfig.API_URL + uri;
    },
  },
  created() {
    // this.id = this.$route.params.id;
    console.log(this.$route)
    this.getTests();
  },
  mounted() {},
  methods: {
    getTests() {
      let params = {
        id: this.id
      }
      category(params).then((resonse) => {
        console.log(resonse);
        let { data } = resonse;
        this.tests = data;
      });
    },
  },
};
</script>
