# API

Proyecto de una API para registro y listado de usuarios, utilizando arquitectura de Microservicios y Clean Architecture.

Cada Microservicio se diseñó de forma individual, cada uno con su base de datos y comunicación a través de un EventBus para evitar cuellos de botella y también evitar la imposibilidad de utilizar uno si el otro se encuentra caído. Además, se estructuró cada uno utilizando Clean Architecture, aislando el dominio y los casos de uso de la aplicación, de la infraestructura (base de datos, frameworks, etc).

## Autor

Tomás Falchini || [LinkedIn](https://www.linkedin.com/in/tomasfalchini/)

## Arquitectura de cada MicroServicio:

Dentro de cada microservicio, se utilizó Clean Architecture, que está enfocada en separar las diferentes partes de un sistema en capas independientes, con el fin de mejorar la mantenibilidad, escalabilidad y testabilidad del mismo. La capa central, la capa de dominio donde encontramos las abstracciones de la lógica de negocios de nuestra aplicación, es completamente independiente de las capas de adaptadores y de la infraestructura (base de datos, frameworks, etc), lo que significa que puede ser probada y modificada sin afectar a la interfaz de usuario o a otros componentes externos. Esto hace que la aplicación sea más modular y flexible, lo que facilita su mantenimiento y evolución a lo largo del tiempo.

![Clean Arch](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220219214201/Clean-Architecture-in-Android.png)

## Arquitectura de la aplicación:

Se diseñó la aplicación siguiendo una arquitectura de Microservicios con EDD (Event Driven Design), un enfoque para construir aplicaciones que se basa en la separación de una aplicación en pequeños servicios independientes que se comunican a través de eventos. Cada microservicio se enfoca en una única tarea específica y se comunica con otros servicios a través de eventos. Los eventos son mensajes que se envían entre los servicios para notificar a otros servicios sobre cambios importantes en el estado de la aplicación.

En lugar de utilizar una API o una base de datos compartida, los servicios se comunican a través de eventos, lo que permite que los servicios puedan ser escalados y evolucionados de manera independiente.

Utilicé Confluent Cloud, que es un servicio de Kafka en la nube, para conectar dos microservicios que tienen diferentes bases de datos (ambas bases de datos de MongoDB Atlas). En particular, utilicé Kafka para sincronizar los datos de usuario entre el Microservicio de Login (Microservicio A) y el Microservicio de Listado de Usuarios (Microservicio B).

En el Microservicio A, cada vez que se registra un nuevo usuario, se publica un nuevo mensaje en un canal del Event Bus de Kafka. Este canal está configurado para estar sincronizado con la base de datos del Microservicio B. De esta manera, cada vez que hay un mensaje nuevo para consumir en ese canal, el Microservicio B lee el mensaje y guarda el nuevo usuario registrado en su base de datos.

Es importante destacar que no utilicé el mismo tipo de comunicación por eventos para sincronizar los datos del listado de usuarios desde el Microservicio B hasta el Microservicio A. Esto se debe a que el endpoint del Microservicio B solo es accesible desde el Microservicio A, por lo que la comunicación por eventos no sería la mejor opción. En su lugar, el Microservicio A consulta directamente al Microservicio B, ya que es un endpoint restringido al uso unicamente del Microservicio A.

![Microservices](https://www.edureka.co/blog/wp-content/uploads/2019/08/Microservices-Microservices-vs-API-Edureka.png)

## Instrucciones de uso

Para correr con Nodemon ambos Microservicios:

Asegurarse de estar parado en la carpeta /API

npm install
npm run both

Para correr con Nodemon cada microservicio por separado:

npm install
npm run microserviceX

Donde X = A o B

Para correr los tests:

Asegurarse de estar parado en la carpeta /API/Microservice...

npm run test

## Endpoints

- `/register`: Registro de usuarios.
- `/login`: Login de usuarios con seteo de JWT.
- `/list`: Lista de usuarios, solicitada desde el Microservicio 1 al Microservicio 2.
