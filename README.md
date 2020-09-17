### SUMÁRIO

* [Introdução](#introdução)
* [Arquitetura](#arquitetura)
* [Instalação](#instalação)
* [Endpoints](#endpoints)
* [Testes](#testes)

## INTRODUÇÃO

Este documento tem como objetivo definir e especificar os requisitos de funcionamento da API REST de teste de Desenvolvedor Back-End (Suporte N2) que será desenvolvida para a empresa I-VALUE TECNOLOGIA S.A., localizada em Av. José de Souza Campos, 1549 - Cambuí, Campinas - SP, 13025-320.

Formalmente, podemos definir que o documento contém: “Os serviços e funcionalidades que a API provê”. Informações sobre a arquitetura da aplicação, bem como restrições.

### VISÃO GERAL DO SISTEMA PROPOSTO

Um estudo organizado por um grupo de pesquisadores desocupados demonstrou que as pessoas tendem a preferir diferentes gêneros musicais de acordo com a temperatura ambiente. Baseado nesta incrível descoberta, esperamos um serviço revolucionário que irá sugerir músicas ao usuário de acordo com a temperatura atual da cidade dele.

## ARQUITETURA

#### Descrição

O Serviço foi desenvolvido em [NodeJs](https://nodejs.org/en/) com a utilização de algumas Middlewares, como [express](https://www.npmjs.com/package/express) e [request](https://www.npmjs.com/package/request) que encapsulam uma REST API.

O padrão utilizado foi o [MVC](https://www.portalgsti.com.br/2017/08/padrao-mvc-arquitetura-model-view-controller.html), conforme boas práticas de programação Orientado a Objetos.

Alguns conceitos de estruturação de pastas, arquivos e rotas, foram aplicados conforme algumas orientações adquiridas em cursos realizados no [Alura Cursos](https://www.alura.com.br).

A orquestração de containers e implementação do serviço [Nginx](https://www.nginx.com/) para Load Balancing, foi utilizada conforme conhecimento adquirido no curso: [Docker: Criando containers sem dor de cabeça](https://www.alura.com.br/curso-online-docker-e-docker-compose).

#### Tecnologias Utilizadas

- [Docker Containers](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)
- [NodeJs](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## INSTALAÇÃO

#### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)


Será necessário navegar até a pasta raiz do projeto.
````
__ingaia-backed
___app
___docker
___test
... /*outros arquivos*/
___docker-compose.yml
````

Executar o build do projeto com o comando a seguir:

````
$ docker-compose build
````

Output:
````
mongodb uses an image, skipping
Building node1
Step 1/7 : FROM node:latest
 ---> 784e696f5060
Step 2/7 : MAINTAINER Chule Cabral
 ---> Running in bd2408ab9186
Removing intermediate container bd2408ab9186
 ---> 7e3c770ae12e
Step 3/7 : COPY . /var/www
 ---> 9c1eaa90662f
Step 4/7 : WORKDIR /var/www
 ---> Running in 1f2b6b86f7ad
Removing intermediate container 1f2b6b86f7ad
 ---> c4f6ff66a796
Step 5/7 : RUN npm install
 ---> Running in f6b20bdaa8dd
npm WARN BackEnd-Ingaia@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

removed 75 packages and audited 296 packages in 3.271s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Removing intermediate container f6b20bdaa8dd
 ---> 3a2b04038efa
Step 6/7 : ENTRYPOINT ["npm", "start"]
 ---> Running in 4abda45d2f5e
Removing intermediate container 4abda45d2f5e
 ---> 6eb78fc4ec9b
Step 7/7 : EXPOSE 3000
 ---> Running in 90789d311024
Removing intermediate container 90789d311024
 ---> d0394fab1d30
Successfully built d0394fab1d30

>>>
````

Assim que o build estiver concluído, execute o comando para subir os serviços.

````
$ docker-compose up -d
````

Output:
````
Creating network "ingaia-backend_ingaia-backend" with driver "bridge"
Creating mongo-ingaia ... done
Creating node-ingaia-3 ... done
Creating node-ingaia-2 ... done
Creating node-ingaia-1 ... done
Creating nginx         ... done
````

A API localhost é servida pela porta 80.

localhost:80

### ENDPOINTS

Acesse o Serviço Online: [REST API Online - Amazon AWS EC2](http://ec2-18-217-143-57.us-east-2.compute.amazonaws.com)

#### MÉTODOS

###### POST
- /user/create => Cadastrar um novo usuário.
- /user/login => Efetuar autenticação de usuário.

###### GET
- /weather/:city => Consultar clima e playlist recomendada de uma cidade;
- /user/list => Listar todos os usuários cadastrados.
- /cities/search => Listar as cidades consultadas.


#### AUTENTICAÇÃO

As rotas GET necessitam de autenticação via [JWT](https://jwt.io/), no cabeçalho da requisição deverá ser informado o Token de acesso, logo, será necessário efetuar login.

```javascript
header('Authorization') = "MEU-TOKEN";
````

/user/login

```javascript
{
    "login": "meu-login",
    "password": "meu-password"
}
````

Output:
```javascript
 {
    "auth": TRUE,
    "msg": "MSG",
    "token": "SEU-NOVO-TOKEN"
 }
````

Para efetuar o cadastro de um novo usuário:

/user/create

```javascript
{
    "login": "meu-novo-login",
    "password": "minha-nova-senha"
}
````

#### PLAYLIST RECOMENDADA PELO CLIMA ATUAL DA CIDADE

http://localhost/weather/Vitória

Output: 

```javascript
{
    "city": "Vitória",
    "temp": "TEMP ATUAL",
    "metrics": "ºC",
    "category": "Categoria
    "suggested_playlist": {
        "playlist": "Nome"
        "desc": "Descricao
        "tracks": [
           "musica1",
           "musica2",
           "musica3",
           "..."
        ]
    }
}

```

### TESTES

- Integração,
- Função,
- Promises

Pasta Raiz do projeto dentro do container Node:

/var/www

````
__ingaia-backed
___app
___docker
___test
... /*outros arquivos*/
___docker-compose.yml
````

Comando:

````
$npm run test
````

Output:

````
> BackEnd-Ingaia@1.0.0 test /var/www
> mocha test --exit

(node:47) Warning: Accessing non-existent property 'count' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:47) Warning: Accessing non-existent property 'findOne' of module exports inside circular dependency
(node:47) Warning: Accessing non-existent property 'remove' of module exports inside circular dependency
(node:47) Warning: Accessing non-existent property 'updateOne' of module exports inside circular dependency
(node:47) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.


  Teste de Função - Token
    ✓ generateJWT

  Teste de Rotas - UserController
    ✓ /user/create - POST
    ✓ /user/list - GET
(node:47) [DEP0106] DeprecationWarning: crypto.createCipher is deprecated.

  Teste de Rotas - LoginController
    ✓ /user/login - POST

  Teste de Rotas - WeatherController
    ✓ /weather/:city - GET

  Teste de Rotas - CityController
    ✓ /cities/search - GET

  Teste de Promises - PlaylistController
    ✓ construtor
    ✓ spotifyToken
    ✓ playlistForCategory
    ✓ getPlaylistTracks
    ✓ getPlaylistFromWeather


  11 passing (264ms)

````

