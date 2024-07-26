# Schdule service

## API

Rest Architecture
- schedule
- task
- account
- auth

GraphL Architecture

## BDD

- as a guest, create an account with name and email
- as a account, log in
- as a account logged in, create a schedule
- as a account logged in, with your own schedule, create a task that
these tasks must be validated respecting:
  - the start/end time of the schedule
  - the busy times 
    - looking for the account and agent schedule
  - the required paramters: duration, start time, schedule, agent

## Docker

### database
```
docker run -d \
	--name some-postgres \
	-e POSTGRES_PASSWORD=root \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v /mnt/shared/Projects/leonardoai-schedule-api/postgresql/data:/var/lib/postgresql/data \
	postgres
```

## Directory tree
