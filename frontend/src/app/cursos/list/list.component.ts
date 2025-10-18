import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, RouterLink, MatButtonModule, MatProgressSpinnerModule]
})
export class CursosListComponent implements OnInit {
  courses: Curso[] = [];
  loading = false;
  error: string | null = null;

  constructor(private cursoService: CursoService, private router: Router) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.loading = true;
    this.cursoService.getCursos().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar cursos';
        this.loading = false;
      },
    });
  }

  goToNew(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/cursos/editar', id]);
  }

  deleteCurso(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.loadCursos();
      });
    }
  }
}
