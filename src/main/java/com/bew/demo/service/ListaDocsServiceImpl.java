package com.bew.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bew.demo.dao.ListaDocsRepository;
import com.bew.demo.dto.ListaDocsDTO;
import com.bew.demo.model.ListaDocs;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;

@Service
@Transactional
public class ListaDocsServiceImpl implements ListaDocsService {
	@Autowired
	ListaDocsRepository listaDocsRepository;
	@Override
	public List<ListaDocsDTO> findAll() {
		List<ListaDocsDTO> listaDocsDTO = new ArrayList<>();
		List<ListaDocs> listaDocs = listaDocsRepository.findAll();
		for(ListaDocs listaDoc: listaDocs) {
			Mapper mapper = DozerBeanMapperBuilder.buildDefault();
			listaDocsDTO.add(mapper.map(listaDoc, ListaDocsDTO.class));
		}
		return listaDocsDTO;
	}
	@Override
	public ListaDocsDTO findById(Integer idLista) {
		ListaDocsDTO listaDocsDTO = new ListaDocsDTO(); 
		ListaDocs listaDocs = null;
		Optional<ListaDocs> oplistaDocs = listaDocsRepository.findById(idLista);
		listaDocs = oplistaDocs.get();
		Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		listaDocsDTO = ( mapper.map(listaDocs, ListaDocsDTO.class));
		
		return listaDocsDTO;
	}
	@Override
	public void saveListaDocs(ListaDocsDTO listaDocsDTO) {
		ListaDocs listaDocs;
		Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		listaDocs = (mapper.map(listaDocsDTO, ListaDocs.class));
		listaDocsRepository.save(listaDocs);
	}
	@Override
	public void updateListaDocs(ListaDocsDTO listaDocsDTO) {
		ListaDocs listaDocs;
		Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		listaDocs = (mapper.map(listaDocsDTO, ListaDocs.class));
		listaDocsRepository.save(listaDocs);
	}
	@Override
	public void deleteListaDocs(Integer idLista) {
		
		listaDocsRepository.deleteById(idLista);
	}

}