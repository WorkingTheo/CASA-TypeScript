const nodemon = require('nodemon');
const execSync = require('child_process').execSync

function reload(fileExtension) {
  if (fileExtension === 'ts') {
    console.log('compiling ts');
    execSync('npm run compile:typescript');
  }

  if (fileExtension === 'yaml') {
    console.log('updating yaml');
    execSync('npm run compile:locales');
  }

  if (fileExtension === 'njk') {
    console.log('updating njk templates');
    execSync('npm run compile:views');
  }

  if (fileExtension === 'scss') {
    console.log('compiling sass');
    execSync('npm run compile:sass');
  }
}

nodemon({
  exec: 'node dist/server.js',
  ext: 'ts,js,njk,yaml',
  watch: ['./app'],
});

nodemon
  .on('quit', () => {
    console.log('Quit');
    process.exit();
  }).on('restart', (files) => {
    files.map(file => {
      const sections = file.split('.');
      return sections[sections.length - 1];
    }).forEach(reload);
  });
