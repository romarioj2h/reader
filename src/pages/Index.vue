<template>
  <q-page class="flex fit row wrap justify-start items-start content-start">
    <div v-for="book in books" v-bind:key="book.id" class="q-pa-sm col-lg-4 col-sm-6 col-xs-12">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ book.title }}</div>
          <div class="text-subtitle2">by {{ book.author }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="primary" flat>Read</q-btn>
          <q-btn color="negative" flat>Delete</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" label="Add book" @click="addBookDialog = true" />
    </q-page-sticky>
    <q-dialog v-model="addBookDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add new book</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-file outlined v-model="file" label="Click to choose">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import {BookLibrary} from "src/lib/BookLibrary";

export default defineComponent({
  name: 'Index',
  data() {
    return {
      bookLibrary: null,
      books: [],
      file: null,
      addBookDialog: false
    }
  },
  mounted() {
    this.bookLibrary = new BookLibrary();
    this.books = this.bookLibrary.getAvailableBooks();
  }
})
</script>
