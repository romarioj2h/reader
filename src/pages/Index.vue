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
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
const { fs, path } = require('filer');

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
        this.fileContent = (new TextDecoder()).decode(data.value);
        const filename = path.join('/', 'first.txt');

        fs.writeFile(filename, this.fileContent, (err) => {
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
      fs.readFile(filename, 'utf8', (err, content) => {
        this.fileContent = content;
      })
    }
  }
})
</script>
