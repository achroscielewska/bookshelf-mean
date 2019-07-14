import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { Book } from './Book';
import { BookDto } from './BookDto';

@Injectable({ providedIn: 'root'})
export class BookService {
  private endpoint = `${environment.app_url}/books`;
  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getBooks() {
    this.http
      .get<{ message: string; books: BookDto[] }>(`${this.endpoint}`)
      .pipe(
        map(data => {
          return data.books.map(book => {
            return {
              id: book._id,
              title: book.title,
              description: book.description,
              bookshelfNo: book.bookshelfNo
            };
          });
        })
      )
      .subscribe(mapBooks => {
        this.books = mapBooks;
        this.booksUpdated.next([...this.books]);
      });
  }

  getBookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  getBook(id: string) {
    return this.http.get<{message: string; book: BookDto }>(`${this.endpoint}/${id}`);
  }

  addBook(book: Book) {
    this.http.post<{ message: string; bookId: string }>(`${this.endpoint}/newBook`, book)
      .subscribe(data => {
        const id = data.bookId;
        book.id = id;

        this.books.push(book);
        this.booksUpdated.next([...this.books]);
        this.router.navigate(['/']);
      });
  }

  updateBook(id: string, book: Book) {
    const updatedBook: Book = book;
    this.http
      .put(`${this.endpoint}/${id}`, book)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

  deleteBook(id: string) {
    this.http
      .delete(`${this.endpoint}/${id}`)
      .subscribe(() => {
        const updatedBooks = this.books.filter(book => book.id !== id);
        this.books = updatedBooks;
        this.booksUpdated.next([...this.books]);
      });
  }
}
