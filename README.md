# TopImage

App which allows people to create design constests and search for previous winners

## Data Model

Two main data models: Users and Contests

```
Users: {
    "_id":Mongo default,
    "username":String,
    "password":String,
    "contests":Contest[] //Yes?
}
```

```
Contests: {
    "_id":Mongo default,
    "name":String,
    "username":String,
    "endDate":Date,
    "images":Image[]
}
```

```
Images:{
    "_id":Mongo default,
    "url":String,
    "likedBy":Array of Usernames,
    "likes":Number
}
```
