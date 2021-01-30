package com.bew.demo.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.service.DocsLiberacionService;

@RestController
@RequestMapping("/docLiberacion")
@CrossOrigin("*")
public class DocsLiberacionRestController {
	
	@Autowired
	DocsLiberacionService docsLiberacionService;
	
    @PostMapping(path = "/upload/{idLiberacion}")
    public void FileUpload(@RequestParam("file") MultipartFile file, @PathVariable Integer idLiberacion)  throws EmptyResultException {

    	docsLiberacionService.store(file,idLiberacion);

       // return ResponseEntity.ok().build();
    }
    
    @GetMapping("/getFile/{idFile}")
    @ResponseBody
    public ResponseEntity<ByteArrayResource> serveFile(@PathVariable Integer idFile) throws EmptyResultException {

   	
        return  docsLiberacionService.load(idFile);
    }

}