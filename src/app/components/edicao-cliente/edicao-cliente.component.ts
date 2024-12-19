import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-edicao-cliente',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-cliente.component.html',
  styleUrl: './edicao-cliente.component.css'
})
export class EdicaoClienteComponent {

//atributos
  mensagem: string = '';
  id : string = '';

  //metodo construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute : ActivatedRoute
  ){}

  //função executada no momento em que a página é aberta
  ngOnInit() {
  //capturar o id enviado na URL
  this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  //consultar os dados do cliente através do ID
  this.httpClient.get('http://localhost:5247/api/Clientes/' + this.id)
  .subscribe({//aguardando resposta da API
    next: (data) =>{//capturando o retorno de sucesso
      //preenchendo o formulário com os dados do cliente
      this.form.patchValue(data);
    }
  })
  }

  //estrutura do Formulario
  form = new FormGroup({
    nome: new FormControl('',[Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf : new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    categoria : new FormControl('', [Validators.required])
  });

  //função auxiliar para verificar se os campos
  //do formuláro estão com algum erro de validação
  get f(){
    return this.form.controls;
  }

  onSubmit(){
    //enviar uma requisição para a API
    this.httpClient.put('http://localhost:5247/api/Clientes/'+ this.id, this.form.value)
    .subscribe({
      next: (data: any) => {
        this.mensagem = data.mensagem;
      }
    });

  }
}
