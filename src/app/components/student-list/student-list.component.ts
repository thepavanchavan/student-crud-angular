import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.students = this.studentService.getAll();
  }

  edit(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  delete(id: number) {
    this.studentService.delete(id);
    this.students = this.studentService.getAll();
  }

}
