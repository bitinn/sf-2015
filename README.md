
For SF hackathon 2015
=====================

Team repo

## API list

- `/api`
	- `/users/:id`            GET user info
	- `/users`                POST create user
	- `/users/:id`            PUT update user
	- `/rooms/:id`            GET room info
	- `/rooms/:id/users`      GET room user list
	- `/rooms/:id/users/:id`  PUT enter room
	- `/rooms/:id/users/:id`  DELETE exit room
	- `/rooms/:id/verify`     POST verify room code (request body contains `code`)
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

- `mid`
- user id (`uid`)
- room id (`rid`)

## json response object

```
{
	code: xxx                // eg. 200
	, message: 'some string' // eg. incorrect user id
	, data: object           // eg. actual response object/array
}
```
