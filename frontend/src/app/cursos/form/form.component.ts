import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class CursoFormComponent implements OnInit {
  form!: FormGroup;
  idCurso?: number;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      docente: ['', Validators.required],
    });

    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idCurso) {
      this.isEdit = true;
      this.loadCurso();
    }
  }

  loadCurso(): void {
    this.loading = true;
    this.cursoService.getCursoById(this.idCurso!).subscribe({
      next: (curso: Curso) => {
        this.form.patchValue(curso);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar curso', err);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const curso: Curso = this.form.value;

    if (this.isEdit) {
      this.cursoService.updateCurso(this.idCurso!, curso).subscribe(() => {
        alert('Curso actualizado correctamente ✅');
        this.router.navigate(['/cursos']);
      });
    } else {
      this.cursoService.createCurso(curso).subscribe(() => {
        alert('Curso creado correctamente ✅');
        this.router.navigate(['/cursos']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/cursos']);
  }
}
