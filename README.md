## Instrucciones

Para instalar todas las dependencias:

```bash
npm i
```

Para correr el servidor local:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado en tu navegador.

Para correr pruebas de jest:

```bash
npm run test
```

Descripción de funcionalidades:

```
Esta es una aplicación construida con Next.js 15 y React 19, que aprovecha las últimas herramientas web. El proyecto incluye un dashboard compuesto por dos componentes principales: <Search /> y <CitiesInfo />. En el Home, se realiza un fetch inicial con ciudades preestablecidas. El componente <Search /> contiene un formulario que interactúa con la API de OpenWeather utilizando su método find. Este método permite buscar ciudades con datos climáticos, basándose en los parámetros enviados en la consulta.

Además, el usuario puede filtrar los resultados según una temperatura específica, pudiendo elegir entre opciones como mayor, menor o igual a un valor determinado. Una vez recuperadas las ciudades, el usuario puede seleccionar una de ellas desde un dropdown. Al seleccionar una ciudad, el cityId correspondiente se agrega a los parámetros de la URL (query param), lo cual será recibido por una Server Action.

El componente <CitiesInfo /> realiza un nuevo fetch a la API de OpenWeather, filtrando los resultados por el cityId proporcionado, y muestra la información relacionada con esa ciudad. Si el usuario lo desea, se pueden realizar más acciones sobre la información recuperada.
```

