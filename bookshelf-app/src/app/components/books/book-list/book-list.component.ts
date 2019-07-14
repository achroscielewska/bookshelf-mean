import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../Book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  books: Book[] = [];
  isLoading = false;

  private booksSub: Subscription;

  constructor(public booksService: BookService) {}

  ngOnInit() {
    this.isLoading = true;
    this.booksService.getBooks();
    this.booksSub = this.booksService.getBookUpdateListener().subscribe((data: Book[]) => {
      this.books = data;
      this.isLoading = false;
    });
  }

  onDelete(id: string) {
    this.booksService.deleteBook(id);
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
