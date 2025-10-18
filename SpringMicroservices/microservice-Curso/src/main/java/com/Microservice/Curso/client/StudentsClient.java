package com.Microservice.Curso.client;

import com.Microservice.Curso.dto.StudentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@FeignClient(name = "microservice-student")
public interface StudentsClient {
    @GetMapping("/api/students/curso/{idcurso}")
    List<StudentDTO> findAllStudentByCurso(@PathVariable("idcurso") Long idcurso);
}

