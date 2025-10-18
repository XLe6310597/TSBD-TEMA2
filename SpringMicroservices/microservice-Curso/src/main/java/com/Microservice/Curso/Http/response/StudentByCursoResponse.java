package com.Microservice.Curso.Http.response;

import com.Microservice.Curso.dto.StudentDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentByCursoResponse {
    private String cursoname;
    private String docente;
    private List<StudentDTO> studentDTOList;
}
