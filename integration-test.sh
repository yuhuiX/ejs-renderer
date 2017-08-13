# integration tests

echo 'case 0'
echo 'no error log'
rm -rf test/integration/dist
node app/index.js -i test/integration/content/test.html.js -t test/integration/templates -o test/integration/dist
stat test/integration/dist/test.html

echo 'case 1'
echo 'no error log'
rm -rf test/integration/dist
node app/index.js -i test/integration/content -t test/integration/templates -o test/integration/dist
stat test/integration/dist/test.html
stat test/integration/dist/test1.html

echo 'case 2'
echo 'should log that the file extension of the input is wrong'
rm -rf test/integration/dist
node app/index.js --i test/integration/content-wrong-extension --t test/integration/templates --o test/integration/dist
stat test/integration/dist/test.html
