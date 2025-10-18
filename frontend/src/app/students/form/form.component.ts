import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  editMode = false;        // ✅ detecta si estamos editando
  studentId?: number;      // ✅ guarda el id del estudiante

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      cursoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.studentId) {
      this.editMode = true;
      this.studentService.getById(this.studentId).subscribe({
        next: (data) => this.studentForm.patchValue(data),
        error: (err) => console.error('Error al cargar estudiante', err)
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    const student: Student = this.studentForm.value;

    if (this.editMode && this.studentId) {
      // ✅ Modo edición
      this.studentService.update(this.studentId, student).subscribe({
        next: () => {
          alert('Estudiante actualizado con éxito');
          this.router.navigate(['/students']);
        },
        error: (err) => console.error('Error al actualizar estudiante', err)
      });
    } else {
      // ✅ Modo creación
      this.studentService.create(student).subscribe({
        next: () => {
          alert('Estudiante creado con éxito');
          this.router.navigate(['/students']);
        },
        error: (err) => console.error('Error al crear estudiante', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
