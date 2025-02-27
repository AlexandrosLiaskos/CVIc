let selectedFiles = [];

export const setFiles = (files) => {
  console.log('Setting files in fileManager:', files.map(f => f.name));
  selectedFiles = Array.from(files); // Make sure we have a proper array of Files
};

export const getFiles = () => {
  console.log('Getting files from fileManager:', selectedFiles.map(f => f.name));
  return selectedFiles;
};
