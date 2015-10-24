
For SF hackathon 2015
=====================

Team repo

## API list

- /api
	- /users/:id            GET get user info
	- /users                POST create user
	- /users                PUT update user
	- /rooms/:id/users      GET get user list
	- /rooms/:id/users/:id  PUT enter room
	- /rooms/:id/users/:id  DELETE exit room
	- /rooms/verify         POST verify room code (body contains `code`)
	- image update ?

## User

- `name`
- `title`
- additional info (`info`)
- `location`
- `uid`

## Room

- `rid`
- `code`

## Room / User

many to many relations

- `mid`
- user id (`uid`)
- room id (`rid`)
