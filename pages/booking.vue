<template>
  <v-card class="pa-4 elevation-2">
    <v-row dense>
      <v-col cols="12">
        <h1 class="text-h3 text-center" style="background: linear-gradient(90deg, #4A90E2, #DAA520); 
         -webkit-background-clip: text; 
         -webkit-text-fill-color: transparent; 
         font-family: 'Arial', sans-serif; 
         padding: 20px;">
          <v-icon color="primary">
            mdi-book-open-page-variant
          </v-icon>
          Comics and Manga Borrower’s Record System
        </h1>

        <v-divider></v-divider>
      </v-col>
      <v-col cols="8">
        <v-card class="pa-4 mb-6">
          <v-card-title class="text-h5 text-primary">Summary of Comics Borrower</v-card-title>
          <v-data-table :headers="headers" :items="books" :sort-by="[{ key: 'borrower', order: 'asc' }]"
            class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="openBorrowerDialog">
                  <v-icon left>mdi-plus</v-icon> Borrower Form
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon color="red" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <template #bottom v-if="!show_footer" />
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="4"> <v-container>
          <v-alert type="info"> Suggest New Comics!</v-alert>
          <v-carousel show-arrows="hover" height="32vh">
            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
          </v-carousel>
        </v-container></v-col>
    </v-row>
    <v-row dense>


      <v-col cols="4">
        <v-card class="pa-4 mb-6">
          <v-card-title class="text-h5 text-primary">Summary of Books</v-card-title>
          <v-data-table :headers="commics_headers" :items="commics" :sort-by="[{ key: 'borrower', order: 'asc' }]"
            class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="openBookDialog">
                  <v-icon left>mdi-plus</v-icon> Add New Book
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon color="red" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <template #bottom v-if="!show_footer" />
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="pa-4 mb-6">
          <v-card-title class="text-h5 text-primary">Summary of Authors</v-card-title>
          <v-data-table :headers="author_headers" :items="authors" :sort-by="[{ key: 'borrower', order: 'asc' }]"
            class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="openAuthorDialog">
                  <v-icon left>mdi-plus</v-icon> Add New Author
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon color="red" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <template #bottom v-if="!show_footer" />
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="pa-4 mb-6">
          <v-card-title class="text-h5 text-primary">Summary of Books and Authors</v-card-title>
          <v-data-table :headers="book_author_headers" :items="book_authors"
            :sort-by="[{ key: 'borrower', order: 'asc' }]" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="openBookAuthorDialog">
                  <v-icon left>mdi-plus</v-icon> Add New Book
                </v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon color="red" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <template #bottom v-if="!show_footer" />
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialogs for managing books, borrowers, authors -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.id" label="Item ID"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.borrower" label="Borrower"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.book_id" label="Book ID"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.borrow_date" label="Borrow Date"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.return_date" label="Return Date"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'borrower', key: 'borrower' },
      { title: 'book_id', key: 'book_id' },
      { title: 'borrow_date', key: 'borrow_date' },
      { title: 'return_date', key: 'return_date' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    commics_headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'Title', key: 'title' },
      { title: 'Publish Date', key: 'publish_date' },
      { title: 'Actions', key: 'actions', sortable: false },

    ],
    author_headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      { title: 'Name', key: 'author_name' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    book_author_headers: [
      {
        title: 'Book ID',
        align: 'start',
        sortable: false,
        key: 'book_id',
      },
      { title: 'Author ID', key: 'author_id' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    books: [],
    book_list: [],
    authors: [],
    book_author: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      borrower: 0,
      book_id: 0,
      borrow_date: 0,
      return_date: 0,
    },
    defaultItem: {
      id: '',
      borrower: 0,
      book_id: 0,
      borrow_date: 0,
      return_date: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.books = [
        {
          id: '0001',
          borrower: 'John Doe',
          book_id: 6.0,
          borrow_date: '2024-09-24',
          return_date: '2024-09-28',
        },
        {
          id: '0002',
          borrower: 'Jane Smith',
          book_id: 9.0,
          borrow_date: '2024-09-24',
          return_date: '2024-09-28',
        },
        {
          id: '0003',
          borrower: 'Alice Johnson',
          book_id: 16.0,
          borrow_date: '2024-09-24',
          return_date: '2024-09-28',
        },
        {
          id: '0004',
          borrower: 'Bob Brown',
          book_id: 3.7,
          borrow_date: '2024-09-24',
          return_date: '2024-09-28',
        },
        {
          id: '0005',
          borrower: 'Charlie White',
          book_id: 16.0,
          borrow_date: '2024-09-24',
          return_date: '2024-09-28',
        },

      ]
      this.commics = [
        {
          id: '101',
          title: 'The Legend',
          publish_date: "2024-09-24",
        },
        {
          id: '102',
          title: 'The Adventures of Spider-Man',
          publish_date: "2024-09-25",
        },
        {
          id: '103',
          title: 'Batman: The Dark Knight',
          publish_date: "2024-09-26",
        },
        {
          id: '104',
          title: 'Wonder Woman: Year One',
          publish_date: "2024-09-27",
        },
        {
          id: '105',
          title: 'X-Men: The Phoenix Saga',
          publish_date: "2024-09-28",
        }
      ]
      this.authors = [
        {
          id: '1',
          author_name: 'Marie Lu',
        },
        {
          id: '2',
          author_name: 'Stan Lee',
        },
        {
          id: '3',
          author_name: 'Frank Miller',
        },
        {
          id: '4',
          author_name: 'Greg Rucka',
        },
        {
          id: '5',
          author_name: 'Chris Claremont',
        }
      ]
      this.book_authors = [
        {
          book_id: '1',
          author_id: '101',  // Marie Lu
        },
        {
          book_id: '2',
          author_id: '102',  // Stan Lee
        },
        {
          book_id: '3',
          author_id: '103',  // Frank Miller
        },
        {
          book_id: '4',
          author_id: '104',  // Greg Rucka
        },
        {
          book_id: '5',
          author_id: '105',  // Chris Claremont
        }


      ]



    },

    editItem(item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.books.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem)
      } else {
        this.books.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
