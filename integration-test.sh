# integration tests

# rm -rf test/integration/dist
# node app/index.js --contentFile test/integration/content/test.html.js --templateFolder test/integration/templates --destFolder test/integration/dist

rm -rf test/integration/dist
node app/index.js --contentFolder test/integration/content --templateFolder test/integration/templates --destFolder test/integration/dist

# rm -rf test/integration/dist
# node app/index.js --contentFolder test/integration/content-wrong-extension --templateFolder test/integration/templates --destFolder test/integration/dist
