cd ~
mkdir demo
cd demo
mkdir css
mkdir js

# codes below could be omitted
touch css/style.css
touch index.html
# codes above could be omitted

touch js/main.js
echo -e "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</hi>" > index.html
echo -e "h1{color: red;}" > css/style.css
echo -e 'var string = "Hello World"\nalert(string)' > js/main.js