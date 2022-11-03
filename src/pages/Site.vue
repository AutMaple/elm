<template xmlns="http://www.w3.org/1999/html">
  <div>
    <HeadTop :sign-in-up="false">
      <router-link to="/search/geohash" class="link-search" slot="search">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1">
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="rgb(255,255,255)"
            stroke-width="1"
            fill="none" />
          <line
            x1="14"
            y1="14"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2" />
        </svg>
      </router-link>
      <router-link to="/home" slot="siteTitle" class="site-title">
        <span class="title-text ellipsis">{{ siteTitle }}</span>
      </router-link>
    </HeadTop>
    <nav class="site-nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food-type-container"
            v-for="(item, index) in foodTypes"
            :key="index">
            <router-link
              :to="{
                path: '/food',
                query: {
                  geohash,
                  title: foodItem.title,
                  restaurant_category_id: getCategoryId(foodItem.link),
                },
              }"
              v-for="foodItem in item"
              :key="foodItem.id"
              class="link-to-food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" />
                <figcaption>{{ foodItem.title }}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img
        src="../assets/images/fl.svg"
        class="fl-back animation-opacity"
        v-else
        alt="这是一张图片" />
    </nav>
    <div class="shop-list-container">
      <header class="shop-header">
        <svg class="shop-icon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#shop"></use>
        </svg>
        <span class="shop-header-title">附近商家</span>
      </header>
      <ShopList v-if="hasGetData" :geohash="geohash"></ShopList>
    </div>
    <FootGuide></FootGuide>
  </div>
</template>

<script>
  import HeadTop from "@/components/header/Head";
  import ShopList from "@/components/common/ShopList";
  import FootGuide from "@/components/footer/FootGuide";
  import "@/style/swiper.min.css";
  import "@/plugins/swiper.min.js";
  import { cityGuess, siteAddress, siteFoodTypes } from "@/services/pullData";

  export default {
    components: {
      HeadTop,
      ShopList,
      FootGuide,
    },
    data() {
      return {
        siteTitle: "", // site 网站的标题
        geohash: "", // city 页面传递过来的 geohash
        foodTypes: [], // 食品分类列表
        hasGetData: false, // 是否已经获取到地理位置数据，成功之后在获取商铺列表信息
        imgBaseUrl: "https://fuss10.elemecdn.com", // 图片域名地址
      };
    },
    async beforeMount() {
      if (!this.$route.query.geohash) {
        await cityGuess().then(({ data }) => {
          this.geohash = data.latitude + "," + data.longitude;
        });
      } else {
        this.geohash = this.$route.query.geohash;
      }
      this.saveGeohash(this.geohash);
      // 获取位置信息
      await siteAddress(this.geohash).then(({ data }) => {
        this.siteTitle = data.name;
        this.recordAddress(data);
      });
      this.hasGetData = true;
    },
    methods: {
      saveGeohash(geohash) {
        this.$store.commit("saveGeohash", geohash);
      },
      recordAddress(address) {
        this.$store.commit("recordAddress", address);
      },
      /**
       * 解码 url 地址，获取 url 中 restaurant_category_id 参数的值
       */
      getCategoryId(url) {
        let urlData = decodeURIComponent(
          url.split("=")[1].replace("&target_name", ""),
        );
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id;
        } else {
          return "";
        }
      },
    },
    mounted() {
      // 获取导航食品类型列表
      siteFoodTypes(this.geohash)
        .then(({ data }) => {
          let length = data.length;
          let resArr = [...data];
          let foodArr = [];
          for (let i = 0, j = 0; i < length; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8);
          }
          this.foodTypes = foodArr;
        })
        .then(() => {
          new Swiper(".swiper-container", {
            pagination: ".swiper-pagination",
            loop: true,
          });
        });
    },
  };
</script>

<style scoped lang="scss">
  @import "@/style/mixin.scss";

  .link-search {
    left: 0.8rem;
    @include wh(0.9rem, 0.9rem);
    @include ct;
  }

  .site-title {
    @include center;
    width: 50%;
    color: white;
    text-align: center;
    margin-left: -0.5rem;
  }

  .title-text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }

  .site-nav {
    padding-top: 2.1rem;
    background-color: white;
    border-bottom: 0.025rem solid $bc;
    height: 10.6rem;

    .swiper-container {
      @include wh(100%, auto);
      padding-bottom: 0.6rem;

      .swiper-pagination {
        bottom: 0.2rem;
      }
    }

    .fl-bottom {
      @include wh(100%, 100%);
    }
  }

  .food-type-container {
    display: flex;
    flex-wrap: wrap;

    .link-to-food {
      width: 25%;
      padding: 0.3rem 0;
      @include fj(center);

      figure {
        img {
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }

        figcaption {
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }

  .shop-list-container {
    margin-top: 0.4rem;
    border-top: 0.025rem solid $bc;
    background-color: #fff;

    .shop-header {
      .shop-icon {
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;
        @include wh(0.6rem, 0.6rem);
      }

      .shop-header-title {
        color: #999;
        @include font(0.55rem, 1.6rem);
      }
    }
  }
</style>
