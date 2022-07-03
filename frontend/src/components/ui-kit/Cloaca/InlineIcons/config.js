let req = require.context('./icons', true, /\.svg$/);

let icons = {};

req.keys().forEach(function(key) {
    icons[`${key.split('.')[1].split('/')[1]}`] = req(key);
});

export default icons;
