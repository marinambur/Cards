<template>
  <BaseNote
    :title="title"
    :description="description"
    :id="id"
    class="image-note"
  >
    <img
      :src="displayedImageSrc"
      alt="Note image"
      v-if="displayedImageSrc"
      class="image-note__image"
    />
  </BaseNote>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import BaseNote from '@/components/BaseNote/BaseNote.vue';

const props = defineProps<{
  imageSrc: string
  title: string
  description: string
  id: number
}>()

const displayedImageSrc = ref(props.imageSrc ? props.imageSrc : '');

</script>

<style lang="scss" scoped> 
.image-note {
  &__image {
    max-height: 140px;
    width: auto;
    max-width: max-content;
    border-radius: 4px;
  }
}
</style>
