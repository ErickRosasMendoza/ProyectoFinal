package com.bew.demo.restController;

import java.util.List;

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

import com.bew.demo.dto.UsuarioDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioRestController {
	
	@Autowired
	UsuarioService usuarioService;
	
	@GetMapping(path = "/findAll", produces = "application/json")
	public ResponseEntity<?> buscar(){
		List<UsuarioDTO> usuarios;
		usuarios = usuarioService.findAll();
		return ResponseEntity.ok(usuarios);
	}
	@PostMapping(path = "/save", consumes = "application/json")
	public ResponseEntity<?> save(@RequestBody UsuarioDTO usuarioDTO){
	usuarioService.saveUsuario (usuarioDTO);
	return ResponseEntity.ok().build();
}
	@PatchMapping(path = "/update", consumes = "application/json")
	public ResponseEntity<?> update(@RequestBody UsuarioDTO usuarioDTO)throws EmptyResultException{
	usuarioService.updateUsuario(usuarioDTO);
	return ResponseEntity.ok().build();
	}
	
	@DeleteMapping(path = "/delete/{idUsuario}", consumes="application/json")
	public ResponseEntity<?> delete(@PathVariable("idUsuario") Integer idUsuario) throws EmptyResultException{
	usuarioService.deleteUsuario(idUsuario);
	return ResponseEntity.ok().build();
	}
}