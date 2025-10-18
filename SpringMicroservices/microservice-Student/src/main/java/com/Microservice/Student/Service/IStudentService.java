package com.Microservice.Student.Service;

import com.Microservice.Student.Entity.Student;
import java.util.List;

public interface IStudentService {

    List<Student> findAll();

    Student findById(Long id);

    Student save(Student student);

    void delete(Long id);

    List<Student> findAllByIdCurso(Long idCurso);
}
