<template>
  <div>
    <HeadTop :sign-in-up="true">
      <span slot="logo" class="head-logo" @click="reload">ele.me</span>
    </HeadTop>
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityId" class="guess-city">
        <span>{{ guessCity }}</span>
        <svg class="arrow-right">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
    <section id="hot-city-container">
      <h4 class="city-title">热门城市</h4>
      <ul class="city-list-ul clear">
        <router-link
          tag="li"
          v-for="item in hotCity"
          :to="'/city/' + item.id"
          :key="item.id">
          {{ item.name }}
        </router-link>
      </ul>
    </section>
    <section class="group-city-container">
      <ul class="letter-classify">
        <li
          v-for="(value, key, index) in sortedGroupCity"
          :key="key"
          class="letter-classify-li">
          <h4 class="city-title">
            {{ key }}
            <span v-if="index === 0">(按字母排序)</span>
          </h4>
          <ul class="group-city-name-container city-list-ul clear">
            <router-link
              tag="li"
              v-for="item in value"
              :to="'/city/' + item.id"
              :key="item.id"
              class="ellipsis">
              {{ item.name }}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import HeadTop from "@/components/header/Head";
  import { cityGuess, groupCity, hotCity } from "@/services/pullData";

  export default {
    components: {
      HeadTop,
    },
    data() {
      return {
        guessCity: "",
        guessCityId: "",
        hotCity: [],
        groupCity: {},
      };
    },
    computed: {
      sortedGroupCity() {
        let sortObj = {};
        for (let i = 65; i <= 90; i++) {
          if (this.groupCity[String.fromCharCode(i)]) {
            sortObj[String.fromCharCode(i)] =
              this.groupCity[String.fromCharCode(i)];
          }
        }
        return sortObj;
      },
    },
    methods: {
      // 点击图标刷新页面
      reload() {
        window.location.reload();
      },
    },
    mounted() {
      cityGuess().then(({ data }) => {
        this.guessCity = data.name;
        this.guessCityId = data.id;
      });
      hotCity().then(({ data }) => {
        this.hotCity = data;
      });

      groupCity().then(({ data }) => {
        this.groupCity = data;
      });
    },
  };
</script>

<style lang="scss" scoped>
  @import "../style/mixin.scss";

  .head-logo {
    left: 0.4rem;
    font-weight: 400;
    @include sc(0.7rem, #fff);
    @include wh(2.3rem, 0.7rem);
    @include ct;
  }

  .city-nav {
    padding-top: 2.35em;
    border-top: 1px solid $bc;
    background-color: #fff;
    margin-bottom: 0.4rem;

    .city-tip {
      @include fj;
      line-height: 1.45rem;
      padding: 0 0.45rem;

      span:nth-of-type(1) {
        @include sc(0.55rem, #666);
      }

      span:nth-of-type(2) {
        font-weight: 900;
        @include sc(0.475rem, #9f9f9f);
      }
    }

    .guess-city {
      @include fj;
      align-items: center;
      height: 1.8rem;
      padding: 0 0.45rem;
      border-top: 1px solid $bc;
      border-bottom: 2px solid $bc;
      @include font(0.75rem, 1.8rem);

      span:nth-of-type(1) {
        color: $blue;
      }

      .arrow-right {
        @include wh(0.6rem, 0.6rem);
        fill: #999;
      }
    }
  }

  #hot_city_container {
    background-color: #fff;
    margin-bottom: 0.4rem;
  }

  .city-list-ul {
    li {
      float: left;
      text-align: center;
      color: $blue;
      border-bottom: 0.025rem solid $bc;
      border-right: 0.025rem solid $bc;
      @include wh(25%, 1.75rem);
      @include font(0.6rem, 1.75rem);
    }

    li:nth-of-type(4n) {
      border-right: none;
    }
  }

  .city-title {
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
    @include font(0.55rem, 1.45rem, "Helvetica Neue");

    span {
      @include sc(0.475rem, #999);
    }
  }

  .letter-classify-li {
    margin-bottom: 0.4rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;

    .group-city-name-container {
      li {
        color: #666;
      }
    }
  }
</style>
