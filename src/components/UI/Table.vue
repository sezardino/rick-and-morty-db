<template>
  <div class="table">
    <p class="table__info" v-if="!data.length">{{ emptyLabel }}</p>
    <table class="table__table" v-else>
      <thead class="table__head">
        <tr class="table__row table__row--head">
          <th class="table__data--empty"></th>
          <th class="table__head-data">Photo</th>
          <th class="table__head-data">Character ID</th>
          <th class="table__head-data">Name</th>
          <th class="table__head-data">Gender</th>
          <th class="table__head-data">Species</th>
          <th class="table__head-data">Last Episode</th>
          <th class="table__head-data">Add To Favorites</th>
          <th class="table__data--empty"></th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr class="table__row" v-for="item in data" :key="item.id">
          <td class="table__data--empty"></td>
          <td class="table__data">
            <div class="table__img-wrapper">
              <favorite-icon
                class="table__favorite"
                v-if="isFavorite(item.id)"
              ></favorite-icon>
              <img class="table__img" :src="item.image" :alt="item.name" />
            </div>
          </td>
          <td class="table__data">{{ item.id }}</td>
          <td class="table__data">{{ item.name }}</td>
          <td class="table__data">
            <component
              :is="genderIcon(item.gender)"
              class="table__icon"
            ></component>
            {{ item.gender }}
          </td>
          <td class="table__data">{{ item.species }}</td>
          <td class="table__data">{{ lastEpisode(item.episode) }}</td>
          <td class="table__data">
            <button
              :class="`button table__button ${
                isFavorite(item.id) ? 'button--active' : ''
              }`"
              @click.prevent="$emit('addFavorite', item)"
            >
              <star-icon></star-icon>
              <span class="visually-hidden"> Add to favorites </span>
            </button>
          </td>
          <td class="table__data--empty"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getLastEpisode } from "@/helpers/functions";
import { IEpisode } from "@/interfaces";

export default defineComponent({
  name: "my-table",
  props: {
    data: Array,
    favorites: Array,
    emptyLabel: { type: String, required: true },
  },
  emits: ["addFavorite"],

  methods: {
    lastEpisode(episodes: Array<IEpisode>) {
      return getLastEpisode(episodes);
    },
    genderIcon(gender: string) {
      return gender.toLowerCase() + "-icon";
    },
    isFavorite(id: string) {
      console.log(this.favorites);
      if (this.favorites!.find((item: any) => item.id === id)) {
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>
