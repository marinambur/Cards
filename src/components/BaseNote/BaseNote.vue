<template>
  <div class="base-note">
    <h3 class="base-note__title">{{ title }}</h3>
    <p class="base-note__description">{{ description }}</p>
    <slot></slot>
    <button class="base-note__delete-button" @click.stop="showDeletePopup">Delete</button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String,
  description: String,
  id: Number
});

const emit = defineEmits(["showDeletePopup"]);

const showDeletePopup = () => {
  emit('showDeletePopup', props.id);
};
</script>

<style lang="scss">
.base-note {
  border: 1px solid #444;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #2b2b2b;
  color: #f4f4f4;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 300px;
  max-height: 350px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &__title {
    font-size: 1.5rem;
    color: #ffffff;
    max-height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }

  &__description {
    font-size: 1rem;
    color: #cccccc;
    max-height: 50px;
    overflow: scroll;
  }

  &__delete-button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #f44336;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    align-self: flex-end;
    font-size: 14px;
    font-weight: bold;


    &:hover {
      background-color: #d32f2f;
    }
  }
}

</style>
