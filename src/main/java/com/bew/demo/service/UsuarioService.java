package com.bew.demo.service;
import java.util.List;
import com.bew.demo.dto.UsuarioDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.exception.MailRepetidoException;

public interface UsuarioService {
	List<UsuarioDTO> findAll();
	UsuarioDTO findById(Integer idUsuario);
	//UsuarioDTO saveUsuario(UsuarioDTO usuarioDTO, UsuarioDTO a);
	void saveUsuario(UsuarioDTO usuarioDTO) throws MailRepetidoException;
	void updateUsuario(UsuarioDTO usuarioDTO)throws EmptyResultException;
	void deleteUsuario(Integer idUsuario)throws EmptyResultException;
	UsuarioDTO UsuarioEmail (UsuarioDTO usuarioDTO);
	UsuarioDTO UsuarioContraseña (String contraseña);
	UsuarioDTO UsuarioTipo (Boolean tipoUsuario);
	UsuarioDTO findUsuarioByEmail(String email) throws EmptyResultException;

	Boolean findByUser(UsuarioDTO user);
}
