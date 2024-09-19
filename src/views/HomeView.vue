<template>
  <div>
    <h1>Discover</h1>
  </div>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <place-details v-for="(review, index) in reviews" :key="index" :placeDetails="review" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {fetchReviews} from '@/apis/explorenoteapi'
import type {placeDetailsDto} from '@/types/PlaceDetailsDto'
import {onMounted, ref} from 'vue'
import PlaceDetails from '@/components/PlaceDetails.vue'

const reviews = ref<placeDetailsDto[]>()

onMounted(async () => {
  reviews.value = await fetchReviews()
})
</script>
