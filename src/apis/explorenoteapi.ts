import axios from 'axios'
import { EXPLORENOTEAPI_CSHARP, EXPLORENOTEAPI_JAVA } from './urls'
import type { placeDetailsDto } from '@/types/PlaceDetailsDto'
import type { EnumsDto } from '@/types/EnumsDto'
import type { PlaceResponseDto } from '@/types/PlaceResponseDto'
import { ref } from 'vue'

const savedApi = localStorage.getItem('selectedApi')
const selectedApi = ref(savedApi ? savedApi : EXPLORENOTEAPI_JAVA)

/**
 * Toggles the selected API between C# and Java versions.
 * Updates the localStorage with the new selected API.
 */
export const toggleApi = () => {
  selectedApi.value =
    selectedApi.value === EXPLORENOTEAPI_CSHARP ? EXPLORENOTEAPI_JAVA : EXPLORENOTEAPI_CSHARP
  localStorage.setItem('selectedApi', selectedApi.value)
  console.log('Selected API:', selectedApi.value)
}

/**
 * Adds a review for a specific place.
 * @param placeId - The ID of the place to add the review to.
 * @param review - The review data to be submitted.
 * @returns The response data from the API.
 * @throws Will throw an error if the request fails.
 */
export const addReview = async (placeId: any, review: any) => {
  try {
    const response = await axios.post(`${selectedApi.value}review/addreview/1/${placeId}`, review)
    return response.data
  } catch (error) {
    console.error('Failed to submit review:', error)
    throw error
  }
}

/**
 * Fetches enumeration data from the API.
 * @returns The enumeration data from the API.
 * @throws Will throw an error if the request fails.
 */
export const fetchEnums = async () => {
  try {
    const response = await axios.get<EnumsDto>(`${selectedApi.value}place/enums`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}

/**
 * Fetches places based on the selected city and amenity.
 * @param selectedCity - The city to filter places by.
 * @param selectedAmenity - The amenity to filter places by.
 * @returns The places data from the API.
 * @throws Will throw an error if the request fails.
 */
export const fetchPlaces = async (
  selectedCity: string | number | boolean,
  selectedAmenity: string | number | boolean
) => {
  try {
    const url = `${selectedApi.value}place/places?city=${encodeURIComponent(
      selectedCity
    )}&amenity=${encodeURIComponent(selectedAmenity)}`
    const response = await axios.get<PlaceResponseDto[]>(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}

/**
 * Fetches reviews.
 * @returns The reviews data from the API.
 * @throws Will throw an error if the request fails.
 */
export const fetchReviews = async () => {
  try {
    const url = `${selectedApi.value}review/getreview/1/1`
    const response = await axios.get<placeDetailsDto[]>(url)
    return response.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}
