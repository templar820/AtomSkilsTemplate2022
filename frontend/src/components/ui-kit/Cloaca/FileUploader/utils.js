// From Filepond

const images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff'];
const text = ['css', 'csv', 'html', 'txt'];
const map = {
    zip: 'zip|compressed',
    epub: 'application/epub+zip'
};

const isEntry = (item) => 'webkitGetAsEntry' in item;

const getAsEntry = (item) => item.webkitGetAsEntry();

const isDirectoryEntry = (item) => isEntry(item) && (getAsEntry(item) || {}).isDirectory;

const getExtensionFromFilename = (name) => name.split('.').pop();

const guesstimateMimeType = (extension = '') => {
    extension = extension.toLowerCase();
    if (images.includes(extension)) {
        return 'image/' + (extension === 'jpg' ? 'jpeg' : extension === 'svg' ? 'svg+xml' : extension);
    }
    if (text.includes(extension)) {
        return 'text/' + extension;
    }

    return map[extension] || '';
};

const correctMissingFileType = (file) => {
    if (file.type.length) return file;
    const date = file.lastModifiedDate;
    const name = file.name;
    const type = guesstimateMimeType(getExtensionFromFilename(file.name));
    if (!type.length) return file;
    file = file.slice(0, file.size, type);
    file.name = name;
    file.lastModifiedDate = date;
    return file;
};

const isFileSystemItem = (item) => {
    if (isEntry(item)) {
        const entry = getAsEntry(item);
        if (entry) {
            return entry.isFile || entry.isDirectory;
        }
    }
    return item.kind === 'file';
};

const getFilesInDirectory = (entry) =>
    new Promise((resolve, reject) => {
        const files = [];

        // the total entries to read
        let dirCounter = 0;
        let fileCounter = 0;

        const resolveIfDone = () => {
            if (fileCounter === 0 && dirCounter === 0) {
                resolve(files);
            }
        };

        // the recursive function
        const readEntries = (dirEntry) => {
            dirCounter++;
            const directoryReader = dirEntry.createReader();

            // directories are returned in batches, we need to process all batches before we're done
            const readBatch = () => {
                directoryReader.readEntries((entries) => {
                    if (entries.length === 0) {
                        dirCounter--;
                        resolveIfDone();
                        return;
                    }

                    entries.forEach((entry) => {
                        // recursively read more directories
                        if (entry.isDirectory) {
                            readEntries(entry);
                        } else {
                            // read as file
                            fileCounter++;

                            entry.file((file) => {
                                const correctedFile = correctMissingFileType(file);
                                if (entry.fullPath) correctedFile._relativePath = entry.fullPath;
                                files.push(correctedFile);
                                fileCounter--;
                                resolveIfDone();
                            });
                        }
                    });

                    // try to get next batch of files
                    readBatch();
                }, reject);
            };

            // read first batch of files
            readBatch();
        };

        // go!
        readEntries(entry);
    });

const getFilesFromItem = (item) =>
    new Promise((resolve, reject) => {
        if (isDirectoryEntry(item)) {
            getFilesInDirectory(getAsEntry(item))
                .then(resolve)
                .catch(reject);
            return;
        }

        resolve([item.getAsFile()]);
    });

export const getFiles = (dataTransfer) =>
    new Promise((resolve, reject) => {
        // get the transfer items as promises
        const promisedFiles = (dataTransfer.items ? Array.from(dataTransfer.items) : [])

            // only keep file system items (files and directories)
            .filter((item) => isFileSystemItem(item))

            // map each item to promise
            .map((item) => getFilesFromItem(item));

        // if is empty, see if we can extract some info from the files property as a fallback
        if (!promisedFiles.length) {
            // TODO: test for directories (should not be allowed)
            // Use FileReader, problem is that the files property gets lost in the process
            resolve(dataTransfer.files ? Array.from(dataTransfer.files) : []);
            return;
        }
        // done!
        Promise.all(promisedFiles)
            .then((returnedFileGroups) => {
                // flatten groups
                const files = [];
                returnedFileGroups.forEach((group) => {
                    files.push.apply(files, group);
                });

                // done (filter out empty files)!
                resolve(
                    files
                        .filter((file) => file)
                        .map((file) => {
                            if (!file._relativePath) file._relativePath = file.webkitRelativePath;
                            return file;
                        })
                );
            })
            .catch(console.error);
    });

// Our utils
export const getSizeInBytes = (size, unit) => {
    let sizeInBytes;
    switch (unit) {
        case 'b':
            sizeInBytes = size;
            break;
        case 'kb':
            sizeInBytes = size * 1024;
            break;
        case 'mb':
            sizeInBytes = size * 1024 * 1024;
            break;
        default:
            sizeInBytes = size;
            break;
    }
    return sizeInBytes;
};

export const getFileIdentity = (f) => `${f.name}_${f.size}`;

export const removeFileDuplicates = (f) => {
    const found = new Set();
    return f.filter(({ file }) => {
        const fileIdentity = getFileIdentity(file);
        const isDuplicate = found.has(fileIdentity);
        found.add(fileIdentity);
        return !isDuplicate;
    });
};

export const getFileNameParts = (fname) => {
    const splittedName = fname.split('.');
    return {
        name: splittedName.slice(0, splittedName.length - 1).join('.'),
        extension: splittedName.length === 1 ? 'noExt' : splittedName.pop(),
        initial: fname
    };
};

export const reformatFileList = (fileList) => fileList.map((file) => ({ file }));
