-- TokenMaxHub 数据库初始化 SQL
-- 直接在 hw-db 服务器上执行

\c tmh_prod

-- 创建所有表
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    id VARCHAR(36) PRIMARY KEY,
    checksum VARCHAR(64) NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    migration_name VARCHAR(255) NOT NULL,
    logs TEXT,
    rolled_back_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    applied_steps_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "AIProvider" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    website TEXT NOT NULL,
    description TEXT NOT NULL,
    "logoUrl" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Model" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    multiplier DOUBLE PRECISION NOT NULL,
    "providerId" TEXT NOT NULL,
    CONSTRAINT "Model_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id)
);

CREATE TABLE IF NOT EXISTS "PriceHistory" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "providerId" TEXT NOT NULL,
    "modelId" TEXT,
    price DOUBLE PRECISION NOT NULL,
    date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceHistory_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id),
    CONSTRAINT "PriceHistory_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"(id)
);

CREATE TABLE IF NOT EXISTS "Review" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "providerId" TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    author TEXT NOT NULL,
    date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Review_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id)
);

CREATE TABLE IF NOT EXISTS "UptimeData" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "providerId" TEXT NOT NULL,
    timestamp TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    uptime DOUBLE PRECISION NOT NULL,
    "responseTime" DOUBLE PRECISION NOT NULL,
    status TEXT NOT NULL,
    CONSTRAINT "UptimeData_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id)
);

CREATE TABLE IF NOT EXISTS "Tag" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    color TEXT
);

CREATE TABLE IF NOT EXISTS "ProviderTag" (
    "providerId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    CONSTRAINT "ProviderTag_pkey" PRIMARY KEY ("providerId", "tagId"),
    CONSTRAINT "ProviderTag_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id),
    CONSTRAINT "ProviderTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"(id)
);

CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    "passwordHash" TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Favorite" (
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId", "providerId"),
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id),
    CONSTRAINT "Favorite_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id)
);

CREATE TABLE IF NOT EXISTS "PriceAlert" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "modelType" TEXT NOT NULL,
    "targetPrice" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id),
    CONSTRAINT "PriceAlert_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"(id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS "AIProvider_name_idx" ON "AIProvider"(name);
CREATE INDEX IF NOT EXISTS "Model_type_idx" ON "Model"(type);
CREATE INDEX IF NOT EXISTS "Model_providerId_idx" ON "Model"("providerId");
CREATE INDEX IF NOT EXISTS "PriceHistory_providerId_date_idx" ON "PriceHistory"("providerId", date);
CREATE INDEX IF NOT EXISTS "PriceHistory_modelId_date_idx" ON "PriceHistory"("modelId", date);
CREATE INDEX IF NOT EXISTS "Review_providerId_idx" ON "Review"("providerId");
CREATE INDEX IF NOT EXISTS "Review_date_idx" ON "Review"(date);
CREATE INDEX IF NOT EXISTS "UptimeData_providerId_timestamp_idx" ON "UptimeData"("providerId", timestamp);
CREATE INDEX IF NOT EXISTS "Tag_name_idx" ON "Tag"(name);
CREATE INDEX IF NOT EXISTS "ProviderTag_providerId_idx" ON "ProviderTag"("providerId");
CREATE INDEX IF NOT EXISTS "ProviderTag_tagId_idx" ON "ProviderTag"("tagId");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"(email);
CREATE INDEX IF NOT EXISTS "Favorite_userId_idx" ON "Favorite"("userId");
CREATE INDEX IF NOT EXISTS "PriceAlert_userId_idx" ON "PriceAlert"("userId");
CREATE INDEX IF NOT EXISTS "PriceAlert_providerId_idx" ON "PriceAlert"("providerId");
