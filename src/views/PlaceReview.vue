<template>
  <q-page>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card>
        <q-card-section>
          <div>Name: {{ review.name }}</div>
          <div>NodeId: {{ placeNodeId }}</div>
          <div>Location: {{ review.location }}</div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <q-rating v-model="review.rating" size="3em" max="5" color="black" icon="star" />
          <q-input v-model="review.comment" type="textarea" label="Comment" />
        </q-card-section>
      </q-card>
      <place-item-review v-for="index in counterArray" :key="index" />
      <q-card>
        <q-card-section>
          <q-btn @click="addPlaceItemReview" label="Add Place Item Review" />
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <q-btn @click="draftReview" label="Draft Review" />
          <q-btn @click="submitReview" label="Submit Review" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addReview } from '@/apis/explorenoteapi'
import PlaceItemReview from '@/components/PlaceItemReview.vue'
import { usePlaceItemReviewStore } from '@/stores/placeItemReviewStore'
import { usePlacesStore } from '@/stores/placesStore'

const placeItemReviewStore = usePlaceItemReviewStore()
const placeStore = usePlacesStore()
const route = useRoute()
const router = useRouter()

const placeNodeId = ref(route.params.id)

const review = ref<{
  location: string
  name: string
  rating: number
  comment: string
  amenity: string
  placeItemReviews: any
}>({
  location: 'location',
  name: 'name',
  rating: 1,
  comment: '',
  amenity: '',
  placeItemReviews: []
})

let counter = ref(0)

const addPlaceItemReview = () => {
  counter.value++
}

const submitReview = async () => {
  try {
    review.value.placeItemReviews = placeItemReviewStore.getReviews()
    await addReview(placeNodeId.value, review.value)
    placeItemReviewStore.clearReviews()
    await router.push('/explore')
  } catch (error) {
    console.error('Failed to submit review:', error)
  }
}

const draftReview = async () => {
  try {
    console.info('Draft review')
  } catch (error) {
    console.error('Failed to submit review:', error)
  }
}

const counterArray = computed(() => {
  return Array.from({ length: counter.value }, (_, i) => i + 1)
})

onMounted(async () => {
  const result = await placeStore.getPlaceByNodeId(Number(placeNodeId.value))
  if (result) {
    review.value.name = result.name
    review.value.location = result.lat + ',' + result.lon
    review.value.amenity = result.amenity
  } else {
    console.error('Failed to fetch place details: result is undefined')
  }
})
</script>
