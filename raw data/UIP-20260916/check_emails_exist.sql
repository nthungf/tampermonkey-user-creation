-- =============================================================================
-- SQL Queries to check existing & non-existing emails for United Pharma (UIP)
-- Source: UIP List-20260910.xlsx (Total 173 emails)
-- Company ID: 1237
-- =============================================================================

-- -----------------------------------------------------------------------------
-- QUERY 1: CTE matching all input emails against DB to see status of each email
-- (Status: 'EXIST' vs 'NOT EXIST')
-- -----------------------------------------------------------------------------
WITH input_emails AS (
    SELECT 'le.t.hoang.tho@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'Nathan.that.ton@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.thu.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.khanh.phung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.t.nhu.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.si.thi.lai@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.t.nhung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.huy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.bao.uyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.t.xuan.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hieu.thuan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'romeo.david@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.hong.trinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'lam.diem.phuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.nhu.quynh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ngo.hoang.minh.trung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'anna.riegodedios@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.t.huynh.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.mong.tuong.vy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ha.minh.nhat@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.loc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.xuan.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dinh.t.hoang.oanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thuy.tuong.duy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.t.huynh.minh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'doan.ngoc.minh.tam@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.tran.minh.luan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.dao.vo.nhat.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.ngoc.suong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.thuy.an@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.tran.anh.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ly.t.thuy.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.nhut.truong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.my.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.va.vi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.hong.diep@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.ng.my.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dam.t.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'duong.quang.long@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.t.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.t.thanh.huyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.van.bao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.ngoc.cuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.my.hanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.my.quy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.tu.quyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.my.duy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'luu.t.hue@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.chi.cong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hong.quang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.kim.hang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.ngoc.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.thu.ha@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.trong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.tuong.vi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.vinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.xuan.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thai.man@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.binh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.van.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'nguyen.thi.bich.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.cong.tuyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.my.loan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.my.tuyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.thanh.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.thanh.tiep@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.doan.ha@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.t.anh.van@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'thi.truong.tri@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.ngoc.thi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.thu.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'trinh.ngoc.quan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'trinh.nhat.linh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.quang.vinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.ai.loan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.minh.thuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vu.t.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.dong.manh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.ng.nhat.minh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.t.hoa1@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.trung.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'cu.t.thu.hang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.hung.van@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.minh.cuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.quoc.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.t.dien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dao.van.hau@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.van.sua@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'duong.van.loc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ha.huy.hiep@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.ngoc.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.quang.thien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.t.xuan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.t.ai.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hua.thanh.nha@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.bao.chau@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.chung.hieu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.long.minh.thu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.minh.khang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.thuy.vy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.trung.nguyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'lam.van.an@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.chi.cuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.gia.thanh.binh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.hong.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.kieu.phuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.ngoc.hung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.nhu.quynh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.nhung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.tan.duc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.van.duy.nhat@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.vu.ngoc.khoa@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.vu.nguyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'lieu.kim.hong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'luong.sy.nhan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.anh.quoc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.anh.thu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.cong.tien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hoang.vinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hong.son@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.khac.ngoc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.mac.tin@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.ngoc.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.hong.nhung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.kieu.loan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.long@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.ngoc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.thanh.truc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.chung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.tu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.tung2@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.tung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thuong.nhan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.tu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.van.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.van.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.viet.trung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.xuan.minh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ngo.tuyet.nga@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.ngoc.thang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.nhu.quynh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.hanh.duong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.ngoc.yen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.thanh.hai@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phung.kim.khoi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'quach.tan.loc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'than.van.nghia@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'to.minh.chien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.dinh.toan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.lam.t.tieu.my@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.my.tien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.quoc.tuan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.quy.hai@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.hoan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.nga@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.thuy.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.van.cong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'trinh.duc.hanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.cong.long@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.hoang.huy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.thanh.phong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.quan.do@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.thao.nguyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vu.dai.cat@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.quoc.hung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.truong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.trung.truc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.kim.quyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.phuong.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.kim.phung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.t.ngoc.hieu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.hue@unitedpharma.com.vn' AS email
)
SELECT 
    i.email AS input_email,
    CASE 
        WHEN u.id IS NOT NULL THEN 'EXIST'
        ELSE 'NOT EXIST'
    END AS check_status,
    u.id AS user_id,
    u.employee_code,
    u.name,
    department.name AS department_name,
    job_title.name AS job_title_name,
    u.status AS active_status
FROM input_emails i
LEFT JOIN user u ON LOWER(TRIM(i.email)) = LOWER(TRIM(u.email)) AND u.company_id = 1237
LEFT JOIN department ON u.department_id = department.id
LEFT JOIN job_title ON u.job_title_id = job_title.id
ORDER BY check_status ASC, i.email ASC;

