import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseUrl = 'http://localhost:9090/api/cursos';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/all`);
  }

  // ✅ Obtener curso por ID
  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/search/${id}`);
  }

  // ✅ Crear nuevo curso
  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.baseUrl}/create`, curso);
  }

  // ✅ Actualizar curso existente
  updateCurso(id: number, curso: Curso): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${id}`, curso);
  }

  // ✅ Eliminar curso
  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
