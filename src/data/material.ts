const Resourcer = require('redux-rest-resource');

export const { types, actions, rootReducer } = Resourcer.createResource({
    name: 'material',
    url: `https://5b1b0a966e0fd400146aaee2.mockapi.io/materials/:id`
});
