package com.bew.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

import com.bew.demo.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository <Cliente,Integer>{

	
	
}
