package com.bew.demo.service;

import com.bew.demo.dao.UsuarioRepository;
import com.bew.demo.dto.UsuarioDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.exception.MailRepetidoException;
import com.bew.demo.model.Usuario;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.transaction.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioDTO> findAll() {

        List<UsuarioDTO> usuarioDTO;
        List<Usuario> usuarios = usuarioRepository.findAll();
        usuarioDTO = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            usuarioDTO.add(mapper.map(usuario, UsuarioDTO.class));
        }
        // TODO Auto-generated method stub
        return usuarioDTO;
    }

    @Override
    public UsuarioDTO findById(Long idUsuario) {

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        Usuario usuario = null;
        Optional<Usuario> opUsuario = usuarioRepository.findById(idUsuario);
        usuario = opUsuario.get();

        Mapper mapper = DozerBeanMapperBuilder.buildDefault();
        usuarioDTO = (mapper.map(usuario, UsuarioDTO.class));

        return usuarioDTO;
    }

    @Override
    public UsuarioDTO UsuarioEmail(UsuarioDTO usuarioDTO) {


        Usuario usuario = null;
        Optional<Usuario> opUsuario = usuarioRepository.findByEmail(usuarioDTO.getEmail());
        usuario = opUsuario.get();

        if (usuario.getPassword().equals(usuarioDTO.getPassword())) {


            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            usuarioDTO = (mapper.map(usuario, UsuarioDTO.class));
            usuarioDTO.setStatus(true);
            usuarioDTO.setPassword("");
        } else {

            usuarioDTO.setStatus(false);
            usuarioDTO.setPassword("");

        }


        return usuarioDTO;
    }

    @Override
    public UsuarioDTO UsuarioContraseña(String contraseña) {

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        Usuario usuario = null;
        Optional<Usuario> opUsuario = usuarioRepository.findByContraseña(contraseña);
        usuario = opUsuario.get();

        Mapper mapper = DozerBeanMapperBuilder.buildDefault();
        usuarioDTO = (mapper.map(usuario, UsuarioDTO.class));
        return usuarioDTO;
    }

    @Override
    public UsuarioDTO UsuarioTipo(Boolean tipoUsuario) {

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        Usuario usuario = null;
        Optional<Usuario> opUsuario = usuarioRepository.findByTipo(tipoUsuario);
        usuario = opUsuario.get();

        Mapper mapper = DozerBeanMapperBuilder.buildDefault();
        usuarioDTO = (mapper.map(usuario, UsuarioDTO.class));
        return usuarioDTO;
    }

    @Override
    public void saveUsuario(UsuarioDTO usuarioDTO) throws  MailRepetidoException {

        if (usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()) {
            throw new MailRepetidoException("Este usuario ya esta registrado");
        } else {
            Usuario usuario;
             
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            usuario = (mapper.map(usuarioDTO, Usuario.class));
            String encPassword = DigestUtils.md5DigestAsHex(usuarioDTO.getPassword().getBytes());
            usuario.setPassword(encPassword);
            usuario.setTipoUsuario(false);
            
            usuarioRepository.save(usuario);
           
        }

    }


    @Override
    public void updateUsuario(UsuarioDTO usuarioDTO) throws EmptyResultException {
     
        Usuario usuario;
        Long idUsuario = usuarioDTO.getIdUsuario(); 
        
        Optional<Usuario> opUsuario = usuarioRepository.findById(idUsuario);
        usuario = opUsuario.get();
        
        String encPassword = DigestUtils.md5DigestAsHex(usuarioDTO.getPassword().getBytes());
        usuarioDTO.setPassword(encPassword);
       
        System.out.println("id del dot que viene del usuario" + usuario.getPassword());
        System.out.println("id del dot que viene del usuarioDTO" + usuarioDTO.getPassword());
        
        if (usuario.getPassword().equals(usuarioDTO.getPassword())) {
        	System.out.println("passwor dentro del if " + idUsuario);
        	usuario.setPassword(DigestUtils.md5DigestAsHex(usuarioDTO.getPassword2().getBytes()));
        	usuarioRepository.save(usuario);
        }
        else {
        	throw new EmptyResultException("Password incorrecto");
        }
    }

    @Override
    public void deleteUsuario(Long idUsuario) throws EmptyResultException {
        // TODO Auto-generated method stub
        usuarioRepository.deleteById(idUsuario);
    }

    @Override
    public UsuarioDTO findUsuarioByEmail(String email) throws EmptyResultException {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        Usuario usuario = null;


        usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new EmptyResultException("Sin Resultados"));


//		Optional<Usuario> opUsuario  = usuarioRepository.findByEmail(email);
//		usuario = opUsuario.get();
        if (usuario == null) {
            usuarioDTO = null;
        } else {
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            usuarioDTO = (mapper.map(usuario, UsuarioDTO.class));
        }
        return usuarioDTO;
    }

    @Override
    public Boolean findByUser(UsuarioDTO user) {
        String password = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        return usuarioRepository.findByEmailPassword(user.getEmail(),password);
    }

	@Override
	public void resetPassword(UsuarioDTO usuarioDTO) throws EmptyResultException {
		Usuario usuario = null;
		usuario=usuarioRepository.findById(usuarioDTO.getIdUsuario()).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
       
        String encPassword = DigestUtils.md5DigestAsHex(usuarioDTO.getPassword().getBytes());
        
        usuario.setPassword(encPassword);
        
        usuarioRepository.save(usuario);
		
	}

}
