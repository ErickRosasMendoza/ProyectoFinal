package com.bew.demo.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bew.demo.dto.AlumnoDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.service.AlumnoService;

import java.util.List;

@RestController
@RequestMapping("/alumno")
@CrossOrigin("*")
public class AlumnoRestController {
	
	@Autowired
	AlumnoService alumnoService;
	
	@GetMapping(path = "/findAll", produces = "application/json")
	public ResponseEntity<?> buscar(){
		List<AlumnoDTO> alumnos;
		alumnos = alumnoService.findAll();
		return ResponseEntity.ok(alumnos);
	}
	@PostMapping(path = "/save", consumes = "application/json")
	public ResponseEntity<?> save(@RequestBody AlumnoDTO alumnoDTO){
	alumnoService.saveAlumno (alumnoDTO);
	return ResponseEntity.ok().build();
}
	@PatchMapping(path = "/update", consumes = "application/json")
	public ResponseEntity<?> update(@RequestBody AlumnoDTO alumnoDTO)throws EmptyResultException{
	alumnoService.updateAlumno(alumnoDTO);
	return ResponseEntity.ok().build();
	}
	
	@DeleteMapping(path = "/delete/{idAlumno}", consumes="application/json")
	public ResponseEntity<?> delete(@PathVariable("idAlumno") Integer idAlumno) throws EmptyResultException{
	alumnoService.deleteAlumno(idAlumno);
	return ResponseEntity.ok().build();
	}
}