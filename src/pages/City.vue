<template>
  <div class="city-container">
    <HeadTop :head-title="cityName" :go-back="true" :sign-in-up="false">
      <router-link to="/home" slot="changeCity" class="change-city">
        切换城市
      </router-link>
    </HeadTop>
    <form class="city-form" @submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          placeholder="输入学校、商务楼、地址"
          class="city-input input-style"
          required
          v-model="inputValue" />
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="city-submit input-style"
          @click="postPosition"
          value="提交" />
      </div>
    </form>
    <header v-if="historyTitle" class="position-search-history">
      搜索历史
    </header>
    <ul class="position-ul">
      <li
        v-for="(item, index) in placeList"
        @click="nextPage(index, item.geohash)"
        :key="index">
        <h4 class="position-name ellipsis">{{ item.name }}</h4>
        <p class="position-address ellipsis">{{ item.address }}</p>
      </li>
    </ul>
    <footer
      v-if="historyTitle && placeList.length"
      class="clear-all-history"
      @click="clearAll">
      清空所有
    </footer>
    <div class="search-none-place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
  import HeadTop from "@/components/header/Head";
  import {
    currentCity,
    getLocalStorage,
    removeLocalStorage,
    searchPlace,
    setLocalStorage,
  } from "@/services/pullData";

  export default {
    mounted() {
      this.cityId = this.$route.params.cityId;
      currentCity(this.cityId).then(({ data }) => {
        this.cityName = data.name;
      });

      this.initData();
    },
    data() {
      return {
        cityName: "深圳",
        cityId: "",
        inputValue: "",
        placeList: [],
        placeHistory: [],
        historyTitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false, // 搜索无结果，显示提示信息
      };
    },
    components: {
      HeadTop,
    },
    methods: {
      initData() {
        let placeHistory = getLocalStorage("placeHistory");
        if (placeHistory) {
          this.placeList = JSON.parse(placeHistory);
        } else {
          this.placeList = [];
        }
      },
      // 发送地址信息
      postPosition() {
        if (this.inputValue) {
          searchPlace(this.cityId, this.inputValue).then(({ data }) => {
            this.placeNone = data.length === 0;
            this.placeList = data;
            this.historyTitle = false;
          });
        }
      },
      nextPage(index, geoHash) {
        let history = getLocalStorage("placeHistory");
        let selectedPlace = this.placeList[index];
        if (history) {
          let checkRepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach((item) => {
            if (item.geohash === geoHash) {
              checkRepeat = true;
            }
          });
          if (!checkRepeat) {
            this.placeHistory.push(selectedPlace);
          }
        } else {
          this.placeHistory.push(selectedPlace);
        }
        setLocalStorage("placeHistory", this.placeHistory);
        this.$router.push({ path: "/site", query: { geoHash } });
      },
      clearAll() {
        removeLocalStorage("placeHistory");
        this.initData();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/style/mixin";

  .city-container {
    padding-top: 2.35rem;
  }

  .change-city {
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct;
  }

  .city-form {
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;

    div {
      width: 90%;
      margin: 0 auto;
      text-align: center;

      .input-style {
        border-radius: 0.1rem;
        margin-bottom: 0.4rem;
        @include wh(100%, 1.4rem);
      }

      .city-input {
        border: 1px solid $bc;
        padding: 0 0.3rem;
        @include sc(0.65rem, #333);
      }

      .city-submit {
        background-color: $blue;
        @include sc(0.65rem, #fff);
      }
    }
  }

  .position-search-history {
    border-top: 1px solid $blue;
    border-top: 1px solid $blue;
    padding-left: 0.5rem;
    @include font(0.475rem, 0.8rem);
  }

  .position-ul {
    background-color: #fff;
    border-top: 1px sold $blue;

    li {
      margin: 0 auto;
      padding-top: 0.65rem;
      border-bottom: 1px solid $bc;

      .position-name {
        margin: 0 auto 0.35rem;
        width: 90%;
        @include sc(0.65rem, #333);
      }

      .position-address {
        margin: 0 auto 0.55rem;
        width: 90%;
        @include sc(0.45rem, #999);
      }
    }
  }

  .search-none-place {
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }

  .clear-all-history {
    @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }
</style>
