Explicacion del GIT FLOW utilizado.
El diseño de ramas aplicado por el grupo N°6 será el siguiente:

1- main: representa el historial de publicaciones/entregas oficial.

2- develop: representa la rama de desarrollo principal. La misma servirá como rama de integración para las nuevas      funciones. Una vez que se termine una nueva versión del proyecto, se solicitará PR a main. 

3- features: cantidad N de ramas según las N funciones que el proyecto demande. Cada nueva rama feature partirá desde la ultima versión de develop.

Estas tres serán nuestras branch más utilizadas. Partiendo desde main, la creación de las mismas se vería de la siguiente manera:

git checkout develop → git pull origin develop → -b feature/mi-tarea

  → trabajás, committeás
  → git push origin feature/mi-tarea
  → se mergea a develop
  → Cuando develop este lista para la entrega, se solicita PR a la main 

4- hotfix: en caso de que la entrega se haya mergeado a main, pero necesite de alguna corrección urgente, esta rama se  implementará para solucionar ese requerimiento. El PR de hotfix a main implicaría una nueva versión estilo PATCH


(estas ramas serán implementadas a partir de la 2nda entrega)
 


