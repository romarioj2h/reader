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

  saveNewBook() {
    return true;
  }
}
