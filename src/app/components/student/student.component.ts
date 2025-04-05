import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
  form!: FormGroup;
  students: Student[] = [];
  selectedId: number | null = null;
  count: number = 0;

  constructor(private fb: FormBuilder, private service: StudentService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      age: [''],
      email: [''],
    });

    this.service.loadInitialData().subscribe(() => {
      this.loadStudents();
    });
  }

  loadStudents() {
    this.service.getAll().subscribe(data => {
      this.students = data;
      this.service.count().subscribe(c => (this.count = c));
    });
  }

  save() {
    const student: Student = {
      id: this.selectedId || 0,
      ...this.form.value,
    };

    if (this.selectedId) {
      this.service.update(student).subscribe(() => this.afterSave());
    } else {
      this.service.add(student).subscribe(() => this.afterSave());
    }
  }

  edit(student: Student) {
    this.form.patchValue(student);
    this.selectedId = student.id;
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.afterSave());
  }

  private afterSave() {
    this.form.reset();
    this.selectedId = null;
    this.loadStudents();
  }
}
