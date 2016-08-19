Teste Técnico - Marcelo Ricardo de Oliveira

Código fonte: https://github.com/marcelooliveira/carrinho  (faça download do .zip e abra a solução usando Visual Studio 2015.)

IMPORTANTE: abra o manual com imagens das telas em: https://docs.google.com/document/d/1Uq8TL_aSG96RNyEg9U33BcqYyW4FefGGJJdaZoktvRU/edit?usp=sharing

A aplicação do Teste Técnico foi feita em 3 dias, e utiliza tecnologias com as quais tenho experiência: Asp.Net MVC, C#, Asp.Net Web Api, JavaScript, jQuery, AngularJS e Bootstrap.

A aplicação consiste de 3 views: Carrinho, Cadastro e Check-out.

Carrinho: Para o layout foi usado Bootstrap 3, para o desenvolvimento rápido da aplicação. Alguns ajustes foram feitos no arquivo .css custom da aplicação para deixar o layout mais parecido com a imagem da proposta. O back-end é desenvolvido em Asp.Net MVC com Razor view engine. Os dados do carrinho são obtidos a partir de um banco de dados Sql Server que é criado a partir de uma implementação Code First do Entity Framework. 

IMPORTANTE: É necessário criar/modificar a configuração da string de conexáo (Sql Server) de banco de dados no arquivo web.config que está na pasta raiz. Essa configuração exige que o usuário tenha permissão para criar banco de dados no servidor especificado:

  <connectionStrings>
    <add name="Contexto" providerName="System.Data.SqlClient" connectionString="data source=(LocalDB)\local; initial catalog=Carrinho; Trusted_Connection=True;" />
  </connectionStrings>

O cliente utiliza JavaScript, jQuery e o framework AngularJS para realizar os bindings entre HTML e os dados.


Tanto os botões “spinner” para incrementar/decrementar as quantidades, quanto a caixa de texto numérica das quantidades acionam uma chamada POST a um controller WebApi, que recalcula todos os dados do carrinho e retorna o subtotal, o desconto e o valor total do pedido.


Quando o usuário zera a quantidade, o produto é removido do carrinho.


Cadastro de produto: é uma view bastante simples, contendo somente as entradas para descrição do produto e o preço unitário.

Quando um novo produto é cadastrado, ele é incluído no Carrinho com uma unidade. Os subtotais são automaticamente calculados.




Os valores de desconto são aplicadas conforme as regras de desconto descritas na proposta:

- A compra mínima (soma de todos os valores e quantidades do produtos) deve ser de 200 reais, impossibilitando a ida para a tela de Conclusão de Compra no caso de valores menores.
- Caso a compra total for maior que 400 reais, deve ser aplicado alguns dos descontos:
     - Se maior que 500 reais, desconto de 5% no valor total da compra.
     - Se maior que 600 reais, desconto de 10% no valor total da compra.
     - Se maior que 700 reais, desconto de 15% no valor total da compra.
- Caso seja entre 200 e 400 reais, não aplicar nenhum desconto.

Obs.: De acordo com as regras acima, o valor mínimo para desconto deveria ser de 500 reais, e não 400 reais.








Para garantir o funcionamento correto do cálculo dos descontos, criei um projeto de testes contendo os testes unitários para várias situações de preços, testando cada um dos valores-limite de cada faixa da regra de descontos.
 



Por fim, a tela de Sucesso de Check-out, com layout aproximado conforme imagem da proposta. Ela exibe tanto o valor total do carrinho quanto os itens e quantidades previamente cadastrados.


