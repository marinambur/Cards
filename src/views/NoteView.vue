<template>
    <div class="note-view">
      <h2 class="note-view__title">
        <input type="text" v-model="editTitle" class="note-view__input" />
      </h2>
      <p class="note-view__description">
        <textarea v-model="editDescription" class="note-view__textarea"></textarea>
      </p>
      <div v-if="isImageNote">
        <img :src="editImageSrc" alt="Note image" class="note-view__image" v-if="editImageSrc"/>
        <input type="file" @change="onImageChange" class="note-view__file-input" />
      </div>
      <div v-if="isCheckboxNote">
        <div v-for="(item, index) in editCheckboxes" :key="index" class="note-view__checkbox-item">
          <input type="checkbox" v-model="item.checked" maxlength="50"/>
          <input type="text" v-model="item.text" class="note-view__input" maxlength="50"/>
        </div>
      </div>
      <button @click="saveChanges" class="note-view__save-button">Сохранить</button>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useNotesStore, NoteType } from '@/stores/notes';
  
  const route = useRoute();
  const router = useRouter();
  const store = useNotesStore();
  
  const noteId = parseInt(route.params.id as string, 10);
  const note = ref(store.notes.find(n => n.id === noteId));
  
  const editTitle = ref(note.value?.title);
  const editDescription = ref(note.value?.description);
  const editImageSrc = ref(note.value?.imageSrc || '');
  const editCheckboxes = ref(note.value?.checkboxes || []);
  
  const isImageNote = computed(() => note.value?.type === NoteType.Image);
  const isCheckboxNote = computed(() => note.value?.type === NoteType.Checkbox);
  
  const onImageChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editImageSrc.value = reader.result as string;
        store.updateNoteImage(noteId, editImageSrc.value);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const saveChanges = () => {
    const updatedFields = {
      title: editTitle.value,
      description: editDescription.value,
      checkboxes: isCheckboxNote.value ? editCheckboxes.value : undefined
    };
    store.updateNote(noteId, updatedFields);
    router.push('/');
  };
  
  watch(note, (newNote) => {
    editTitle.value = newNote?.title;
    editDescription.value = newNote?.description;
    editImageSrc.value = newNote?.imageSrc || '';
    editCheckboxes.value = newNote?.checkboxes || [];
  });
</script>

<style lang="scss">
.note-view {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title,
  &__description {
    width: 100%;
  }

  &__input,
  &__textarea,
  &__file-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  &__textarea {
    resize: vertical;
    min-height: 100px;
  }

  &__image {
    max-width: 100%;
    border-radius: 4px;
  }

  &__checkbox-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }

  &__file-input {
    cursor: pointer;
    padding: 8px;
    margin-top: 10px;
  }

  &__save-button {
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s;
    align-self: flex-start;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
