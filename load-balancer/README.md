# 📘 Load Balancer Practical Demo – Node.js + NGINX (End-to-End)

This project demonstrates **Load Balancer concepts practically** using **Node.js backend services** and **NGINX as a Load Balancer / Reverse Proxy**.

This README is a **single-source guide** covering:
- Setup
- Backend services
- NGINX installation (macOS)
- Load balancing algorithms
- Sticky sessions
- Failure handling
- Load-based routing
- Limitations of load balancers

Designed for **System Design training, Backend interviews, and Live demos**.

---

## 🎯 What You Will Learn & Demonstrate

- How a load balancer distributes traffic
- Difference between load balancing algorithms
- Sticky sessions and their trade-offs
- Failure handling and high availability
- Load-based routing using least connections
- Why load balancers do NOT fix CPU/DB bottlenecks

---

## 🧠 Concepts Covered

- Round Robin
- Weighted Round Robin
- Least Connections
- Weighted Least Connections
- Sticky Sessions (IP Hash)
- Passive Health Checks
- Failover
- Crash Recovery
- Load Balancer Limitations

---

## 🛠 Prerequisites

- macOS
- Node.js (v16+ recommended)
- Homebrew
- NGINX (Open Source)
- Basic HTTP knowledge

---

## 📁 Project Structure

```
load-balancer-nodejs-demo/
 ├── package.json
 ├── server.js
 └── README.md
```

---

## 🚀 PART 1 — Project Setup

### Install Node.js dependencies
```bash
npm install
```

---

## 🚀 PART 2 — Start Backend Servers

Open **three separate terminals**.

```bash
PORT=3001 INSTANCE=APP1 node server.js
PORT=3002 INSTANCE=APP2 node server.js
PORT=3003 INSTANCE=APP3 node server.js
```

---

### Verify Backends

Open in browser:

```
http://localhost:3001
http://localhost:3002
http://localhost:3003
```

---

## 🌐 Backend API Endpoints

| Endpoint | Purpose |
|--------|--------|
| `/` | Identify backend instance |
| `/health` | Health check |
| `/slow?delay=5000` | Simulate slow request |
| `/cpu` | Simulate CPU-heavy load |
| `/session` | Sticky session demo |
| `/crash` | Crash backend intentionally |

---

## 🚀 PART 3 — Install NGINX on macOS

```bash
brew install nginx
nginx
```

Open:
```
http://localhost:8080
```

---

## 📁 NGINX Config Location

- Apple Silicon: `/opt/homebrew/etc/nginx/nginx.conf`
- Intel Mac: `/usr/local/etc/nginx/nginx.conf`

---

## 🚀 PART 4 — Configure NGINX as Load Balancer

```nginx
http {
    upstream backend_servers {
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        server 127.0.0.1:3003;
    }

    server {
        listen 8080;

        location / {
            proxy_pass http://backend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

Reload:
```bash
nginx -t
nginx -s reload
```

Open:
```
http://localhost:8080
```

---

## 🧪 PART 5 — Load Balancing Algorithm Demos

### Round Robin (Default)
```nginx
upstream backend_servers {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}
```

### Weighted Round Robin
```nginx
upstream backend_servers {
    server 127.0.0.1:3001 weight=5;
    server 127.0.0.1:3002 weight=2;
    server 127.0.0.1:3003 weight=1;
}
```

### Least Connections
```nginx
upstream backend_servers {
    least_conn;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}
```

### Sticky Session
```nginx
upstream backend_servers {
    ip_hash;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}
```

---

## ❌ Common Misconceptions

- Load balancer makes application faster
- Load balancer fixes database problems
- Sticky sessions scale well

---

## 🎯 Final Outcome

Learners will be able to:
- Explain LB algorithms
- Debug LB issues
- Design scalable systems
- Answer system design interviews

---

Free to use for learning and teaching.
