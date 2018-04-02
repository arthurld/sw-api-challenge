const sortCssMq = require('sort-css-media-queries')

module.exports = {
    plugins: {
        autoprefixer: {
            browsers: ['last 1 version']
        },
        'css-mqpacker': {
            sort: sortCssMq
        },
        cssnano: {
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        }
    }
}
