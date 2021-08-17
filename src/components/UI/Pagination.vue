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
          :disabled="item.disabled || item.value === current"
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
          :disabled="current === total || total === 0"
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
import { computed, defineComponent } from "vue";
import { getPagination } from "@/helpers/functions";
import { PAGINATION_TYPE } from "@/helpers/const";
import { useRoute, useRouter } from "vue-router";

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
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const current = computed(() => {
      if (props.type === PAGINATION_TYPE.ROUTER) {
        return +route.params.page;
      } else {
        return props.currentPage;
      }
    });
    const pagination = computed(() => {
      const args = {
        total: props.total as number,
        show: props.show as number,
        current: current.value as number,
      };

      return getPagination(args);
    });

    const clickHandler = (index: number) => {
      if (props.type === PAGINATION_TYPE.ROUTER) {
        const path = `/${props.linkPath ? props.linkPath + "/" : ""}${index}`;
        router.push(path);
      }
      props.pageChangeHandler!(index);
    };

    return { current, pagination, clickHandler };
  },
});
</script>
