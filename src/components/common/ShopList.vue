<template>
  <div class="shop-list-container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
      <router-link
        :to="{ path: 'shop', query: { geohash, id: item.id } }"
        v-for="item in shopListArr"
        tag="li"
        :key="item.id"
        class="shop-li">
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop-image" />
        </section>
        <hgroup class="shop-right">
          <header class="shop-detail-header">
            <h4
              :class="item.is_premium ? 'premium' : ''"
              class="shop-title ellipsis">
              {{ item.name }}
            </h4>
            <ul class="shop-detail-ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">
                {{ item.icon_name }}
              </li>
            </ul>
          </header>
          <h5 class="rating-order-num">
            <section class="rating-order-num-left">
              <section class="rating-section">
                <RatingStar :rating="item.rating"></RatingStar>
                <span class="rating-num">{{ item.rating }}</span>
              </section>
              <section class="order-section">
                月售 {{ item.recent_order_num }} 单
              </section>
            </section>
            <section class="rating-order-num-right">
              <span
                class="delivery-style delivery-left"
                v-if="item.delivery_mode">
                {{ item.delivery_mode.text }}
              </span>
              <span
                class="delivery-style delivery-right"
                v-if="zhunshi(item.supports)">
                准时达
              </span>
            </section>
          </h5>
          <h5 class="fee-distance">
            <p class="fee">
              ¥{{ item.float_minimum_order_amount }}起送
              <span class="segmentation">/</span>
              {{ item.piecewise_agent_fee.tips }}
            </p>
            <p class="distance-time">
              <span v-if="Number(item.distance)">
                {{
                  item.distance > 1000
                    ? (item.distance / 1000).toFixed(2) + "km"
                    : item.distance + "m"
                }}
                <span class="segmentation">/</span>
              </span>
              <span v-else>{{ item.distance }}</span>
              <span class="segmentation">/</span>
              <span class="order-time">{{ item.order_lead_time }}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul class="animation-opacity" v-else>
      <li class="list-back-li" v-for="item in 10" :key="item">
        <img
          src="../../assets/images/shopback.svg"
          alt=""
          class="list-back-svg" />
      </li>
    </ul>
    <p class="empty-data" v-if="touchend">没有更多了</p>
    <aside class="return-top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#backtop"></use>
      </svg>
    </aside>
    <div ref="abc" style="background-color: red"></div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<script>
  import RatingStar from "@/components/common/RatingStar";
  import Loading from "@/components/common/Loading";
  import { getImgPath, loadMore } from "@/components/common/mixin";
  import { shopList } from "@/services/pullData";
  import { animate, showBack } from "@/config/mUtils";

  export default {
    components: {
      RatingStar,
      Loading,
    },
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载 20 个， limit = 20
        shopListArr: [], // 店铺列表数据
        preventRepeatRequest: false, // 达到底部加载数据，防止重复加载
        showBackStatus: false, // 显示返回顶部按钮
        showLoading: true, // 显示加载动画
        touchend: false, // 没有更多数据
        imgBaseUrl: "https://elm.cangdu.org/img/",
      };
    },
    mounted() {
      this.initData();
    },
    props: [
      "restaurantCategoryId",
      "restaurantCategoryIds",
      "sortByType",
      "deliveryMode",
      "supportIds",
      "confirmSelect",
      "geohash",
    ],
    methods: {
      async initData() {
        await shopList(
          this.latitude,
          this.longitude,
          this.offset,
          this.restaurantCategoryId,
        ).then(({ data }) => {
          this.shopListArr = [...data];
          if (data.length < 20) {
            this.touchend = true;
          }
          this.hideLoading();
          // 开始监听 scrollTop 的值，达到一定程度后显示返回顶部按钮
          showBack((status) => {
            this.showBackStatus = status;
          });
        });
      },
      // 到达底部加载更多数据
      async loaderMore() {
        if (this.touchend || this.preventRepeatRequest) {
          return;
        }
        this.showLoading = true;
        this.preventRepeatRequest = true;

        // 数据的定位加 20；
        this.offset += 20;
        await shopList(
          this.latitude,
          this.longitude,
          this.offset,
          this.restaurantCategoryId,
        ).then(({ data }) => {
          this.hideLoading();
          this.shopListArr = [...this.shopListArr, ...data];
          // 当获取到的数据小于 20, 说明没有更多的数据，不需要再次请求数据
          if (data.length < 20) {
            this.touchend = true;
            return;
          }
          this.preventRepeatRequest = false;
        });
      },
      backTop() {
        animate(document.body, { scrollTop: "0" }, 400, "ease-out");
      },
      async listenPropChange() {
        this.showLoading = true;
        this.offset = 0;
        await shopList(
          this.latitude,
          this.longitude,
          this.offset,
          "",
          this.restaurantCategoryIds,
          this.sortByType,
          this.deliveryMode,
          this.supportIds,
        ).then(({ data }) => {
          this.hideLoading();
          this.shopListArr = [...data];
        });
      },
      hideLoading() {
        this.showLoading = false;
      },
      zhunshi(supports) {
        let zhunStatus = false;
        if (supports instanceof Array && supports.length) {
          supports.forEach((item) => {
            if (item.icon_name === "准") {
              zhunStatus = true;
            }
          });
        }
        return zhunStatus;
      },
    },
    mixins: [loadMore, getImgPath],
    computed: {
      latitude() {
        return this.$store.state.latitude;
      },
      longitude() {
        return this.$store.state.longitude;
      },
    },
    watch: {
      restaurantCategoryIds: function () {
        this.listenPropChange();
      },
      sortByType: function () {
        this.listenPropChange();
      },
      confirmSelect: function () {
        this.listenPropChange();
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/style/mixin.scss";
  .shop-list-container {
    background-color: #fff;
    margin-bottom: 2rem;
  }
  .shop-li {
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .shop-image {
    @include wh(2.7rem, 2.7rem);
    display: block;
    margin-right: 0.4rem;
  }

  .list-back-li {
    height: 4.85rem;
    .list-back-svg {
      @include wh(100%, 100%);
    }
  }
  .shop-right {
    flex: auto;
    .shop-detail-header {
      @include fj;
      align-items: center;
      .shop-title {
        width: 8.5rem;
        color: #333;
        padding-top: 0.01rem;
        @include font(0.65rem, 0.65rem, "PingFangSC-Regular");
        font-weight: 700;
      }
      .premium::before {
        content: "品牌";
        display: inline-block;
        font-size: 0.5rem;
        line-height: 0.6rem;
        color: #333;
        background-color: #ffd930;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
      }
      .shop-detail-ul {
        display: flex;
        transform: scale(0.8);
        margin-right: -0.3rem;
        .supports {
          @include sc(0.5rem, #999);
          border: 0.025rem solid #f1f1f1;
          padding: 0 0.04rem;
          border-radius: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
    .rating-order-num {
      @include fj(space-between);
      height: 0.6rem;
      margin-top: 0.52rem;
      .rating-order-num-left {
        @include fj(flex-start);
        .rating-section {
          display: flex;
          .rating-num {
            @include sc(0.4rem, #ff6000);
            margin: 0 0.2rem;
          }
        }
        .order-section {
          transform: scale(0.8);
          margin-left: -0.2rem;
          @include sc(0.4rem, #666);
        }
      }
      .rating-order-num-right {
        display: flex;
        align-items: center;
        transform: scale(0.7);
        min-width: 5rem;
        justify-content: flex-end;
        margin-right: -0.8rem;
        .delivery-style {
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
          border: 1px;
        }
        .delivery-left {
          color: white;
          background-color: $blue;
          border: 0.025rem solid $blue;
        }
        .delivery-right {
          color: $blue;
          border: 0.025rem solid $blue;
        }
      }
    }
    .fee-distance {
      margin-top: 0.52rem;
      @include fj;
      @include sc(0.5rem, #333);
      .fee {
        transform: scale(0.9);
        @include sc(0.5rem, #666);
      }
      .distance-time {
        transform: scale(0.9);
        span {
          color: #999;
        }
        .order-time {
          color: $blue;
        }
        .segmentation {
          color: #ccc;
        }
      }
    }
  }
  .loader-more {
    @include font(0.6rem, 3);
    text-align: center;
    color: #999;
  }
  .empty-data {
    @include sc(0.5rem, #666);
    text-align: center;
    line-height: 2rem;
  }
</style>
