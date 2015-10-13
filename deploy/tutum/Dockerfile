FROM node
MAINTAINER Francisco Mendoza "software@globalstd.com"

# Informar a docker los puertos expuestos
EXPOSE 8080

# Instalar nodemon
RUN npm install -g nodemon

# Agregar archivos de código al contenedor
ADD ../../src /src

# Definir directorio de trabajo
WORKDIR /src

# Ejecutar aplicación
CMD ["bash", "c", "npm install && npm start"]
