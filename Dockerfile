# ---------------------------------------------------------
# 1. Builder — install deps & generate standalone build
# ---------------------------------------------------------

FROM node:20-alpine AS builder

WORKDIR /app

# Installing dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Defining firebase env variables
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyCqiVSkD0gQoYT3Sn5wGmn__GqT0iAY_88"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="dima-landing.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="dima-landing"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="dima-landing.firebasestorage.app"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="108231057737"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:108231057737:web:092a2595d94d1525d3ba98"
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-FKZRV9T2MR"
ENV GOOGLE_CLOUD_PROJECT="dima-landing"

# Copying all files
COPY . .

# Build for production
RUN npm run build

# ---------------------------------------------------------
# 2. Runner — lightweight prod server
# ---------------------------------------------------------

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

# Copy standalone server
COPY --from=builder /app/.next/standalone ./

# Copy static files
COPY --from=builder /app/.next/static ./public/_next/static

# Copy public folder
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD [ "node","server.js" ]