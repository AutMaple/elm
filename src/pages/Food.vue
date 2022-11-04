<template>
  <div class="food-container">
    <HeadTop :head-title="headTitle" :go-back="true"></HeadTop>
    <section class="sort-container">
      <div class="sort-item" :class="{ 'choose-type': sortBy === 'food' }">
        <div class="sort-item-container" @click="chooseType('food')">
          <div class="sort-item-border">
            <span :class="{ 'category-title': sortBy === 'food' }">
              {{ foodTitle }}
            </span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort-icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showList" v-show="category">
          <section
            class="category-container sort-detail-type"
            v-show="sortBy === 'food'">
            <section class="category-left">
              <ul>
                <li
                  v-for="(item, index) in category"
                  :key="index"
                  class="category-left-li"
                  :class="{
                    'category-active': restaurant_category_id === item.id,
                  }"
                  @click="selectCategoryName(item.id, index)">
                  <section>
                    <img
                      :src="getImgPath(item.image_url)"
                      v-if="index"
                      alt=""
                      class="category-icon" />
                    <span>{{ item.name }}</span>
                  </section>
                  <section>
                    <span class="category-count">{{ item.count }}</span>
                    <svg
                      v-if="index"
                      width="8"
                      height="8"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      class="category_arrow">
                      <path
                        d="M0 0 L6 4 L0 8"
                        stroke="#bbb"
                        stroke-width="1"
                        fill="none" />
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category-right">
              <ul>
                <li
                  v-for="(item, index) in categoryDetail"
                  v-if="index"
                  :key="index"
                  class="category-right-li"
                  @click="getCategoryIds(item.id, item.name)"
                  :class="{
                    'category-right-chosen':
                      restaurant_category_ids === item.id ||
                      (!restaurant_category_ids && index === 0),
                  }">
                  <span>{{ item.named }}</span>
                  <span>{{ item.count }}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <div class="sort-item" :class="{ 'choose-type': sortBy === 'sort' }">
        <div class="sort-item-container" @click="chooseType('sort')">
          <div class="sort-item-border">
            <span :class="{ 'category-title': sortBy === 'sort' }">排序</span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort-icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showList">
          <section class="sort-detail-type" v-show="sortBy === 'sort'">
            <ul class="sort-list-container" @click="sortList($event)">
              <li class="sort-list-li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#default"></use>
                </svg>
                <p data="0" :class="{ 'sort-select': sortByType === 0 }">
                  <span>智能排序</span>
                  <svg v-if="sortByType === 0">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort-list-li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#distance"></use>
                </svg>
                <p data="5" :class="{ 'sort-select': sortByType === 5 }">
                  <span>距离最近</span>
                  <svg v-if="sortByType === 5">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort-list-li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#hot"></use>
                </svg>
                <p data="6" :class="{ 'sort-select': sortByType === 6 }">
                  <span>销量最高</span>
                  <svg v-if="sortByType === 6">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort-list-li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#price"></use>
                </svg>
                <p data="1" :class="{ 'sort-select': sortByType === 1 }">
                  <span>起送价最低</span>
                  <svg v-if="sortByType === 1">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort-list-li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#speed"></use>
                </svg>
                <p data="2" :class="{ 'sort-select': sortByType === 2 }">
                  <span>起送价最低</span>
                  <svg v-if="sortByType == 2">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort-list-li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#rating"></use>
                </svg>
                <p data="3" :class="{ 'sort-select': sortByType === 3 }">
                  <span>起送价最低</span>
                  <svg v-if="sortByType == 3">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>
      </div>
      <div class="sort-item" :class="{ 'choose-type': sortBy === 'activity' }">
        <div class="sort-item-container" @click="chooseType('activity')">
          <span :class="{ 'category-title': sortBy === 'activity' }">筛选</span>
          <svg
            width="10"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            class="sort-icon">
            <polygon points="0,3 10,3 5,8" />
          </svg>
        </div>
        <transition name="showList">
          <section
            v-show="sortBy === 'activity'"
            class="sort-detail-type filter-container">
            <section style="width: 100%">
              <header class="filter-header-style">配送方式</header>
              <ul class="filter-ul">
                <li
                  v-for="(item, index) in delivery"
                  :key="index"
                  class="filter-li"
                  @click="selectDeliveryMode(item.id)">
                  <svg
                    :style="{
                      opacity: item.id == 0 && delivery_mode !== 0 ? 0 : 1,
                    }">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      :xlink:href="
                        delivery_mode == item.id ? '#selected' : '#fengniao'
                      "></use>
                  </svg>
                  <span
                    :class="{ 'selected-filter': delivery_mode === item.id }">
                    {{ item.text }}
                  </span>
                </li>
              </ul>
            </section>
            <section style="width: 100%">
              <header class="filter-header-style">商家属性(可以多选)</header>
              <ul class="filter-ul" style="padding-bottom: 0.5rem">
                <li
                  v-for="(item, index) in activity"
                  :key="index"
                  class="filter-li"
                  @click="selectSupportIds(index, item.id)">
                  <svg v-show="support_ids[index].status" class="activity-svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"></use>
                  </svg>
                  <span
                    class="filter-icon"
                    :style="{
                      color: '#' + item.icon_color,
                      borderColor: '#' + item.icon_color,
                    }"
                    v-show="!support_ids[index].status">
                    {{ item.icon_name }}
                  </span>
                  <span
                    :class="{ 'selected-filter': support_ids[index].status }">
                    {{ item.name }}
                  </span>
                </li>
              </ul>
            </section>
            <footer class="confirm-filter">
              <div class="clear-all filter-button-style" @click="clearSelect">
                清空
              </div>
              <div
                class="confirm-select filter-button-style"
                @click="confirmSelectFun">
                确定
                <span v-show="filterNum">({{ filterNum }})</span>
              </div>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showCover">
      <div class="back-cover" v-show="sortBy"></div>
    </transition>
    <section class="show-list-container">
      <ShopList
        :geohash="geohash"
        :restaurant-category-id="restaurant_category_id"
        :restaurant-category-ids="restaurent_category_ids"
        :sort-by-type="sortByType"
        :delivery-mode="delivery_mode"
        :confirm-select="confirmStatus"
        :support-ids="support_ids"
        v-if="latitude"></ShopList>
    </section>
  </div>
