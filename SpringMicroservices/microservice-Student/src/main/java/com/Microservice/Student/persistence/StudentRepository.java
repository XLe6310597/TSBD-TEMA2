package com.Microservice.Student.persistence;

import com.Microservice.Student.Entity.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {

    // ✅ Spring genera automáticamente la consulta según el nombre del campo "cursoId"
    List<Student> findAllByCursoId(Long cursoId);
}
