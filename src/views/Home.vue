<template>
  <div class="page-home-wrap">
    <!-- header -->
    <div class="home-header"></div>
    <!-- categories list -->
    <div class="home-categories">
      <span v-for="(c, i) in categories" :key="i">
        {{ c.name }}
      </span>
    </div>
    <!-- tests list -->
    <div class="home-tests-wrap">
      <el-row :gutter="10">
      <el-col :span="8" v-for="(test, i) in tests" :key="i">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="test.image|formatImage" class="image">
          <div style="padding: 14px;">
            <span>{{test.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ test.total }}</time>
              <el-button type="text" class="button">Test</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import { categories, home } from "@/api/home";
// @ is an alias to /src

export default {
  name: "home",
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
    }
  },
  created() {
    this.getCategories();
    this.getHome();
  },
  mounted() {},
  methods: {
    getHome() {
      home().then((resonse) => {
        console.log(resonse);
        let { data } = resonse;
        this.tests = data;
      });
    },
    getCategories() {
      categories().then((resonse) => {
        console.log(resonse);
        let { data } = resonse;
        this.categories = data;
      });
    },
  },
};
</script>
