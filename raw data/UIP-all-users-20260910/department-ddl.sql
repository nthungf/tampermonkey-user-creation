CREATE TABLE `department` ( 
  `id` BIGINT AUTO_INCREMENT NOT NULL,
  `company_id` BIGINT NOT NULL,
  `name` VARCHAR(500) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0 ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP ,
  `branch_id` BIGINT NULL,
  `departmentCode` VARCHAR(100) NULL,
   PRIMARY KEY (`id`),
  CONSTRAINT `department_company_fk` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `department_FK` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = InnoDB;
CREATE INDEX `department_company_fk_idx` 
ON `department` (
  `company_id` ASC
);
CREATE INDEX `department_FK` 
ON `department` (
  `branch_id` ASC
);
