import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getAll().subscribe({
      next: data => { this.students = data; this.loading = false; },
      error: err => { this.error = 'Error cargando estudiantes'; this.loading = false; console.error(err); }
    });
  }

  deleteStudent(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar estudiante?')) return;
    this.studentService.delete(id).subscribe({
      next: () => this.loadStudents(),
      error: err => { alert('Error al eliminar'); console.error(err); }
    });
  }

  goToNew() {
    this.router.navigate(['/students/new']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/students/edit', id]);
  }
}
