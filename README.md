# API

## DB

```
docker run -d \
	--name some-postgres \
	-e POSTGRES_PASSWORD=root \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v /mnt/shared/Projects/leonardoai-schedule-api/postgresql/data:/var/lib/postgresql/data \
	postgres
```

## Directory tree
