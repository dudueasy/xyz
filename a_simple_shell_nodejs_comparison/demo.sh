cd ~
mkdir $1
cd $1
mkdir css
mkdir js

# codes below could be omitted
touch css/style.css
touch index.html
touch js/main.js.bak
# codes above could be omitted

echo -e "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</hi>" > index.html
echo -e "h1{color: red;}" > css/style.css
echo -e 'var string = "Hello World"\nalert(string)' > js/main.js.bak
