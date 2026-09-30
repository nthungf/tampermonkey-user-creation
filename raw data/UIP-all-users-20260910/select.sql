SELECT 
    user.employee_code,
    user.name,
    CASE user.gender
        WHEN 0 THEN 'Nữ'
        WHEN 1 THEN 'Nam'
        ELSE NULL
    END AS gender,
    user.email,
    department.name AS department_name,
    job_title.name AS job_title_name,
    user.phone,
    CASE UPPER(user.role)
        WHEN 'TRIPI_ONE_STAFF' THEN 'Thành viên'
        WHEN 'TRIPI_ONE_ADMIN' THEN 'Quản trị viên'
        WHEN 'TRIPI_ONE_OWNER' THEN 'Chủ quản'
        ELSE user.role
    END AS role
FROM user
LEFT JOIN department ON user.department_id = department.id
LEFT JOIN job_title ON user.job_title_id = job_title.id
WHERE user.company_id = 1237 AND user.status = 1;
