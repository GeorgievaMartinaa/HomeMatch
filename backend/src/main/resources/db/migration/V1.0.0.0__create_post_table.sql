CREATE TABLE IF NOT EXISTS `post`
(
    `id`                bigint unsigned not null unique primary key,
    `title`             varchar(150)    not null,
    `description`       text            not null,
    `created_date`      timestamp       not null,
    `updated_date`      timestamp       not null,
    `location`          varchar(150)    not null,
    `price_amount`      decimal         not null,
    `price_currency`    varchar(10)     not null,
    `original_post_url` varchar(255),
    `fetched_from`      varchar(100),
    `creator_id`        bigint unsigned
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;