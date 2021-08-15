<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <button
          class="button pagination__button"
          :disabled="current === 1"
          @click="clickHandler(current - 1)"
        >
          <pagination-icon class="pagination__icon"></pagination-icon>
          <span class="visually-hidden">Previous page</span>
        </button>
      </li>
      <li class="pagination__item" v-for="item in pagination" :key="item.id">
        <button
          :class="`button pagination__button ${
            item.value === current ? 'button--active' : ''
          }`"
          :disabled="item.disabled"
          @click="clickHandler(item.value)"
        >
          <span class="visually-hidden" v-if="!item.disabled">
            To page number:
          </span>
          <span class="pagination__button-text">{{ item.label }}</span>
        </button>
      </li>
      <li class="pagination__item">
        <button
          class="button pagination__button"
          :disabled="current === total"
          @click="clickHandler(current + 1)"
        >
          <pagination-icon class="pagination__icon pagination__icon--next">
          </pagination-icon>
          <span class="visually-hidden">Next page</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPagination } from "@/helpers/functions";
import { PAGINATION_TYPE } from "@/helpers/const";

export default defineComponent({
  name: "my-pagination",
  props: {
    total: {
      type: Number,
    },
    show: {
      type: Number,
    },
    pageChangeHandler: Function,
    linkPath: {
      type: String,
      required: false,
      default: "",
    },
    currentPage: {
      type: Number,
    },
    type: {
      type: String,
      default: "router",
      validator: (value: string) => {
        return Object.values(PAGINATION_TYPE).indexOf(value) !== -1;
      },
    },
  },
  computed: {
    pagination() {
      const args = {
        total: this.total as number,
        show: this.show as number,
        current: this.current as number,
      };

      return getPagination(args);
    },
    current() {
      if (this.type === PAGINATION_TYPE.ROUTER) {
        return +this.$route.params.page;
      } else {
        return this.currentPage;
      }
    },
  },

  methods: {
    clickHandler(index: number) {
      if (this.type === PAGINATION_TYPE.ROUTER) {
        const path = `/${this.linkPath ? this.linkPath + "/" : ""}${index}`;
        this.$router.push(path);
      }
      this.pageChangeHandler!(index);
    },
  },
});
</script>
