#!/bin/bash
# 服务器端初始化脚本 - 首次部署时在服务器上执行
# 使用方法: ssh root@38.76.205.16 'bash -s' < scripts/init-server.sh

set -e

echo "🚀 开始初始化 tmh 服务器环境..."

# 创建部署目录
echo "📁 创建部署目录..."
mkdir -p /opt/tmh
cd /opt/tmh

# 创建 .env 文件
echo "📝 创建环境变量文件..."
cat > /opt/tmh/.env << 'EOF'
DATABASE_URL=postgresql://tmh_user:DbTmhProd2026Sec@47.80.18.138:8899/tmh_prod
NEXTAUTH_SECRET=d64f1f2caca37fdcab031225935ca82e49a8c43decaac767e75f55d869a3ffee
NEXTAUTH_URL=https://tokenmaxhub.com
NODE_ENV=production
PORT=3000
EOF

echo "✅ 服务器环境初始化完成！"
echo "部署目录: /opt/tmh"
echo "环境变量已创建"
