# No DB Project - Pokemon Team
## --------------------------------------------------

## Front-End Checklist

- reset.css
- package.json => main: server/index.js
- nodemon --ignore src/ => when running server
- setupProxy.js

## File Structure
- src/
    - App.js
    - App.css
    - index.css
    - setupProxy.js
    - components/
        - Button.js


## --------------------------------------------------

## Back-End Checklist

### Dependencies
- express

### Server Folder Structure
- server/
    - index.js
    - data.json
    - team.json
    - controller/
        - pokemonController.js

### Routes
- get: '/api/pokemon'
- getById: '/api/pokemon/:id'
- post: '/api/add_pokemon' => req.body
- put: '/api/edit_pokemon/:id'
- delete: '/api/delete_pokemon/:id'

### Data

```js
const pokemon = {
    id,
    name,
    species,
    type,
    personality,
    pokemonImg,
    sprite
}
```

## --------------------------------------------------