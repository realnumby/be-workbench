require('dotenv').config()

const test = {
  api: {
    notebookService: 'mock/',
  }
};

const development = {
  api: {
    notebookService: 'http://localhost:8080/',
  }
};

const staging = {
  api: {
    notebookService: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
  }
};

const staging-bip= {
  api: {
    notebookService: 'https://o4hu4bekmndnfk7fn3q3g65esa-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/'
  }
};

module.exports = {
  test: test,
  development: development,
  staging: staging,
};
