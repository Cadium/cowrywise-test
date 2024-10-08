<template>
  <div class="photo-grid-container">
    <loading-placeholder v-if="loading" />
    <div v-else class="photo-grid">
      <div
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="photo-item"
        :class="{
          'first-row': index < 3,
          large: isLargeItem(index),
          medium: isMediumItem(index),
          small: isSmallItem(index)
        }"
        @click="openModal(photo)"
      >
        <img :src="photo.urls.regular" :alt="photo.alt_description" @click="openModal(photo)" />
        <div class="photo-info">
          <p class="author">{{ photo.user.name }}</p>
          <p class="location" v-if="photo.location && photo.location.name">
            {{ photo.location.name }}
          </p>
        </div>
      </div>
    </div>
    <modal-view :show="showModal" :photo="selectedPhoto" @close="closeModal" />
  </div>
</template>

<script>
import LoadingPlaceholder from './LoadingPlaceholder.vue'
import ModalView from './ModalView.vue'

export default {
  name: 'PhotoGrid',
  components: {
    LoadingPlaceholder,
    ModalView
  },
  props: {
    photos: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      selectedPhoto: null
    }
  },
  methods: {
    openModal(photo) {
      this.selectedPhoto = photo
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedPhoto = null
    },
    isLargeItem(index) {
      return window.innerWidth > 768 && (index % 6 === 0 || index % 6 === 5)
    },
    isMediumItem(index) {
      return window.innerWidth > 768 && (index % 6 === 1 || index % 6 === 4)
    },
    isSmallItem(index) {
      return window.innerWidth > 768 && (index % 6 === 2 || index % 6 === 3)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/components/photo-grid.scss';
</style>
