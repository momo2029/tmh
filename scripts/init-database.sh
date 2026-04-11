#!/bin/bash
# 数据库初始化脚本 - 在 hw-db 服务器上执行
# 使用方法: ssh root@100.101.250.112 'bash -s' < scripts/init-database.sh

set -e

echo "🔧 开始初始化 tmh 数据库..."

# 创建数据库和用户
sudo -u postgres psql -p 8899 << 'EOF'
-- 创建数据库用户
CREATE USER tmh_user WITH PASSWORD 'DbTmhProd2026Sec';

-- 创建数据库
CREATE DATABASE tmh_prod OWNER tmh_user;

-- 连接到数据库
\c tmh_prod

-- 授予权限
GRANT ALL PRIVILEGES ON DATABASE tmh_prod TO tmh_user;
GRANT ALL ON SCHEMA public TO tmh_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO tmh_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO tmh_user;
EOF

echo "✅ 数据库初始化完成！"
echo "数据库: tmh_prod"
echo "用户: tmh_user"
echo "连接: postgresql://tmh_user:DbTmhProd2026Sec@100.101.250.112:8899/tmh_prod"
