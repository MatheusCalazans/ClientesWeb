import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consulta-cliente',
  imports: [
    NgxPaginationModule,//biblioteca para paginação de dados
    RouterLink,
    CommonModule //biblioteca de funções / diretivas básicas do Angular
  ],
  templateUrl: './consulta-cliente.component.html',
  styleUrl: './consulta-cliente.component.css'
})
export class ConsultaClienteComponent {

/*
variavel para guardar os dados dos clientes
que iremos exibir na pagina HTML
*/
clientes: any[] = []; //array de objetos
  /*
  Criando um método construtor no componente 
  para que possamos instanciar a classe HttpClient
  */
constructor(private httpClient: HttpClient){}

/*
    Função padrão do Angular executado no momento que
    o componente é carregado / exibido no navegador
  */
    ngOnInit() : void {
      //fazendo um requisição para consultar os clientes na API
      this.httpClient.get('http://localhost:5247/api/clientes')
      .subscribe({//aguardando o retorno da API
        next: (data) => {//capturando os dados que a API devolveu
          //data -> nome de variável para receber os dados da consulta
          this.clientes = data as any[];
    }
  })
  
}

/*
função para ser executada quando o usuario clicar no botão 
de exclusão na tabela de consulta de clientes
*/
onDelete(id: string) {
  if(confirm('Deseja realmente excluir o cliente?')){
    
    this.httpClient.delete('http://localhost:5247/api/clientes/' + id)
    .subscribe({//aguardando a resposta de sucesso
      next: (data: any) => {//capturando resposta de sucesso
        alert(data.mensagem); //exibir mensagem de sucesso
        this.ngOnInit(); //executando a consulta novamente
      }
    })
  }
}  
// função para realizar a paginação dos dados
pagina: number = 1;
pageChange(event: any) {
  this.pagina = event;

}

}