import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../Book';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {

  book: Book = new Book();
  isLoading = false;
  private mode = 'create';
  private bookId: string;

  constructor(
    public bookService: BookService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.bookId = paramMap.get('id');
        this.isLoading = true;
        this.bookService.getBook(this.bookId).subscribe(data => {
          this.book = data.book;
          this.isLoading = false;
        });

      } else {
        this.mode = 'create';
        this.bookId = null;
      }
    });
  }

  saveBook(form: NgForm) {
    if (form.invalid) {
      console.log(form)
      return true;
    }
    this.isLoading = true;

    if (this.mode === 'create') {
      const book: Book = {
        id: null,
        title: form.value.title,
        description: form.value.description,
        bookshelfNo: form.value.bookshelfNo
      };

      this.bookService.addBook(book);
      form.resetForm();
    } else {
      this.bookService.updateBook(this.bookId, this.book);
    }
  }

}
