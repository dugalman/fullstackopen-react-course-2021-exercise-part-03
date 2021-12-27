# FULLSTACKOPEN

Este repositorio contine los ejercicios del curso de full stack [parte 3](https://fullstackopen.com/es/part3/node_js_y_express#ejercicios-3-1-3-6)

Se utiliza el repositorio de github [fullstackopen-react-course-2021-exercise-part-03](https://github.com/dugalman/fullstackopen-react-course-2021-exercise-part-03)

PAra probar en internet se va a utilizar heroku

# Crear un un app
```sh
$ heroku login

$ heroku create

$ git push heroku main

$ heroku ps:scale web=1

$ heroku open
```

## use async
- https://dev.to/ama/mongoose-calls-examples-with-async-await-in-an-expressjs-api-4ffh
- https://masteringjs.io/tutorials/mongoose/find-by-id
- https://mongoosejs.com/docs/validation.html


## Si falla la coneccion a la base ejecutar

heroku config:set MONGODB_URI='mongodb+srv://fullstack:LSlna2pK7RDMUbCe@cluster0.sdlbf.mongodb.net/phonebook-app?retryWrites=true&w=majority'