-- -----------------------------------------------------------------------------
-- QUERY 2: Filter ONLY emails that do NOT exist in DB (Need to be created new)
-- Expected output: 4 emails to create
-- -----------------------------------------------------------------------------
WITH input_emails AS (
    SELECT 'le.t.hoang.tho@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'Nathan.that.ton@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.thu.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.khanh.phung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.t.nhu.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.si.thi.lai@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.t.nhung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.huy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.bao.uyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.t.xuan.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hieu.thuan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'romeo.david@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.hong.trinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'lam.diem.phuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.nhu.quynh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ngo.hoang.minh.trung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'anna.riegodedios@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.t.huynh.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.mong.tuong.vy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ha.minh.nhat@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.loc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.xuan.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dinh.t.hoang.oanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thuy.tuong.duy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.t.huynh.minh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'doan.ngoc.minh.tam@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.tran.minh.luan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.dao.vo.nhat.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.ngoc.suong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.thuy.an@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.tran.anh.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ly.t.thuy.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.nhut.truong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.my.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.va.vi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.hong.diep@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.ng.my.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dam.t.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'duong.quang.long@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.t.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.t.thanh.huyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.van.bao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.ngoc.cuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.my.hanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.my.quy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.tu.quyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.my.duy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'luu.t.hue@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.chi.cong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hong.quang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.kim.hang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.ngoc.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.thu.ha@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.trong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.tuong.vi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.vinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.xuan.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thai.man@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.binh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.van.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'nguyen.thi.bich.thuy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.cong.tuyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.my.loan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.my.tuyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.thanh.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.thanh.tiep@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.doan.ha@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.t.anh.van@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'thi.truong.tri@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.ngoc.thi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.thu.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'trinh.ngoc.quan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'trinh.nhat.linh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.quang.vinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.ai.loan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.minh.thuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vu.t.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.dong.manh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.ng.nhat.minh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.t.hoa1@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'bui.trung.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'cu.t.thu.hang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.hung.van@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.minh.cuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.quoc.dung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dang.t.dien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'dao.van.hau@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'do.van.sua@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'duong.van.loc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ha.huy.hiep@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.ngoc.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.quang.thien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ho.t.xuan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hoang.t.ai.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'hua.thanh.nha@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.bao.chau@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.chung.hieu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.long.minh.thu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.minh.khang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.t.thuy.vy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'huynh.trung.nguyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'lam.van.an@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.chi.cuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.gia.thanh.binh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.hong.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.kieu.phuong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.ngoc.hung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.nhu.quynh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.nhung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.tan.duc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.van.duy.nhat@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.vu.ngoc.khoa@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.vu.nguyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'lieu.kim.hong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'luong.sy.nhan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.anh.quoc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.anh.thu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.cong.tien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hoang.vinh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.hong.son@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.khac.ngoc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.mac.tin@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.ngoc.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.hong.nhung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.kieu.loan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.long@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.ngoc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.thanh.truc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.chung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.tu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.tung2@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.tung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thuong.nhan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.tu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.van.hien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.van.huong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.viet.trung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.xuan.minh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ngo.tuyet.nga@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.ngoc.thang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.nhu.quynh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.hanh.duong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.t.ngoc.yen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.thanh.hai@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phung.kim.khoi@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'quach.tan.loc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'than.van.nghia@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'to.minh.chien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.dinh.toan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.lam.t.tieu.my@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.my.tien@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.quoc.tuan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.quy.hai@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.hoan@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.nga@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.thuy.trang@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.van.cong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'trinh.duc.hanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.cong.long@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.hoang.huy@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'truong.thanh.phong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.quan.do@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vo.t.thao.nguyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'vu.dai.cat@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.quoc.hung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.truong@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'pham.trung.truc@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.t.kim.quyen@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.phuong.thanh@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'le.t.kim.phung@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'ng.thanh.thao@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'phan.t.ngoc.hieu@unitedpharma.com.vn' AS email
    UNION ALL SELECT 'tran.t.hue@unitedpharma.com.vn' AS email
)
SELECT 
    i.email AS missing_email
FROM input_emails i
LEFT JOIN user u ON LOWER(TRIM(i.email)) = LOWER(TRIM(u.email)) AND u.company_id = 1237
WHERE u.id IS NULL;

-- -----------------------------------------------------------------------------
-- QUERY 3: Simple SELECT for all emails in list that EXIST in database
-- -----------------------------------------------------------------------------
SELECT 
    u.id,
    u.employee_code,
    u.name,
    u.email,
    department.name AS department_name,
    job_title.name AS job_title_name,
    u.status
