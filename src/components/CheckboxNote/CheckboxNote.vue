<template>
  <BaseNote
    :title="title"
    :description="description"
    :id="id"
  >
    <ul class="checkbox-list">
      <li v-for="(item, index) in checkboxes" :key="index" class="checkbox-list__item">
        <input type="checkbox" v-model="item.checked" class="checkbox-list__checkbox" />
        {{ item.text }}
      </li>
    </ul>
  </BaseNote>
</template>
  
<script setup lang="ts">
import BaseNote from '@/components/BaseNote/BaseNote.vue';

type Checkbox = {
  text: string
  checked: boolean
}

defineProps<{
    checkboxes: Checkbox[]
    title: string
    description: string
    id: number
}>()
</script>

<style lang="scss" scoped>
.checkbox-list {
  list-style-type: none;
  padding: 0;

  &__item {
    margin: 5px 0;
  }

  &__checkbox {
    margin-right: 8px;
  }
}
</style>
  