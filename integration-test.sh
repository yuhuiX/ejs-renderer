# integration tests

rm -rf test/integration/dist
node app/index.js --contentFile test/integration/content/test.html.js --destFolder test/integration/dist --templateFolder test/integration/templates

# rm -rf test/integration/dist
# node app/index.js --contentFolder test/integration/content --destFolder test/integration/dist --templateFolder test/integration/templates
