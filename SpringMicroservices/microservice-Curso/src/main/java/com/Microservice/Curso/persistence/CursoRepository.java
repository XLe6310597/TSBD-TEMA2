package com.Microservice.Curso.persistence;

import com.Microservice.Curso.Entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    // Si ya tienes métodos personalizados, agrégalos aquí.
}
