Small script to copy strains from Otreeba to BigQuery.

## Building

```
$ gcloud config set project cluutch
Updated property [core/project].
# Enable container registry
$ gcloud services enable containerregistry.googleapis.com

$ docker login -u cluutch -p <PASSWORD>
$ docker build --progress=plain -t us.gcr.io/cluutch/gcf/get-strains-from-otreeba .
$ docker push us.gcr.io/cluutch/gcf/get-strains-from-otreeba:latest
$ curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" https://get-strains-from-otreeba-ncchimhwiq-uc.a.run.app

$ https://get-strains-from-otreeba-ncchimhwiq-uc.a.run.app
$ docker run \
    -e PROJECT_ID=<INSERT> \
    -e BQ_DATASET_NAME=api_cluutch_io \
    -e BQ_TABLE_NAME=strains \
    -e NUM_PAGES_TO_PROCESS=3 \
    cluutch/get-strains-from-otreeba:latest
```