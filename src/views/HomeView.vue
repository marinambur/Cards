<template>
  <div class="notes-page">
    <button class="notes-page__add-button" @click="addDefaultNote">Add note</button>
    <div class="notes-page__grid">
      <div v-for="note in notes" :key="note.id" @click="viewNote(note.id)">
        <BaseNote
          v-if="note.type === NoteType.Text"
          :title="note.title"
          :description="note.description"
          :id="note.id"
          @showDeletePopup="showDeletePopup"
        />
        <ImageNote
          v-else-if="note.type === NoteType.Image && note.imageSrc"
          :title="note.title"
          :description="note.description"
          :imageSrc="note.imageSrc"
          :id="note.id"
          @showDeletePopup="showDeletePopup"
        />
        <CheckboxNote
          v-else-if="note.type === NoteType.Checkbox && note.checkboxes"
          :title="note.title"
          :description="note.description"
          :checkboxes="note.checkboxes"
          :id="note.id"
          @imageChanged="updateImage"
          @showDeletePopup="showDeletePopup"
        />
      </div>
    </div>
    <PopUp :isShown="isPopupShown" @confirm="confirmDelete" @cancel="cancelDelete">
      Do you really want to delete this note?
    </PopUp>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotesStore } from '@/stores/notes';
import BaseNote from '@/components/BaseNote/BaseNote.vue';
import ImageNote from '@/components/ImageNote/ImageNote.vue';
import CheckboxNote from '@/components/CheckboxNote/CheckboxNote.vue';
import PopUp from '@/components/PopUp/PopUp.vue';
import { useRouter } from 'vue-router';
import { NoteType } from '@/stores/notes';

const store = useNotesStore();
const notes = store.notes;
const router = useRouter();
const noteToDelete = ref<number | null>(null);

const addDefaultNote = () => {
  store.addNote({
    type: 0,
    title: 'New Default Note',
    description: 'This is a new default note.',
  });
};

const updateImage = (imageSrc: string, id: number) => {
  store.updateNoteImage(id, imageSrc);
};

const deleteNote = (id: number) => {
  store.deleteNote(id);
};

const viewNote = (id: number) => {
    router.push(`/note/${id}`);
};

const isPopupShown = ref(false);

const showDeletePopup = (id: number) => {
  noteToDelete.value = id;
  isPopupShown.value = true;
};

const confirmDelete = () => {
  if (noteToDelete.value !== null) {
    deleteNote(noteToDelete.value);
  }
  isPopupShown.value = false;
};

const cancelDelete = () => {
  noteToDelete.value = null;
  isPopupShown.value = false;
};
</script>

<style lang="scss">
.notes-page {
  font-family: 'Arial', sans-serif;
  color: #f4f4f4;
  background-color: #121212;
  margin: 0;
  padding: 0;
  min-height: 100vh;

  &__add-button {
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    transition: background-color 0.2s;
    width: 150px;
    height: 50px;
    font-size: 16px;
    margin: 20px 0 0 20px;

    @media (max-width: 480px) {
      margin: 10px;
    }

    &:hover {
      background-color: #555;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 10px;
    }
  }
}
</style>
