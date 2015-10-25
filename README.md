
For SF hackathon 2015
=====================

Team repo

## API list

- `/api`
	- `/users/:id`              GET user info
	- `/users`                  POST create user
	- `/users/:id`              PUT update user
	- `/users/:to/pokes/:from`  PUT poke user
	- `/users/:to/pokes/:from`  DELETE cancel poke
	- `/users/:to/pokes/:from`  GET check poke status
	- `/users/:to/pokes`        GET check who has poked me
	- `/rooms`                  GET list all rooms
	- `/rooms`                  POST create a new room
	- `/rooms/:id`              PUT update room info
	- `/rooms/:id`              GET room info
	- `/rooms/:id/users`        GET room user list (accepts `user` filter)
	- `/rooms/:id/users/:id`    PUT enter room
	- `/rooms/:id/users/:id`    DELETE exit room
	- `/rooms/:id/verify`       POST verify room code (request body contains `code`)
	- image update ?

## users

- `name`
- `title`
- additional info (`info`)
- `location`
- `uid`
- `image`

## rooms

- `rid`
- `code`

## members

many to many relations

- `mid` (not currently used)
- user id (`uid`)
- room id (`rid`)

## pokes

many to many relations

- `pid` (not currently used)
- user id (`from`)
- user id (`to`)

## json response object

```
{
	code: xxx                // eg. 200
	, message: 'some string' // eg. incorrect user id
	, data: object           // eg. actual response object/array
}
```
