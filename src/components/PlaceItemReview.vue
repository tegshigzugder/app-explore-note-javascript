<template>
  <div v-if="isVisible">
    <q-card>
      <q-card-section>
        <div>
          <div class="row">
            <div class="col-10">
              <q-rating
                v-model="review.placeItemRating"
                size="3em"
                max="5"
                color="black"
                :icon="sentiment_icons"
              />
            </div>
            <div class="col-2">
              <q-btn @click="removePlaceItemReview" icon="close" />
            </div>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-9">
              <q-input v-model="review.placeItemName" type="text" label="Item" />
            </div>
            <div class="col-1"></div>
            <div class="col-2">
              <q-input v-model="review.placeItemPrice" type="number" label="Price" suffix="€" />
            </div>
          </div>
        </div>
        <q-input v-model="review.placeItemComment" type="textarea" label="Comment" />
        <q-file v-model="file" label="Pick an image" @input="handleFileUpload" accept="image/*" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePlaceItemReviewStore } from '@/stores/placeItemReviewStore'
import type { PlaceItemReview } from '@/types/PlaceItemReview'

const store = usePlaceItemReviewStore()

const isVisible = ref(true)
const file = ref(null)

const sentiment_icons = [
  'sentiment_very_dissatisfied',
  'sentiment_dissatisfied',
  'sentiment_neutral',
  'sentiment_satisfied',
  'sentiment_very_satisfied'
]

const review = ref({
  placeItemName: '',
  placeItemRating: 1,
  placeItemPrice: 1,
  placeItemComment: '',
  placeItemUUID: generateUUID()
})

const removePlaceItemReview = () => {
  store.removeReviewByUUID(review.value.placeItemUUID)
  isVisible.value = false
}

store.addReview(review.value)

const updateStore = () => {
  const tempsecondReview: PlaceItemReview = {
    placeItemName: review.value.placeItemName,
    placeItemPrice: review.value.placeItemPrice,
    placeItemRating: review.value.placeItemRating,
    placeItemComment: review.value.placeItemComment,
    placeItemUUID: review.value.placeItemUUID
  }
  store.updateReviewByUUID(review.value.placeItemUUID, tempsecondReview)
}

const handleFileUpload = () => {
  // TODO: Handle the file upload here
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

watch(
  review,
  () => {
    updateStore()
  },
  { deep: true }
)
</script>
