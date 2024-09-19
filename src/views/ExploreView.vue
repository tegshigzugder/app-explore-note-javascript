<template>
  <div>
    <h1>Review</h1>
    <div v-if="enums">
      <q-select
        filled
        bottom-slots
        v-model="selectedCity"
        :options="enums.cities"
        label="City"
        clearable
      />
      <q-select
        filled
        bottom-slots
        v-model="selectedAmenity"
        :options="enums.amenities"
        label="Amenity"
        clearable
      />
      <q-btn @click="sendSelectedData" color="black" label="Search" />
    </div>
    <div v-else>Loading...</div>
    <div v-if="places.length" class="q-mt-md">
      <q-card
        v-for="place in places"
        :key="place.nodeId"
        class="q-mb-md shadow-1"
        @click="goToReview(place)"
      >
        <q-card-section>
          <div class="text-h6">{{ place.name }}</div>
          <div>{{ place.amenity }}</div>
          <div>{{ place.source }}</div>
          <div>{{ place.lat }}, {{ place.lon }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {fetchEnums, fetchPlaces} from '@/apis/explorenoteapi'
import type {EnumsDto} from '@/types/EnumsDto'
import type {PlaceResponseDto} from '@/types/PlaceResponseDto'
import {usePlacesStore} from '@/stores/placesStore'

const store = usePlacesStore()
const selectedAmenity = ref<string | null>(null)
const selectedCity = ref<string | null>(null)
const enums = ref<EnumsDto>()
const places = ref<PlaceResponseDto[]>([])
const router = useRouter()

const fetchData = async () => {
  try {
    enums.value = await fetchEnums()
  } catch (error) {
    // TODO: remove mock logic without backend
    enums.value = {
      amenities: ['MockAmenity'],
      cities: ['MockCity']
    }
    console.error('Error fetching data:', error)
  }
}

const sendSelectedData = async () => {
  if (selectedAmenity.value && selectedCity.value) {
    // TODO: remove mock logic without backend
    if (selectedAmenity.value == 'MockAmenity' && selectedCity.value == 'MockCity')
      places.value = [
        {
          name: 'MockPlace',
          amenity: 'MockAmenity',
          source: 'MockSource',
          nodeId: 1,
          lat: 2,
          lon: 3
        }
      ]

    try {
      const response = await fetchPlaces(selectedCity.value, selectedAmenity.value)
      places.value = response
      store.addPlaces(response)
    } catch (error) {
      console.error('Error sending data:', error)
    }
  } else {
    console.error('Please select both an amenity and a city.')
  }
}

const goToReview = (place: PlaceResponseDto) => {
  router.push({ name: 'PlaceReview', params: { id: place.nodeId } })
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
