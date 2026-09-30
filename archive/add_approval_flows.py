import requests
import json
import time

def main():
    # Configuration from the provided curl
    url = 'https://gate.tripi.vn/tripione/personal-policies/approval-flows'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'vi',
        'Referer': 'https://agents.mytour.vn/',
        'Content-Type': 'application/json',
        'login-token': 'qjqk4iubbl1lxnvfruyw-ec66e54c-f053-4f88-869d-b9751a7976c7',
        'appHash': 'bvN52dPMBxxbRlAzMc9+QkWC9pbl6nN1zGC0qyPVxHA=',
        'appId': 'tripone-web',
        'version': '1.0',
        'caid': '17',
        'device-info': 'Tripi_One',
        'device-id': '1776069480755-0.13884127090345322',
        'msg-app': 'tripione',
        'Origin': 'https://agents.mytour.vn',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Priority': 'u=0',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'TE': 'trailers'
    }

    # Reading Mapping from user-policy-map.txt
    mappings = []
    filepath = r"c:\Users\Admin\Desktop\explore\browser-automation-poc\tampermonkey-user-creation\curl\user-policy-map.txt"
    with open(filepath, 'r') as f:
        lines = f.readlines()
        # Skip header and deduplicate
        seen = set()
        for line in lines[1:]:
            parts = line.strip().split()
            if len(parts) == 2:
                policy_id = int(parts[0])
                user_id = int(parts[1])
                if (policy_id, user_id) not in seen:
                    mappings.append({"policy_id": policy_id, "user_id": user_id})
                    seen.add((policy_id, user_id))

    print(f"[{time.strftime('%H:%M:%S')}] Loaded {len(mappings)} unique mappings.")
    
    success_count = 0
    fail_count = 0

    for i, item in enumerate(mappings):
        uid = item["user_id"]
        pid = item["policy_id"]
        payload = {
            "appliedUserId": uid,
            "id": pid,
            "flow": [
                {
                    "step": 1,
                    "approvalUserIds": [9899],
                    "hotelBudget": None,
                    "flightBudget": None
                }
            ]
        }

        timestamp = time.strftime('%H:%M:%S')
        try:
            print(f"[{timestamp}] [{i+1}/{len(mappings)}] Applying for UID: {uid} (Policy: {pid})...", end=' ', flush=True)
            response = requests.put(url, headers=headers, json=payload)
            
            if response.status_code == 200:
                print("✅ SUCCESS")
                success_count += 1
            else:
                print(f"❌ FAILED ({response.status_code})")
                fail_count += 1
            
            # Log the response content
            try:
                resp_data = response.json()
                print(f"    Response: {json.dumps(resp_data, ensure_ascii=False)}")
            except:
                print(f"    Response: {response.text[:500]}")
        except Exception as e:
            print(f"💥 ERROR: {str(e)}")
            fail_count += 1
        
        # Small delay to prevent rate limiting
        time.sleep(0.4)

    print("\n" + "="*30)
    print(f"FINISHED PROCESSING")
    print(f"Total:   {len(mappings)}")
    print(f"Success: {success_count}")
    print(f"Failed:  {fail_count}")
    print("="*30)

if __name__ == "__main__":
    main()
