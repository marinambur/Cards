import { defineStore } from 'pinia'
import catImage from '@/assets/cat.jpeg';

export enum NoteType {
  Text = 0,
  Image = 1,
  Checkbox = 2,
}

interface Note {
  id: number;
  type: NoteType;
  title: string;
  description: string;
  imageSrc?: string;
  checkboxes?: { text: string; checked: boolean }[];
}

export const useNotesStore = defineStore({
  id: 'notesStore',

  state: (): { notes: Note[] } => ({
    notes: [
      { id: 1, type: 0, title: 'Default Note', description: 'This is a default note.' },
      {
        id: 2,
        type: 1,
        title: 'Image Note',
        description: 'This is an image note.',
        imageSrc: catImage,
      },
      {
        id: 3,
        type: 2,
        title: 'Checkbox Note',
        description: 'This is a checkbox note.',
        checkboxes: [
          { text: 'Check this', checked: false },
          { text: 'And this', checked: true },
        ],
      },
      { id: 4, type: 0, title: 'Another Default Note', description: 'This is another default note.' },
    ],
  }),

  actions: {
    addNote(note: Omit<Note, 'id'>) {
      const newId = this.notes.length ? Math.max(...this.notes.map(n => n.id)) + 1 : 1;
      this.notes.push({ ...note, id: newId });
    },

    deleteNote(id: number) {
      const index = this.notes.findIndex(note => note.id === id);
      if (index > -1) this.notes.splice(index, 1);
    },

    updateNoteImage(id: number, imageSrc: string) {
      const note = this.notes.find(note => note.id === id && note.type === 1);
      if (note) {
        (note as Note).imageSrc = imageSrc;
      }
    },

    updateNote(id: number, updatedFields: Partial<Note>) {
      const note = this.notes.find(note => note.id === id);
      if (note) {
        Object.assign(note, updatedFields);
      }
    }
  }
});
