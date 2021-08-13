<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <button class="button pagination__button">
          <pagination-icon class="pagination__icon"></pagination-icon>
          <span class="visually-hidden">Previous page</span>
        </button>
      </li>
      <li class="pagination__item">
        <button class="button pagination__button">
          <span class="visually-hidden">To page number:</span>
          <span class="pagination__button-text">1</span>
        </button>
      </li>
      <li class="pagination__item">
        <button class="button button--active pagination__button">
          <span class="visually-hidden">To page number</span>
          <span class="pagination__button-text">2</span>
        </button>
      </li>
      <li class="pagination__item">
        <button class="button pagination__button">
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

export default defineComponent({
  name: "my-pagination",
  // setup() {

  // },
});
</script>
