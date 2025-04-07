import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private storageKey = 'students';

  getAll(): Student[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id: number): Student | undefined {
    return this.getAll().find(s => s.id === id);
  }

  add(student: Student) {
    const students = this.getAll();
    student.id = Date.now(); // simple unique ID
    students.push(student);
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }

  update(updated: Student) {
    const students = this.getAll().map(s => s.id === updated.id ? updated : s);
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }

  delete(id: number) {
    const students = this.getAll().filter(s => s.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(students));
  }
}
