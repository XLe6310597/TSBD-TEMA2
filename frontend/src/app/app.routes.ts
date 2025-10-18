import { Routes } from '@angular/router';
import { CursosListComponent } from './cursos/list/list.component';
import { CursoFormComponent } from './cursos/form/form.component';
import { HomeComponent } from './pages/home/home.component'; // 👈 importa el nuevo componente

export const routes: Routes = [
  // 🏠 Página principal
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // 👩‍🎓 Estudiantes
  { path: 'students', loadComponent: () => import('./students/list/list.component').then(m => m.StudentsListComponent) },
  { path: 'students/new', loadComponent: () => import('./students/form/form.component').then(m => m.StudentFormComponent) },
  { path: 'students/edit/:id', loadComponent: () => import('./students/form/form.component').then(m => m.StudentFormComponent) },

  // 📘 Cursos
  { path: 'cursos', component: CursosListComponent },
  { path: 'cursos/nuevo', component: CursoFormComponent },
  { path: 'cursos/editar/:id', component: CursoFormComponent },

  // 🚫 Ruta por defecto si no existe
  { path: '**', redirectTo: '' }
];
