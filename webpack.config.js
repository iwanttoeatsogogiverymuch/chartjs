// createdAt         : 2022 - 04 - 29
// Author            : Limsoo
// lastModified      : 2022 - 04 - 29

import path from 'path'
import dotenv from 'dotenv'

module.exports = {
    entry: './static/index.js',
    output:{
        filenae: 'bundle.js',
        path:path.resolve(__dirname, 'dist'),
    },
    module:{
        rules:[ 
            {test:/\.css$/i, use:['style-lodaer','css-loader']},
            {test:/\.js$/i, use:'babel-loader'}
        ] 
        
    }
};