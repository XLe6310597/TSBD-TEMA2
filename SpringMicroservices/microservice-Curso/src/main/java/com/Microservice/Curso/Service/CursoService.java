package com.Microservice.Curso.Service;

import com.Microservice.Curso.Entity.Curso;
import com.Microservice.Curso.Http.response.StudentByCursoResponse;
import com.Microservice.Curso.client.StudentsClient;
import com.Microservice.Curso.dto.StudentDTO;
import com.Microservice.Curso.persistence.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService implements ICursoRepository {

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private StudentsClient studentsClient;

    @Override
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    @Override
    public Curso finById(Long id) {
        // findById devuelve Optional<Curso>, por eso usamos orElseThrow
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con id: " + id));
    }

    @Override
    public void save(Curso curso) {
        cursoRepository.save(curso);
    }

    @Override
    public void delete(Long id) {
        cursoRepository.deleteById(id);
    }

    @Override
    public StudentByCursoResponse findStudentsByIdCurso(Long idcurso) {
        // si no existe, devolvemos un Curso vacío para no romper el builder
        Curso curso = cursoRepository.findById(idcurso).orElse(new Curso());

        // Llama al microservice de students (Feign client)
        List<StudentDTO> studentDTOList = studentsClient.findAllStudentByCurso(idcurso);

        return StudentByCursoResponse.builder()
                .cursoname(curso.getNombre())
                .docente(curso.getDocente())
                .studentDTOList(studentDTOList)
                .build();
    }
}
