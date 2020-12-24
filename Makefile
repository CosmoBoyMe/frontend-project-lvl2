install : 
	npm install

lint : 
	npx eslint .

gendiff :
	node bin/gendiff
