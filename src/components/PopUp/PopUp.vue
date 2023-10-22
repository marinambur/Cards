<template>
    <div v-if="isShown" class="popup">
      <div class="popup__overlay" @click="close"></div>
      <div class="popup__content">
        <slot></slot>
        <div class="popup__actions">
          <button @click.stop="onConfirm" class="popup__button popup__button--confirm">OK</button>
          <button @click.stop="close" class="popup__button popup__button--cancel">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  defineProps({
    isShown: Boolean
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const onConfirm = () => emit('confirm');
  const close = () => emit('cancel');
  </script>
  
  <style lang="scss" scoped>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    font-family: 'Arial', sans-serif;
  
    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  
    &__content {
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      z-index: 1;
      width: 300px;
      max-width: 90%;
      box-sizing: border-box;
      color: black;
    }
  
    &__actions {
      margin-top: 20px;
      text-align: right;
    }
  
    &__button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
      transition: background-color 0.3s, color 0.3s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
      &--confirm {
        background-color: #4CAF50;
        color: #ffffff;
  
        &:hover {
          background-color: #45a049;
        }
      }
  
      &--cancel {
        background-color: #f44336;
        color: #ffffff;
  
        &:hover {
          background-color: #d32f2f;
        }
      }
    }
  }
  </style>
  