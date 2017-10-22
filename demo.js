#!/usr/bin/env node
fs = require('fs')
process.chdir('/Users/apolodu/')

fs.mkdirSync('demo_node')

process.chdir('demo_node')
fs.mkdirSync('css')
fs.mkdirSync('js')

html = "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi<h1>"
css = "h1{color: red;}"
js = 'var string = "Hello World"\nalert(string)'


fs.writeFileSync('index.html',html)
fs.writeFileSync('css/style.css',css)
fs.writeFileSync('js/main.js',js)
