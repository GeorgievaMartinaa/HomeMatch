alter table post
    add constraint fk_post_user
        foreign key (creator_id) references user (id);