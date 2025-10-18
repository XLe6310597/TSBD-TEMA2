package com.Microservice.Curso.Controller;

import com.Microservice.Curso.Entity.Curso;
import com.Microservice.Curso.Http.response.StudentByCursoResponse;
import com.Microservice.Curso.Service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin("*")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCurso(@RequestBody Curso curso){
        cursoService.save(curso);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Curso>> findAllCursos(){
        return ResponseEntity.ok(cursoService.findAll());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<Curso> findById(@PathVariable Long id){
        return ResponseEntity.ok(cursoService.finById(id));
    }

    @GetMapping("/search-student/{idcurso}")
    public ResponseEntity<StudentByCursoResponse> findStudentByIdcurso(@PathVariable Long idcurso){
        return ResponseEntity.ok(cursoService.findStudentsByIdCurso(idcurso));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateCurso(@PathVariable Long id, @RequestBody Curso curso){
        Curso existing = cursoService.finById(id);
        existing.setNombre(curso.getNombre());
        existing.setDocente(curso.getDocente());
        cursoService.save(existing);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id){
        cursoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
