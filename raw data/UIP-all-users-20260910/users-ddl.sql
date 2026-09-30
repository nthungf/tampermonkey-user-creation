CREATE TABLE `user` ( 
  `id` BIGINT AUTO_INCREMENT NOT NULL,
  `company_id` BIGINT NULL,
  `department_id` BIGINT NULL,
  `job_title_id` BIGINT NULL,
  `name` VARCHAR(255) NULL,
  `tripi_user_id` BIGINT NULL,
  `phone` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `employee_code` VARCHAR(50) NULL,
  `status` TINYINT NOT NULL DEFAULT 0 ,
  `is_primary` TINYINT NOT NULL DEFAULT 0 ,
  `quick_setup` TINYINT NULL DEFAULT 0 ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP ,
  `identity` VARCHAR(50) NULL,
  `birthday` VARCHAR(50) NULL,
  `gender` TINYINT NULL,
  `identity_expired_date` VARCHAR(50) NULL,
  `role` VARCHAR(1000) NULL,
  `passport_number` VARCHAR(255) NULL,
  `passport_expire_date` VARCHAR(50) NULL,
  `country_id` BIGINT NULL,
  `nationality_id` BIGINT NULL,
  `login_attempt` INT NULL DEFAULT 0 ,
  `is_first_login` TINYINT NULL DEFAULT 0 ,
  `updated_to_sync` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP ,
  `signature_photo` TEXT NULL,
  `is_booking_locked` TINYINT NULL DEFAULT 0 ,
  `bank_name` VARCHAR(255) NULL,
  `bank_account` VARCHAR(100) NULL,
  `bank_account_name` VARCHAR(255) NULL,
   PRIMARY KEY (`id`),
  CONSTRAINT `user_company_fk` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `user_department_fk` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`nationality_id`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_job_title_fk` FOREIGN KEY (`job_title_id`) REFERENCES `job_title` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `user_UN` UNIQUE (`company_id`, `email`)
)
ENGINE = InnoDB;
CREATE INDEX `company_id_department_id` 
ON `user` (
  `company_id` ASC,
  `department_id` ASC
);
CREATE INDEX `FK_user_country` 
ON `user` (
  `country_id` ASC
);
CREATE INDEX `FK_user_country_2` 
ON `user` (
  `nationality_id` ASC
);
CREATE INDEX `user_company_fk_idx` 
ON `user` (
  `company_id` ASC
);
CREATE INDEX `user_department_fk` 
ON `user` (
  `department_id` ASC
);
CREATE INDEX `user_job_title_fk_idx` 
ON `user` (
  `job_title_id` ASC
);
