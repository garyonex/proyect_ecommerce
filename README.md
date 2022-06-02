# Project Title

Tienda virtual ( ecommerce) proyecto base
Servidor creado mediante nodeJs

**Server:** Node, Express

## Dependencias

express
morgan
multer
socket.io
babel
handlebars

## Start the server

Si quiere desplegar el proyecto en su localhost

```bash
  npm run start
```

#### Get all items

```http
  GET /productos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Return**.lista productos |

#### Get item

```http
  GET /producto/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Return**. return JSON productos `id` |

#### Clone the project

```bash
  git clone https://github.com/garyonex/proyect_ecommerce
```