</template>

<script>
  import HeadTop from "@/components/header/Head";
  import ShopList from "@/components/common/ShopList";
  import {
    foodActivity,
    foodCategory,
    foodDelivery,
    siteAddress,
  } from "@/services/pullData";
  import { getImgPath } from "@/components/common/mixin";

  export default {
    components: {
      HeadTop,
      ShopList,
    },
    mixins: [getImgPath],
    data() {
      return {
        geohash: "",
        headTitle: "",
        foodTitle: "",
        restaurant_category_id: "",
        restaurant_category_ids: "",
        sortBy: "",
        category: null,
        categoryDetail: null,
        sortByType: null,
        delivery: null,
        activity: null,
        delivery_mode: null,
        support_ids: [],
        filterNum: 0,
        confirmStatus: false,
      };
    },
    created() {
      this.initData();
    },
    computed: {
      latitude() {
        return this.$store.state.latitude;
      },
      longitude() {
        return this.$store.state.longitude;
      },
    },
    methods: {
      recordAddress(data) {
        this.$store.commit("recordAddress", data);
      },
      async initData() {
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.headTitle;
        this.foodTitle = this.headTitle;
        this.restaurant_category_id = this.$route.query.restaurant_category_id;
        if (!this.latitude) {
          await siteAddress(this.geohash).then(({ data }) => {
            this.recordAddress(data);
          });
        }
        await foodCategory(this.latitude, this.longitude).then(({ data }) => {
          this.category = data;
        });
        this.category.forEach((item) => {
          if (this.restaurant_category_id === item.id) {
            this.categoryDetail = item.sub_categories;
          }
        });
        await foodDelivery(this.latitude, this.longitude).then(({ data }) => {
          this.delivery = data;
        });
        await foodActivity(this.latitude, this.longitude).then(({ data }) => {
          this.activity = data;
          this.activity.forEach((item, index) => {
            this.support_ids[index] = { status: false, id: item.id };
          });
        });
      },

      async chooseType(type) {
        if (this.sortBy === type) {
          this.sortBy = type;
          if (type === "food") {
            this.foodTitle = "分类";
          } else {
            this.foodTitle = this.headTitle;
          }
        } else {
          this.sortBy = "";
          if (type === "food") {
            this.foodTitle = this.headTitle;
          }
        }
      },
      selectCategoryName(id, index) {
        if (index === 0) {
          this.restaurant_category_ids = null;
          this.sortBy = "";
        } else {
          this.restaurant_category_id = id;
          this.categoryDetail = this.category[index].sub_categories;
        }
      },
      getCategoryIds(id, name) {
        this.restaurant_category_ids = id;
        this.sortBy = "";
        this.foodTitle = this.headTitle = name;
      },
      sortList(event) {
        let node;
        if (event.target.nodeName.toUpperCase() !== "p") {
          node = event.target.parentNode;
        } else {
          node = event.target;
        }
        this.sortByType = node.getAttribute("data");
        this.sortBy = "";
      },
      selectDeliveryMode(id) {
        if (this.delivery_mode === null) {
          this.filterNum++;
          this.delivery_mode = id;
        } else if (this.delivery_mode === id) {
          this.filterNum--;
          this.delivery_mode = null;
        } else {
          this.delivery_mode = id;
        }
      },
      selectSupportIds(index, id) {
        this.support_ids.splice(index, 1, {
          status: !this.support_ids[index].status,
          id,
        });
        this.filterNum = this.delivery_mode == null ? 0 : 1;
        this.support_ids.forEach((item) => {
          if (item.status) {
            this.filterNum++;
          }
        });
      },
      clearSelect() {
        this.support_ids.map((item) => (item.status = false));
        this.filterNum = 0;
        this.delivery_mode = null;
      },
      confirmSelectFun() {
        this.confirmStatus = !this.confirmStatus;
        this.sortBy = "";
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/style/mixin.scss";

  .food-container {
    padding-top: 3.6rem;
  }

  .sort-container {
    background-color: #fff;
    border-bottom: 0.025rem solid #f1f1f1;
    position: fixed;
    top: 1.9rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
  }

  .sort-item {
    @include sc(0.55rem, #444);
    @include wh(33.3%, 1.6rem);
    text-align: center;
    line-height: 1rem;

    .sort-item-container {
      @include wh(100%, 100%);
      position: relative;
      z-index: 14;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.3rem;

      .sort-item-border {
        height: 1rem;
        border-right: 0.025rem solid $bc;
      }
    }

    .sort-icon {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #666;
    }
  }

  .choose-type {
    .sort-item-container {
      .category-title {
        color: $blue;
      }

      .sort-icon {
        transform: rotate(180deg);
        fill: $blue;
      }
    }
  }

  .show-list-enter-active,
  .show-list-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }

  .show-list-enter,
  .show-list-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }

  .sort-detail-type {
    width: 100%;
    position: absolute;
    display: flex;
    top: 1.6rem;
    left: 0;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
  }

  .category-container {
    .category-left {
      flex: 1;
      background-color: #f1f1f1;
      height: 16rem;
      overflow-y: auto;

      span {
        @include sc(0.5rem, #666);
        line-height: 1.8rem;
      }

      .category-left-li {
        @include fj;
        padding: 0 0.5rem;

        .category-icon {
          @include wh(0.8rem, 0.8rem);
          vertical-align: middle;
          margin-right: 0.2rem;
        }

        .category-count {
          background-color: #cccccc;
          @include sc(0.4rem, #fff);
          padding: 0 0.1rem;
          border: 0.025rem solid #ccc;
          border-radius: 0.8rem;
          vertical-align: middle;
          margin-right: 0.25rem;
        }

        .category_arrow {
          vertical-align: middle;
        }
      }

      .category_active {
        background-color: #fff;
      }
    }

    .category-right {
      flex: 1;
      background-color: #fff;
      padding-left: 0.5rem;
      height: 16rem;
      overflow-y: auto;

      .category-right-li {
        @include fj;
        height: 1.8rem;
        line-height: 1.8rem;
        padding-right: 0.5rem;
        border-bottom: 0.025rem solid $bc;

        span {
          color: #666;
        }
      }

      .category-right-chosen {
        span {
          color: $blue;
        }
      }
    }
  }

  .sort-list-container {
    width: 100%;

    .sort-list-li {
      height: 2.5rem;
      display: flex;
      align-items: center;

      svg {
        @include wh(0.7rem, 0.7rem);
        margin: 0 0.3rem 0 0.8rem;
      }

      p {
        line-height: 2.5rem;
        flex: auto;
        text-align: left;
        text-indent: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        @include fj;
        align-items: center;

        span {
          color: #666;
        }
      }

      .sort-select {
        span {
          color: $blue;
        }
      }
    }
  }

  .filter-container {
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem;
    background-color: #f1f1f1;

    .filter-header-style {
      @include sc(0.4rem, #333);
      line-height: 1.5rem;
      height: 1.5rem;
      text-align: left;
      padding-left: 0.5rem;
      background-color: #fff;
    }

    .filter-ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.5rem;
      background-color: #ffffff;

      .filter-li {
        display: flex;
        align-items: center;
        border: 0.025rem solid #eee;
        @include wh(4.7rem, 1.4rem);
        margin-right: 0.25rem;
        border-radius: 0.125rem;
        padding: 0 0.25rem;
        margin-bottom: 0.25rem;

        svg {
          @include wh(0.8rem, 0.8rem);
          margin-right: 0.125rem;
        }

        span {
          @include sc(0.4rem, #333);
        }

        .filter-icon {
          @include wh(0.8rem, 0.8rem);
          font-size: 0.5rem;
          border: 0.025rem solid $bc;
          border-radius: 0.15rem;
          margin-left: 0.25rem;
          line-height: 0.8rem;
          text-align: center;
        }

        .activity-svg {
          margin-right: 0.25rem;
        }

        .selected-filter {
          color: $blue;
        }
      }
    }

    .confirm-filter {
      display: flex;
      background-color: #f1f1f1;
      width: 100%;
      padding: 0.3rem 0.2rem;

      .filter-button-style {
        @include wh(50%, 1.8rem);
        font-size: 0.8rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
      }

      .clear-all {
        background-color: #fff;
        margin-right: 0.5rem;
        border: 0.025rem solid #56d176;
      }

      .confirm-select {
        background-color: #56d176;
        color: #fff;
        border: 0.025rem solid #56d176;

        span {
          color: #fff;
        }
      }
    }
  }

  .show-cover-enter-active,
  .show-cover-leave-active {
    transition: opacity 0.3s;
  }

  .show-cover-enter,
  .show-cover-leave-active {
    opacity: 0;
  }

  .back-cover {
    position: fixed;
    @include wh(100%, 100%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
