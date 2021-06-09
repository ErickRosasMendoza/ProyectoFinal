package com.bew.demo.model;

import java.io.Serializable;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;




@Data
@Entity
@Table(name="cliente")
public class Cliente implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "cliente_sec", sequenceName = "cliente_seq", allocationSize = 1, initialValue=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cliente_sec")
	@Column(name="id_cliente")
	private Long idCliente;
	
	@Column(name="nombre")
	private String nombre;
	
	@Column(name = "status")
	private Boolean status;



	public Cliente() {}
	public Cliente( Long idCliente, String nombre, Boolean status) {
		
		
		this.nombre=nombre;	
		this.idCliente=idCliente;
		this.status = status;
}

	

}
