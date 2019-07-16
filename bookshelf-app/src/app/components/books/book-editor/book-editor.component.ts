import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../Book';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {
  book: Book = new Book();
  isLoading = false;
  form: FormGroup;
  imagePreview: any;
  private mode = 'create';
  private bookId: string;

  constructor(
    public bookService: BookService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formInit();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.bookId = paramMap.get('id');
        this.isLoading = true;
        this.bookService.getBook(this.bookId).subscribe(data => {
          this.book = {
            id: data.book._id,
            title: data.book.title,
            bookshelfNo: data.book.bookshelfNo,
            description: data.book.description,
            imagePath: data.book.imagePath
          };
          this.formSetValue();
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.bookId = null;
      }
    });
  }

  formInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      bookshelfNo: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  formSetValue() {
    this.form.setValue({
      title: this.book.title,
      bookshelfNo: this.book.bookshelfNo,
      description: this.book.description,
      image: null
    });
  }

  onImagePicked(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];

    if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
      return alert('File format should be png or jpg or jpeg');
    }

    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result; };
    reader.readAsDataURL(file);
  }

  saveBook() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    if (this.mode === 'create') {
      const newBook: Book = {
        id: null,
        title: this.form.value.title,
        description: this.form.value.description,
        bookshelfNo: this.form.value.bookshelfNo,
        imagePath: null
      };

      this.bookService.addBook(newBook, this.form.value.image);
    } else {
      const upadtedBook: Book = {
        id: this.bookId,
        title: this.form.value.title,
        description: this.form.value.description,
        bookshelfNo: this.form.value.bookshelfNo,
        imagePath: null
      };
      this.bookService.updateBook(this.bookId, upadtedBook);
    }
    this.form.reset();
  }

}
