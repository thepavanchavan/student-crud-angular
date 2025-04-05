import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students: Student[] = [];
  private jsonUrl = 'assets/students.json';

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Student[]> {
    return this.http.get<Student[]>(this.jsonUrl).pipe(
      map(data => {
        this.students = data;
        return this.students;
      })
    );
  }

  getAll(): Observable<Student[]> {
    return of(this.students);
  }

  getById(id: number): Observable<Student | undefined> {
    return of(this.students.find(s => s.id === id));
  }

  add(student: Student): Observable<void> {
    student.id = this.generateId();
    this.students.push(student);
    return of();
  }

  update(student: Student): Observable<void> {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index > -1) this.students[index] = student;
    return of();
  }

  delete(id: number): Observable<void> {
    this.students = this.students.filter(s => s.id !== id);
    return of();
  }

  count(): Observable<number> {
    return of(this.students.length);
  }

  private generateId(): number {
    return this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
  }
}
