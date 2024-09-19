// src/stores/reviewStore.js
import type { PlaceItemReview } from '@/types/PlaceItemReview'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store for managing place item reviews.
 */
export const usePlaceItemReviewStore = defineStore('placeItemReviewStore', () => {
  const reviews = ref<PlaceItemReview[]>([])

  /**
   * Retrieves all reviews from the store.
   * @returns {PlaceItemReview[]} An array of all reviews.
   */
  function getReviews(): PlaceItemReview[] {
    return reviews.value
  }

  /**
   * Adds a new review to the store.
   * @param {PlaceItemReview} review - The review to add.
   */
  function addReview(review: PlaceItemReview) {
    reviews.value.push({ ...review })
  }

  /**
   * Removes a review from the store by its UUID.
   * @param {string} placeItemUUID - The UUID of the review to remove.
   */
  function removeReviewByUUID(placeItemUUID: string) {
    const index = reviews.value.findIndex((review) => review.placeItemUUID === placeItemUUID)
    if (index !== -1) {
      reviews.value.splice(index, 1)
    } else {
      console.warn(`RemoveIndex: Review with UUID ${placeItemUUID} not found`)
    }
  }

  /**
   * Updates a review in the store by its UUID.
   * @param {string} placeItemUUID - The UUID of the review to update.
   * @param {PlaceItemReview} updatedReview - The updated review data.
   */
  function updateReviewByUUID(placeItemUUID: string, updatedReview: PlaceItemReview) {
    const index = reviews.value.findIndex((review) => review.placeItemUUID === placeItemUUID)
    if (index !== -1) {
      reviews.value[index] = { ...updatedReview }
    } else {
      console.warn(`UpdateIndex: Review with UUID ${placeItemUUID} not found`)
    }
  }

  /**
   * Clears all reviews from the store.
   */
  function clearReviews() {
    reviews.value = []
  }

  return {
    reviews,
    addReview,
    getReviews,
    removeReviewByUUID,
    updateReviewByUUID,
    clearReviews
  }
})
