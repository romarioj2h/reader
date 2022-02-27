<template>
  <q-page class="flex flex-center">
    <form @submit.prevent="save" class="q-pa-md">
      <q-file outlined v-model="file">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn
        type="submit"
        label="Save"
        class="q-mt-md"
        color="teal"
      >
      </q-btn>
    </form>
    <p>File: {{ fileContent }}</p>
    <q-btn
      label="Load"
      class="q-mt-md"
      color="teal"
      @click="load"
    >
    </q-btn>
    <div id="book-view"></div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
const { fs, path } = require('filer');
import ePub from 'epubjs';
import { Buffer } from 'buffer';

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      file: null,
      fileContent: ''
    }
  },
  methods: {
    save: function () {
      this.file.stream().getReader().read().then(data => {
        const filename = path.join('/', 'first.txt');

        fs.writeFile(filename, Buffer.from(data.value), (err) => {
          if (err) {
            return console.error('Unable to write /docs/first.txt', err);
          }

          fs.stat(filename, (err, stats) =>  {
            if (err) {
              return console.error('Unable to stat /docs/first.txt', err);
            }
            console.log('Stats for /docs/first.txt:', stats);
          });
        });
      })
    },
    load: function () {
      const filename = path.join('/', 'first.txt');
      fs.readFile(filename, (err, content) => {
        let book = ePub();
        book.open(content, 'binary')
        let render = book.renderTo('book-view');
        render.display();
        var keyListener = function(e){

          // Left Key
          if ((e.keyCode || e.which) == 37) {
            render.prev();
          }

          // Right Key
          if ((e.keyCode || e.which) == 39) {
            render.next();
          }

        };

        render.on("keyup", keyListener);
      })
    }
  }
})
</script>
