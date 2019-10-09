require('dotenv').config()

const test = {
  api: {
    notebookServiceOld: 'mockOld/',
    notebookServiceA: 'mock/',
    notebookServiceB: 'mockB/',
    notebookServiceC: 'mockC/',
  }
};

const development = {
  api: {
    notebookServiceOld: 'http://localhost:8080/',
    notebookServiceA: 'http://localhost:8081/',
    notebookServiceB: 'http://localhost:8082/',
    notebookServiceC: 'http://localhost:8083/',
  }
};

const staging = {
  api: {
    notebookServiceOld: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceA: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceB: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceC: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
  }
};

const staging_bip = {
  api: {
    notebookServiceOld: 'https://bt3zzivqj5dptfsrkhyd2hjcdm-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
    notebookServiceA: 'https://o4hu4bekmndnfk7fn3q3g65esa-dot-europe-north1.dataproc.googleusercontent.com/zeppelin/',
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
