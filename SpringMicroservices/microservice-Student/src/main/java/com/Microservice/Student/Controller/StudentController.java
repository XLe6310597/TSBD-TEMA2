package com.Microservice.Student.Controller;

import com.Microservice.Student.Entity.Student;
import com.Microservice.Student.Service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students") // ✅ unificado con el frontend
@CrossOrigin(origins = {
        "http://localhost:4200",
        "http://localhost:5173",
        "http://localhost:4321",
        "http://localhost:3000"
})

public class StudentController {

    @Autowired
    private IStudentService studentService;

    // ✅ Crear estudiante
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student saved = studentService.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ Obtener todos los estudiantes
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.findAll());
    }

    // ✅ Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student found = studentService.findById(id);
        return ResponseEntity.ok(found);
    }

    // ✅ Buscar por curso
    @GetMapping("/curso/{idCurso}")
    public ResponseEntity<List<Student>> getStudentsByCurso(@PathVariable Long idCurso) {
        return ResponseEntity.ok(studentService.findAllByIdCurso(idCurso));
    }

    // ✅ Actualizar estudiante
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student existing = studentService.findById(id);
        existing.setNombre(student.getNombre());
        existing.setApellidoP(student.getApellidoP());
        existing.setApellidoM(student.getApellidoM());
        existing.setCursoId(student.getCursoId());
        Student updated = studentService.save(existing);
        return ResponseEntity.ok(updated);
    }

    // ✅ Eliminar estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
