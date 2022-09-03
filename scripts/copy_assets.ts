import fs from 'fs-extra';
import path from 'path';

const copyEmailViews = () => {
  const source = path.join(__dirname, '../src/components/notification/views');
  const destination = path.join(__dirname, '../build/components/notification/views');
  fs.copy(source, destination, function (err: unknown) {
    if (err) {
      console.log('An error occured while copying the folder.');
      return console.error(err);
    }
    console.log('Copy completed!');
  });
};

copyEmailViews();
