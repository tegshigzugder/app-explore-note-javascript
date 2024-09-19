<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      padding
      control-type="regular"
      control-color="black"
      arrows
      height="150px"
      class="shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style" :img-src="amenityImage">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">{{ props.placeDetails.placeName }}</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="placeReview" class="column no-wrap flex-center">
        <q-card flat>
          <q-card-section>
            <div class="text-h6 q-mb-xs">{{ placeRatingSummary.name }}</div>
            <div class="text-h10 q-mb-xs">NodeId: {{ placeRatingSummary.id }}</div>
            <div class="row no-wrap items-center">
              <q-rating
                size="18px"
                v-model="placeRatingSummary.averageRating"
                :max="5"
                color="black"
              />
              <span class="text-caption text-grey q-ml-sm"
                >{{ placeRatingSummary.averageRating }} ({{
                  placeRatingSummary.numberOfRatings
                }})</span
              >
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="placeReviewComments" class="column no-wrap flex-center">
        <q-card flat>
          <q-card-section>
            <div
              v-for="(comment, index) in placeRatingSummary.comments"
              :key="index"
              class="q-mb-xs"
            >
              "{{ comment }}"
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide
        v-for="(placeItemRating, index) in duplicatedPlaceItemRatings"
        :key="`info1-${index}`"
        :name="`placeItem-info1-${index}`"
        class="column no-wrap flex-center"
      >
        <q-card flat v-if="index % 2 === 0">
          <q-card-section>
            <div class="text-h6 q-mb-xs">{{ placeItemRating.name }}</div>
            <div class="row no-wrap items-center">
              <q-rating
                size="18px"
                v-model="placeItemRating.averageRating"
                :max="5"
                color="black"
              />
              <span class="text-caption text-grey q-ml-sm">
                {{ placeItemRating.averageRating }} ({{ placeItemRating.numberOfRatings }})
              </span>
            </div>
          </q-card-section>
        </q-card>
        <q-card flat v-else>
          <q-card-section>
            <div v-for="(comment, index) in placeItemRating.comments" :key="index" class="q-mb-xs">
              "{{ comment }}"
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { placeDetailsDto, placeItem, review } from '@/types/PlaceDetailsDto'

import barImage from '@/assets/images/bar.jpg'
import biergartenImage from '@/assets/images/biergarten.jpg'
import cafeImage from '@/assets/images/cafe.jpg'
import fastFoodImage from '@/assets/images/fast_food.jpg'
import foodCourtImage from '@/assets/images/food_court.jpg'
import iceCreamImage from '@/assets/images/ice_cream.jpg'
import pubImage from '@/assets/images/pub.jpg'
import defaultImage from '@/assets/images/default.jpg'
import type { ratingSummary } from '@/types/placeItemRatingSummary'

const props = defineProps<{
  placeDetails: placeDetailsDto
}>()

const slide = ref('style')

const amenityImage = computed(() => {
  const amenityImages = {
    Bar: barImage,
    Biergarten: biergartenImage,
    Cafe: cafeImage,
    Fast_food: fastFoodImage,
    Food_court: foodCourtImage,
    Ice_cream: iceCreamImage,
    Pub: pubImage
  }
  return amenityImages[props.placeDetails.amenity] || defaultImage
})

const calculatePlaceItemRatings = (placeItems: placeItem[]): ratingSummary[] => {
  return placeItems.map((item) => {
    const numberOfRatings = item.placeItemReviews.length
    const averageRating = numberOfRatings
      ? parseFloat(
          (
            item.placeItemReviews.reduce((sum, review) => sum + review.rating, 0) / numberOfRatings
          ).toFixed(1)
        )
      : 0

    const comments = item.placeItemReviews.slice(-3).map((review) => review.comment)

    return {
      id: item.placeItemId,
      name: item.placeItemName,
      averageRating,
      numberOfRatings,
      comments: comments
    }
  })
}
const placeItemRatings = computed(() => calculatePlaceItemRatings(props.placeDetails.placeItems))

const duplicatedPlaceItemRatings = computed(() => {
  return placeItemRatings.value.flatMap((item) => [item, item])
})
const calculatePlaceRatingSummary = (reviews: review[]): ratingSummary => {
  const numberOfRatings = reviews.length
  const averageRating = numberOfRatings
    ? parseFloat(
        (reviews.reduce((sum, review) => sum + review.rating, 0) / numberOfRatings).toFixed(1)
      )
    : 0

  const comments = reviews.slice(-3).map((review) => review.comment)

  return {
    id: props.placeDetails.nodeId,
    name: props.placeDetails.placeName,
    averageRating,
    numberOfRatings,
    comments
  }
}

const placeRatingSummary = computed(() => calculatePlaceRatingSummary(props.placeDetails.reviews))
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
