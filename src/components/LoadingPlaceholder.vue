<template>
  <div class="loading-grid">
    <div
      v-for="n in 8"
      :key="n"
      class="loading-item"
      :class="{ large: n % 5 === 1 || n % 5 === 4 }"
    >
      <div class="loading-image"></div>
      <div class="loading-info">
        <div class="loading-text"></div>
        <div class="loading-text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingPlaceholder'
}
</script>

<style lang="scss" scoped>
@import '../assets/components/loading-placeholder.scss';
</style>
