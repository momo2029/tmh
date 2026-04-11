# TokenMaxHub GitHub 环境变量配置
# 使用方法: 
#   cd /Users/jf/code/workspace/tmh
#   gh variable set <变量名> --body "<值>" --repo <你的完整仓库路径>
#   gh secret set <变量名> --body "<值>" --repo <你的完整仓库路径>

# ===== Variables (公开，可在 GitHub Actions 日志中看到) =====
# SSH 主机地址
gh variable set SSH_HOST_TMH --body "38.76.205.16"

# NextAuth 密钥
gh variable set NEXTAUTH_SECRET --body "d64f1f2caca37fdcab031225935ca82e49a8c43decaac767e75f55d869a3ffee"

# NextAuth URL
gh variable set NEXTAUTH_URL --body "https://tokenmaxhub.com"

# ===== Secrets (加密存储，不在日志中显示) =====
# 数据库连接字符串
gh secret set DATABASE_URL --body "postgresql://tmh_user:DbTmhProd2026Sec@47.80.18.138:8899/tmh_prod"

# SSH 私钥 (已有，不需要重复设置)
# gh secret set SSH_PRIVATE_KEY_DEPLOY --body "你的私钥内容"
