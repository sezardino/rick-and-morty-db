<template>
  <div class="table">
    <p class="table__info" v-if="!data.length">{{ emptyLabel }}</p>
    <table class="table__table" v-else ref="table">
      <thead class="table__head">
        <tr class="table__row table__row--head">
          <th class="table__data--empty"></th>

          <th class="table__head-data" v-for="field in thFields" :key="field">
            {{ field }}
          </th>
          <th class="table__data--empty"></th>
        </tr>
      </thead>
      <transition-group tag="tbody" class="table__body" name="row">
        <tr class="table__row" v-for="item in data" :key="item.id">
          <td class="table__data--empty"></td>
          <td class="table__data">
            <div class="table__img-wrapper">
              <favorite-icon
                :class="{
                  table__favorite: true,
                  'table__favorite--active': isFavorite(item.id),
                }"
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
      </transition-group>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getLastEpisode } from "@/helpers/functions";
import { IEpisode } from "@/interfaces";
import useGsap from "@/use/useGsap";

export default defineComponent({
  name: "my-table",
  props: {
    data: Array,
    favorites: Array,
    emptyLabel: { type: String, required: true },
  },
  emits: ["addFavorite"],
  setup(props) {
    const table = ref(null);
    const { tl } = useGsap();
    const thFields = [
      "Photo",
      "Character ID",
      "Name",
      "Gender",
      "Species",
      "Last Episode",
      "Add To Favorites",
    ];

    const lastEpisode = (episodes: Array<IEpisode>) => {
      return getLastEpisode(episodes);
    };
    const genderIcon = (gender: string) => {
      return gender.toLowerCase() + "-icon";
    };
    const isFavorite = (id: string) => {
      if (props.favorites!.find((item: any) => item.id === id)) {
        return true;
      } else {
        return false;
      }
    };

    onMounted(() => {
      if (table.value) {
        const tableEl = table.value as unknown as HTMLElement;
        const rows = tableEl.querySelectorAll(".table__row");
        tl.fromTo(
          rows,
          { x: "-=100", opacity: 0 },
          { x: 0, stagger: 0.1, opacity: 1, clearProps: "all" }
        );
      }
    });

    return { table, thFields, lastEpisode, genderIcon, isFavorite };
  },
});
</script>
