# 1. Use the official Node.js image as base
FROM node:18-alpine AS deps

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies only (cached separately)
COPY package.json package-lock.json* ./
RUN npm ci

# 4. Copy the rest of the app and build it
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# 5. Run the app using a minimal image
FROM node:18-alpine AS runner

WORKDIR /app

# If using `next/font`, you need this
# ENV NEXT_TELEMETRY_DISABLED 1
# ENV NODE_ENV production

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
