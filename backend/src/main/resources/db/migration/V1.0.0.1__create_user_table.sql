create table if not exists `user`
(
    `id`           bigint unsigned not null unique primary key,
    `first_name`   varchar(50)     not null,
    `last_name`    varchar(70)     not null,
    `username`     varchar(100)    not null unique,
    `password`     varchar(255)    not null,
    `about_me`     text,
    `email`        varchar(70)     not null unique,
    `phone_number` varchar(15),
    `birth_date`   date,
    `role`         varchar(15)     not null
)