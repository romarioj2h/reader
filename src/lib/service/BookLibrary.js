import {fs, path} from "filer";
import {Buffer} from "buffer";
import ePub from "epubjs";

export class BookLibrary {

  getAvailableBooks() {
    return [
      {
        id: 1,
        title: 'Test de livro',
        author: 'Romario Huebra'
      },
      {
        id: 2,
        title: 'Casa do campo',
        author: 'Romario Huebra'
      },
    ];
  }

  /**
   * @param file {File}
   */
  saveNewBook(file) {
    let epub = ePub();
    epub.open(file, 'binary');
    epub.loaded.metadata.then(async function(meta){
      console.log(epub.archive);
      console.log(epub.cover);
      console.log(meta);
      let book = new Book();
      book.setTitle(meta.title);
      book.setAuthor(meta.creator);
    });

    return;
    file.stream().getReader().read().then(data => {
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
  }
}