FROM user u
LEFT JOIN department ON u.department_id = department.id
LEFT JOIN job_title ON u.job_title_id = job_title.id
WHERE u.company_id = 1237
  AND u.email IN (
    'le.t.hoang.tho@unitedpharma.com.vn',
    'Nathan.that.ton@unitedpharma.com.vn',
    'le.t.thu.hien@unitedpharma.com.vn',
    'le.khanh.phung@unitedpharma.com.vn',
    'dang.t.nhu.thuy@unitedpharma.com.vn',
    'truong.si.thi.lai@unitedpharma.com.vn',
    'dang.t.nhung@unitedpharma.com.vn',
    'ng.thanh.huy@unitedpharma.com.vn',
    'ng.bao.uyen@unitedpharma.com.vn',
    'ho.t.xuan.huong@unitedpharma.com.vn',
    'ng.hieu.thuan@unitedpharma.com.vn',
    'romeo.david@unitedpharma.com.vn',
    'huynh.t.hong.trinh@unitedpharma.com.vn',
    'lam.diem.phuong@unitedpharma.com.vn',
    'ng.t.nhu.quynh@unitedpharma.com.vn',
    'ngo.hoang.minh.trung@unitedpharma.com.vn',
    'anna.riegodedios@unitedpharma.com.vn',
    'bui.t.huynh.thanh@unitedpharma.com.vn',
    'do.mong.tuong.vy@unitedpharma.com.vn',
    'ha.minh.nhat@unitedpharma.com.vn',
    'ng.t.loc@unitedpharma.com.vn',
    'tran.t.xuan.trang@unitedpharma.com.vn',
    'dinh.t.hoang.oanh@unitedpharma.com.vn',
    'ng.thuy.tuong.duy@unitedpharma.com.vn',
    'do.t.huynh.minh@unitedpharma.com.vn',
    'doan.ngoc.minh.tam@unitedpharma.com.vn',
    'ng.tran.minh.luan@unitedpharma.com.vn',
    'pham.dao.vo.nhat.thanh@unitedpharma.com.vn',
    'vo.t.ngoc.suong@unitedpharma.com.vn',
    'do.thuy.an@unitedpharma.com.vn',
    'le.tran.anh.thao@unitedpharma.com.vn',
    'ly.t.thuy.trang@unitedpharma.com.vn',
    'ng.nhut.truong@unitedpharma.com.vn',
    'tran.t.my.huong@unitedpharma.com.vn',
    'vo.va.vi@unitedpharma.com.vn',
    'bui.hong.diep@unitedpharma.com.vn',
    'bui.ng.my.hien@unitedpharma.com.vn',
    'dam.t.dung@unitedpharma.com.vn',
    'duong.quang.long@unitedpharma.com.vn',
    'hoang.t.huong@unitedpharma.com.vn',
    'hoang.t.thanh.huyen@unitedpharma.com.vn',
    'hoang.van.bao@unitedpharma.com.vn',
    'huynh.ngoc.cuong@unitedpharma.com.vn',
    'huynh.t.my.hanh@unitedpharma.com.vn',
    'huynh.t.my.quy@unitedpharma.com.vn',
    'huynh.t.tu.quyen@unitedpharma.com.vn',
    'le.my.duy@unitedpharma.com.vn',
    'luu.t.hue@unitedpharma.com.vn',
    'ng.chi.cong@unitedpharma.com.vn',
    'ng.hong.quang@unitedpharma.com.vn',
    'ng.t.kim.hang@unitedpharma.com.vn',
    'ng.t.ngoc.thuy@unitedpharma.com.vn',
    'ng.t.thu.ha@unitedpharma.com.vn',
    'ng.t.trong@unitedpharma.com.vn',
    'ng.t.tuong.vi@unitedpharma.com.vn',
    'ng.t.vinh@unitedpharma.com.vn',
    'ng.t.xuan.thuy@unitedpharma.com.vn',
    'ng.thai.man@unitedpharma.com.vn',
    'ng.thanh.binh@unitedpharma.com.vn',
    'ng.van.dung@unitedpharma.com.vn',
    'nguyen.thi.bich.thuy@unitedpharma.com.vn',
    'pham.cong.tuyen@unitedpharma.com.vn',
    'pham.t.my.loan@unitedpharma.com.vn',
    'pham.t.my.tuyen@unitedpharma.com.vn',
    'pham.thanh.dung@unitedpharma.com.vn',
    'pham.thanh.tiep@unitedpharma.com.vn',
    'phan.doan.ha@unitedpharma.com.vn',
    'phan.t.anh.van@unitedpharma.com.vn',
    'thi.truong.tri@unitedpharma.com.vn',
    'tran.ngoc.thi@unitedpharma.com.vn',
    'tran.t.thu.thao@unitedpharma.com.vn',
    'trinh.ngoc.quan@unitedpharma.com.vn',
    'trinh.nhat.linh@unitedpharma.com.vn',
    'vo.quang.vinh@unitedpharma.com.vn',
    'vo.t.ai.loan@unitedpharma.com.vn',
    'vo.t.minh.thuong@unitedpharma.com.vn',
    'vu.t.trang@unitedpharma.com.vn',
    'bui.dong.manh@unitedpharma.com.vn',
    'bui.ng.nhat.minh@unitedpharma.com.vn',
    'bui.t.hoa1@unitedpharma.com.vn',
    'bui.trung.dung@unitedpharma.com.vn',
    'cu.t.thu.hang@unitedpharma.com.vn',
    'dang.hung.van@unitedpharma.com.vn',
    'dang.minh.cuong@unitedpharma.com.vn',
    'dang.quoc.dung@unitedpharma.com.vn',
    'dang.t.dien@unitedpharma.com.vn',
    'dao.van.hau@unitedpharma.com.vn',
    'do.van.sua@unitedpharma.com.vn',
    'duong.van.loc@unitedpharma.com.vn',
    'ha.huy.hiep@unitedpharma.com.vn',
    'ho.ngoc.hien@unitedpharma.com.vn',
    'ho.quang.thien@unitedpharma.com.vn',
    'ho.t.xuan@unitedpharma.com.vn',
    'hoang.t.ai.thao@unitedpharma.com.vn',
    'hua.thanh.nha@unitedpharma.com.vn',
    'huynh.bao.chau@unitedpharma.com.vn',
    'huynh.chung.hieu@unitedpharma.com.vn',
    'huynh.long.minh.thu@unitedpharma.com.vn',
    'huynh.minh.khang@unitedpharma.com.vn',
    'huynh.t.thuy.vy@unitedpharma.com.vn',
    'huynh.trung.nguyen@unitedpharma.com.vn',
    'lam.van.an@unitedpharma.com.vn',
    'le.chi.cuong@unitedpharma.com.vn',
    'le.gia.thanh.binh@unitedpharma.com.vn',
    'le.hong.huong@unitedpharma.com.vn',
    'le.kieu.phuong@unitedpharma.com.vn',
    'le.ngoc.hung@unitedpharma.com.vn',
    'le.t.nhu.quynh@unitedpharma.com.vn',
    'le.t.nhung@unitedpharma.com.vn',
    'le.tan.duc@unitedpharma.com.vn',
    'le.van.duy.nhat@unitedpharma.com.vn',
    'le.vu.ngoc.khoa@unitedpharma.com.vn',
    'le.vu.nguyen@unitedpharma.com.vn',
    'lieu.kim.hong@unitedpharma.com.vn',
    'luong.sy.nhan@unitedpharma.com.vn',
    'ng.anh.quoc@unitedpharma.com.vn',
    'ng.anh.thu@unitedpharma.com.vn',
    'ng.cong.tien@unitedpharma.com.vn',
    'ng.hoang.vinh@unitedpharma.com.vn',
    'ng.hong.son@unitedpharma.com.vn',
    'ng.khac.ngoc@unitedpharma.com.vn',
    'ng.mac.tin@unitedpharma.com.vn',
    'ng.ngoc.thanh@unitedpharma.com.vn',
    'ng.t.hong.nhung@unitedpharma.com.vn',
    'ng.t.kieu.loan@unitedpharma.com.vn',
    'ng.t.long@unitedpharma.com.vn',
    'ng.t.ngoc@unitedpharma.com.vn',
    'ng.t.thanh.truc@unitedpharma.com.vn',
    'ng.thanh.chung@unitedpharma.com.vn',
    'ng.thanh.tu@unitedpharma.com.vn',
    'ng.thanh.tung2@unitedpharma.com.vn',
    'ng.thanh.tung@unitedpharma.com.vn',
    'ng.thuong.nhan@unitedpharma.com.vn',
    'ng.tu@unitedpharma.com.vn',
    'ng.van.hien@unitedpharma.com.vn',
    'ng.van.huong@unitedpharma.com.vn',
    'ng.viet.trung@unitedpharma.com.vn',
    'ng.xuan.minh@unitedpharma.com.vn',
    'ngo.tuyet.nga@unitedpharma.com.vn',
    'pham.ngoc.thang@unitedpharma.com.vn',
    'pham.nhu.quynh@unitedpharma.com.vn',
    'pham.t.hanh.duong@unitedpharma.com.vn',
    'pham.t.ngoc.yen@unitedpharma.com.vn',
    'phan.thanh.hai@unitedpharma.com.vn',
    'phung.kim.khoi@unitedpharma.com.vn',
    'quach.tan.loc@unitedpharma.com.vn',
    'than.van.nghia@unitedpharma.com.vn',
    'to.minh.chien@unitedpharma.com.vn',
    'tran.dinh.toan@unitedpharma.com.vn',
    'tran.lam.t.tieu.my@unitedpharma.com.vn',
    'tran.my.tien@unitedpharma.com.vn',
    'tran.quoc.tuan@unitedpharma.com.vn',
    'tran.quy.hai@unitedpharma.com.vn',
    'tran.t.hoan@unitedpharma.com.vn',
    'tran.t.nga@unitedpharma.com.vn',
    'tran.t.thuy.trang@unitedpharma.com.vn',
    'tran.van.cong@unitedpharma.com.vn',
    'trinh.duc.hanh@unitedpharma.com.vn',
    'truong.cong.long@unitedpharma.com.vn',
    'truong.hoang.huy@unitedpharma.com.vn',
    'truong.thanh.phong@unitedpharma.com.vn',
    'vo.quan.do@unitedpharma.com.vn',
    'vo.t.thao.nguyen@unitedpharma.com.vn',
    'vu.dai.cat@unitedpharma.com.vn',
    'ng.quoc.hung@unitedpharma.com.vn',
    'ng.thanh.truong@unitedpharma.com.vn',
    'pham.trung.truc@unitedpharma.com.vn',
    'ng.t.kim.quyen@unitedpharma.com.vn',
    'tran.t.phuong.thanh@unitedpharma.com.vn',
    'le.t.kim.phung@unitedpharma.com.vn',
    'ng.thanh.thao@unitedpharma.com.vn',
    'phan.t.ngoc.hieu@unitedpharma.com.vn',
    'tran.t.hue@unitedpharma.com.vn'
  );

