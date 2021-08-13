<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <button class="pagination__button">
          <pagination-icon class="pagination__icon"></pagination-icon>
          <span class="visually-hidden">Previous page</span>
        </button>
      </li>
      <li class="pagination__item">
        <button class="pagination__button">
          <span class="visually-hidden">To page number:</span>
          <span class="pagination__button-text">1</span>
        </button>
      </li>
      <li class="pagination__item">
        <button class="pagination__button pagination__button--current">
          <span class="visually-hidden">To page number</span>
          <span class="pagination__button-text">2</span>
        </button>
      </li>
      <li class="pagination__item">
        <button class="pagination__button">
          <pagination-icon
            class="pagination__icon pagination__icon--next"
          ></pagination-icon>
          <span class="visually-hidden">Next page</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PaginationIcon from "@/components/icons/Pagination.vue";

export default defineComponent({
  name: "my-pagination",
  components: { "pagination-icon": PaginationIcon },
  // setup() {

  // },
});
</script>
