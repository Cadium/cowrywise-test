<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="close">&times;</button>
        <img :src="photo.urls.regular" :alt="photo.alt_description" class="modal-image" />
        <div class="modal-info">
          <h2 class="author">{{ photo.user.name }}</h2>
          <p v-if="photo.location && photo.location.name" class="location">
            {{ photo.location.name }}
          </p>
          <p v-if="photo.exif && photo.exif.name" class="camera-info">
            Camera: {{ photo.exif.name }}
          </p>
          <div class="photo-actions">
            <button class="action-button like-button" @click="toggleLike">
              <i class="fas fa-heart" :class="{ liked: isLiked }"></i>
            </button>
            <button class="action-button download-button" @click="downloadPhoto">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalView',
  props: {
    show: Boolean,
    photo: Object
  },
  data() {
    return {
      isLiked: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    toggleLike() {
      this.isLiked = !this.isLiked
    },
    downloadPhoto() {
      const link = document.createElement('a')
      link.href = this.photo.urls.full
      link.download = `${this.photo.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/components/modal-view.scss';
</style>
