CREATE TABLE `user_budget_policies_ticket_class_setting` ( 
  `id` BIGINT AUTO_INCREMENT NOT NULL,
  `user_budget_policies_id` BIGINT NOT NULL,
  `ticket_class_setting_id` BIGINT NOT NULL,
  `created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP ,
   PRIMARY KEY (`id`),
  CONSTRAINT `FK_user_budget_policies_ticket_class_setting1` FOREIGN KEY (`user_budget_policies_id`) REFERENCES `user_budget_policies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_user_budget_policies_ticket_class_setting2` FOREIGN KEY (`ticket_class_setting_id`) REFERENCES `ticket_class_setting` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = InnoDB;
CREATE INDEX `FK_user_budget_policies_ticket_class_setting1` 
ON `user_budget_policies_ticket_class_setting` (
  `user_budget_policies_id` ASC
);
CREATE INDEX `FK_user_budget_policies_ticket_class_setting2` 
ON `user_budget_policies_ticket_class_setting` (
  `ticket_class_setting_id` ASC
);


id,cid,code,name_code,created,updated
5,1,economy,Economy,2020-12-09 10:41:27,2020-12-09 10:41:27
6,2,premium_economy,Premium Economy,2020-12-09 10:41:27,2020-12-09 10:41:27
7,3,business,Business,2020-12-09 10:41:27,2020-12-09 10:41:27
8,4,first,First Class,2020-12-09 10:41:27,2020-12-09 10:41:27