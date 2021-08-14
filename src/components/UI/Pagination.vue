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
import { createPaginationArr } from "@/helpers/functions";

export default defineComponent({
  name: "my-pagination",
  props: {
    current: {
      type: Number,
    },
    total: {
      type: Number,
    },
    show: {
      type: Number,
    },
  },
  emits: ["pageChange"],
  computed: {
    pagination() {
      return createPaginationArr(this.total!, this.show!, this.current!);
    },
  },

  methods: {
    clickHandler(index: number) {
      this.$emit("pageChange", index);
    },
  },
  // setup() {

  // },
});
</script>
