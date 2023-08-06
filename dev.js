const spawn = require('cross-spawn')
const path = require('path')
const webpack = require('webpack')
const webpackConfigServer = require('./webpack.config')

const backCompiler = webpack([
    {
        ...webpackConfigServer,
        mode: 'development',
        devtool: 'source-map'
    }
])

let node

    backCompiler.hooks.watchRun.tap('Dev', compiler => {
        console.log(`Compiling ${compiler.name} ...`)
        if (compiler.name === 'server' && node) {
            node.kill()
            node = undefined
        }
    })

    backCompiler.watch({}, (err, stats) => {
        if (err) {
            console.log(err)
            process.exit(1)
        }
        console.log(stats?.toString('minimal'))
        const compiledSuccessfully = !stats?.hasErrors()
        if (compiledSuccessfully && !node) {
            console.log('Starting Node.js ...')
            node = spawn(
                'node',
                ['--inspect', path.join(__dirname, 'dist', 'server.js')],
                {
                    stdio: 'inherit'
                }
            )
        }
    })

