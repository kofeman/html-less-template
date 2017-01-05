# Шаблон для скоростной верстки

###1. Start project:

1. `git clone https://github.com/kofeman/html-less-template.git`
2. `mv html-less-template/{.,}* .; rmdir html-less-template`
3. `npm i`
4. `gulp`

###2. Images

1. Save images to the 'images' folder 
2. Save icons to the 'images/sprite' for generate sprite

###3. Html

####Use emmet to html coding like this

`form.search-form._wide>input.-query-string+input:s.-btn_large|bem`

####Use file-include 

`blocks/footer.html`

###4. Less

Just code less and compile it via gulpfile.js


