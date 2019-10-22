require('dotenv').config()

const test = {
  api: {
    notebookService: 'mock/',
    notebookServiceB: 'mockB/',
    notebookServiceC: 'mockC/',
  }
};

const development = {
  api: {
    notebookService: 'http://localhost:8080/',
    notebookServiceB: 'http://localhost:8081/',
    notebookServiceC: 'http://localhost:8082/',
  }
};

const staging = {
  api: {
    notebookService: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceB: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceC: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
  }
};

const staging_bip = {
  api: {
    notebookService: 'https://o4hu4bekmndnfk7fn3q3g65esa-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceB: 'https://gnxgrwusjvartbliis3ji2k3ia-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceC: 'https://h2egkxzrmngrhibgliscuhfbia-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/'
  }
};

module.exports = {
  test: test,
  development: development,
  staging: staging,
  staging_bip: staging_bip,
};
