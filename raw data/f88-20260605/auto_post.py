import os
import json
import requests
import re
import shlex
import time

def parse_curl_command(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple parsing to extract headers and url
    parts = shlex.split(content)
    url = ''
    headers = {}
    for i, part in enumerate(parts):
        if part.startswith('http'):
            url = part
        elif part == '-H' or part == '--header':
            header_str = parts[i+1]
            if ':' in header_str:
                k, v = header_str.split(':', 1)
                headers[k.strip()] = v.strip()
    return url, headers

def main():
    base_dir = '/home/hung/Desktop/explore/tampermonkey-user-creation/raw data/f88-20260605'
    
    dept_url, dept_headers = parse_curl_command(os.path.join(base_dir, 'post_departments.txt'))
    job_url, job_headers = parse_curl_command(os.path.join(base_dir, 'post_job_titles.txt'))
    
    with open(os.path.join(base_dir, 'departments_list.txt'), 'r', encoding='utf-8') as f:
        departments = [line.strip() for line in f if line.strip()]
        
    with open(os.path.join(base_dir, 'job_titles_list.txt'), 'r', encoding='utf-8') as f:
        job_titles = [line.strip() for line in f if line.strip()]

    # --- PROCESS DEPARTMENTS ---
    print(f"Starting to post {len(departments)} departments...")
    dept_logs = []
    dept_success = 0
    for i, dept in enumerate(departments):
        payload = {
            "name": dept,
            "isActive": True,
            "approvers": [],
            "approvalJobTitles": [],
            "otherApprovers": [],
            "birthday": None
        }
        try:
            res = requests.post(dept_url, headers=dept_headers, json=payload, timeout=10)
            res_data = res.json() if res.text else {}
            is_success = res.status_code in [200, 201] and res_data.get('code') != 'error'
            if is_success:
                dept_success += 1
            dept_logs.append({
                "department": dept,
                "status_code": res.status_code,
                "response": res_data
            })
        except Exception as e:
            dept_logs.append({"department": dept, "error": str(e)})
        
        # Small delay to prevent rate limit
        time.sleep(0.1)
        if (i+1) % 10 == 0:
            print(f"  ...processed {i+1}/{len(departments)}")

    with open(os.path.join(base_dir, 'log_departments.json'), 'w', encoding='utf-8') as f:
        json.dump(dept_logs, f, ensure_ascii=False, indent=2)

    # --- PROCESS JOB TITLES ---
    print(f"\nStarting to post {len(job_titles)} job titles...")
    job_logs = []
    job_success = 0
    for i, job in enumerate(job_titles):
        payload = {
            "name": job,
            "isActive": True
        }
        try:
            res = requests.post(job_url, headers=job_headers, json=payload, timeout=10)
            res_data = res.json() if res.text else {}
            is_success = res.status_code in [200, 201] and res_data.get('code') != 'error'
            if is_success:
                job_success += 1
            job_logs.append({
                "job_title": job,
                "status_code": res.status_code,
                "response": res_data
            })
        except Exception as e:
            job_logs.append({"job_title": job, "error": str(e)})
            
        time.sleep(0.1)
        
    with open(os.path.join(base_dir, 'log_job_titles.json'), 'w', encoding='utf-8') as f:
        json.dump(job_logs, f, ensure_ascii=False, indent=2)

    print("\n--- SUMMARY ---")
    print(f"Departments: {dept_success}/{len(departments)} successes")
    print(f"Job Titles: {job_success}/{len(job_titles)} successes")
    print("Logs saved to log_departments.json and log_job_titles.json")

if __name__ == '__main__':
    main()