-- -----------------------------------------------------------------------------
-- QUERY 4: Deactivate/Delete the 16 users marked 'Delete account'
-- -----------------------------------------------------------------------------
-- Check details of 16 accounts before deactivation:
SELECT u.id, u.employee_code, u.name, u.email, u.status
FROM user u
WHERE u.company_id = 1237
  AND u.email IN (
    'le.t.thu.hien@unitedpharma.com.vn',
    'hoang.van.bao@unitedpharma.com.vn',
    'ng.t.thu.ha@unitedpharma.com.vn',
    'huynh.minh.khang@unitedpharma.com.vn',
    'luong.sy.nhan@unitedpharma.com.vn',
    'ng.t.long@unitedpharma.com.vn',
    'ng.thanh.tung@unitedpharma.com.vn',
    'ng.thuong.nhan@unitedpharma.com.vn',
    'ngo.tuyet.nga@unitedpharma.com.vn',
    'pham.ngoc.thang@unitedpharma.com.vn',
    'than.van.nghia@unitedpharma.com.vn',
    'to.minh.chien@unitedpharma.com.vn',
    'truong.cong.long@unitedpharma.com.vn',
    'truong.thanh.phong@unitedpharma.com.vn',
    'tran.t.phuong.thanh@unitedpharma.com.vn',
    'le.t.kim.phung@unitedpharma.com.vn'
  );

-- Deactivate (soft delete status = 0):
UPDATE user
SET status = 0
WHERE company_id = 1237
  AND email IN (
    'le.t.thu.hien@unitedpharma.com.vn',
    'hoang.van.bao@unitedpharma.com.vn',
    'ng.t.thu.ha@unitedpharma.com.vn',
    'huynh.minh.khang@unitedpharma.com.vn',
    'luong.sy.nhan@unitedpharma.com.vn',
    'ng.t.long@unitedpharma.com.vn',
    'ng.thanh.tung@unitedpharma.com.vn',
    'ng.thuong.nhan@unitedpharma.com.vn',
    'ngo.tuyet.nga@unitedpharma.com.vn',
    'pham.ngoc.thang@unitedpharma.com.vn',
    'than.van.nghia@unitedpharma.com.vn',
    'to.minh.chien@unitedpharma.com.vn',
    'truong.cong.long@unitedpharma.com.vn',
    'truong.thanh.phong@unitedpharma.com.vn',
    'tran.t.phuong.thanh@unitedpharma.com.vn',
    'le.t.kim.phung@unitedpharma.com.vn'
  );
