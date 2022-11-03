<template>
  <div class="food-container">
    <HeadTop :head-title="headTitle" :go-back="true"></HeadTop>
    <section class="sort-container">
      <div class="sort-item" :class="{ 'choose-type': sortBy === 'food' }">
        <div class="sort-item-container" @click="chooseType('food')">
          <div class="sort-item-border">
            <span :class="{ 'category-title': sortBy === 'food' }">
              {{ footTitle }}
            </span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort_icon">
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
                  <section></section>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
  import HeadTop from "@/components/header/Head";

  export default {
    components: {
      HeadTop,
    },
  };
</script>

<style scoped lang="scss">
  @import "@/style/mixin.scss";

  .food-container {
    padding-top: 3.6rem;
  }
</style>
