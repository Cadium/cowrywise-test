<template>
  <div id="app">
    <div class="header-background"></div>
    <header>
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          @input="onSearchInput"
          @keyup.enter="performSearch"
          placeholder="Search for photo"
        />
        <button @click="performSearch" aria-label="Search">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </header>
    <main>
      <h2 v-if="searchQuery && !loading && hasSearched" class="search-results-header">
        Search Results for "<span>{{ searchQuery }}</span
        >"
      </h2>
      <h2 v-if="loading" class="search-results-header">
        Searching for "<span>{{ searchQuery }}</span
        >"
      </h2>
      <photo-grid :photos="photos" :loading="loading" />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAfricanPhotos, searchPhotos } from './api/unsplash'
import PhotoGrid from './components/PhotoGrid.vue'

export default {
  name: 'App',
  components: {
    PhotoGrid
  },
  setup() {
    const photos = ref([])
    const loading = ref(true)
    const searchQuery = ref('')
    const currentPage = ref(1)
    const hasSearched = ref(false)
    const lastSearchedQuery = ref('')

    const fetchInitialPhotos = async () => {
      try {
        loading.value = true
        const response = await getAfricanPhotos()
        photos.value = response.data
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        loading.value = false
      }
    }

    const performSearch = async () => {
      if (!searchQuery.value.trim()) {
        await fetchInitialPhotos()
        hasSearched.value = false
        lastSearchedQuery.value = ''
        return
      }

      try {
        loading.value = true
        hasSearched.value = true
        lastSearchedQuery.value = searchQuery.value
        const response = await searchPhotos(searchQuery.value, currentPage.value)
        photos.value = response.data.results
      } catch (error) {
        console.error('Error searching photos:', error)
      } finally {
        loading.value = false
      }
    }

    const onSearchInput = () => {
      if (hasSearched.value && searchQuery.value !== lastSearchedQuery.value) {
        hasSearched.value = false
      }
    }

    onMounted(fetchInitialPhotos)

    return {
      photos,
      loading,
      searchQuery,
      performSearch,
      hasSearched,
      onSearchInput
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/app.scss';
</style>
