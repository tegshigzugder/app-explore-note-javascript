import type { PlaceResponseDto } from '@/types/PlaceResponseDto'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store for managing places.
 */
export const usePlacesStore = defineStore('placesStore', () => {
  const places = ref<PlaceResponseDto[]>([])

  /**
   * Retrieves all places from the store.
   * @returns {PlaceResponseDto[]} An array of all reviews.
   */
  function getPlaces(): PlaceResponseDto[] {
    return places.value
  }

  /**
   * Retrieves all places from the store.
   * @returns {PlaceResponseDto[]} An array of all reviews.
   */
  function getPlaceByNodeId(NodeId: number) {
    const index = places.value.findIndex((place) => place.nodeId === NodeId)
    if (index !== -1) {
      return places.value[index]
    } else {
      console.warn(`getPlaceByNodeId: Place with NodeId ${NodeId} not found`)
    }
  }

  /**
   * Adds a new place to the store.
   * @param {PlaceResponseDto} place - The place to add.
   */
  function addPlaces(place: PlaceResponseDto[]) {
    places.value.push(...place)
  }

  return {
    places,
    getPlaces,
    addPlaces,
    getPlaceByNodeId
  }
})
