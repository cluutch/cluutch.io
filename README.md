## Quickstart

```
git clone https://github.com/cluutch/cluutch.io.git
cd cluutch.io
rails s
```

## Deployment

```
git push heroku main
```

## DB copy

pg_restore --verbose --clean --no-acl --no-owner -h localhost -d cluutch_io_development RESTORE_FILE