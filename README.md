# Autenticacion RSA
Esta es una implementación de práctica de un sistema con autenticacón RSA.

![](/resources/rsa.png)
Para efectos prácticos, el diagrama de flujos va hacia la izquierda para representar las acciones fuera del sistema. 

Como en todo sistema RSA el usuario tiene la responsabilidad de administrar sus llaves, y encriptar y desencriptar su información.

* 1-2. El usuario genera su par de llaves publicas y privadas. 
* 3\. El usuario se registra con un ID unico y personalizado, proveyendo de su llave publica. 
* 4\. El sistema almacena en la base de datos la relación id → llave publica. 
* 5\. El sistema responde satisfactoriamente y facilita la llave publica del sistema. 
* 6-7\. El usuario encripta un mensaje con la llave pública del sistema.
* 8\. El usuario realiza cualquier acción utilizando su ID y la información encriptada.
* 9-10. El sistema desencripta el mensaje utilizando la llave privada del sistema.
* 11\. El sistema procesa la información.
* 12-13. El sistema consulta por la llave pública del usuario a partir de su id.
* 14-15. El sistema encripta la respuesta con la llave pública del usuario. 
* 16\. El sistema responde con la información encriptada.
* 17-18. El usuario desencripta la respuesta con su llave privada. <br>
Finalmente, el usuario puede leer la respuesta.

### El repositorio
La implementación rudimentaria en Typescript pone a prueba el boceto diagramado anteriormente. <br>
Utiliza la librería [node-rsa](https://www.npmjs.com/package/node-rsa) para facilitar el proceso. 

Primero se levanta un servidor básico de express facilitado por mi librería [lepp](https://www.npmjs.com/package/@enzodiazdev/lepp).

Se crea la ruta `POST /authentication/register`, donde el usuario provee mediante el cuerpo de la petición, de su ID y su llave pública en base64.<br>
Si uno de estos no es provisto, responde 400.<br>
Si el ID se encuentra en la base de datos ficticia, responde 409.

Se crea el middleaware `rsa_validaton`, una función encargada de validar si el ID provisto existe en la base de datos y desencriptar la data del cuerpo de la petición utilizando la llave privada del servidor.<br>
Si no se provee de ID o data, responde 400.<br>
Si el usuario no ha sido encontrado, responde 401.
Si todo está en orden, continua.

Se crea la ruta `POST /foo/bar` que representa cualquier petición que maneje data encriptada, e implementa el middleware `rsa_validation`.<br>
Se procesa la petición...<br>
Si la data enviada por el usuario contiene la palabra clave `secret`, se encripta un mensaje utilizando la llave pública del usuario, en base64, y se responde con el código de estado 200.
Caso contrario, el servidor responde 204.

*De forma ficticia, simulamos un usuario que envia mensajes secretos y obtiene una respuesta secreta, sino no obtendrá respuesta.*

**to-do**:<br>
Es ideal que el middleware verifique el formato de la data se encuentre en base64, y que es capaz de desencriptar esa información, respondiendo adecuadamente.

En caso de ocurrir un error al encriptar con la llave publica del usuario, se debe notificar correctamente. 

**nota**:<br>
En un ejemplo real, el servidor debería estar preparado para recibir y contestar en los formatos que el usuario decida. <br>
Debería proveer, por ejemplo, en la cabecera de la petición, el formato de encriptación que está dispuesto a tratar. <br>
Además, se debe tener en cuenta los distintos tipos de llaves publicas y privadas, así también como su tamaño. Esta información debe ser provista por el usuario a la hora de registrarse para poder encriptar correctamente a la hora de responder.





