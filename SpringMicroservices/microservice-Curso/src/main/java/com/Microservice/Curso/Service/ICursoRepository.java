package com.Microservice.Curso.Service;

import com.Microservice.Curso.Entity.Curso;
import com.Microservice.Curso.Http.response.StudentByCursoResponse;

import java.util.List;

public interface ICursoRepository {

    List<Curso> findAll();

    Curso finById(Long id);          // <-- mantenemos tu nombre "finById"
    void save(Curso curso);
    void delete(Long id);

    StudentByCursoResponse findStudentsByIdCurso(Long idcurso);
}
