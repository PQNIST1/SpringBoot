# Sử dụng image Node.js chính thức để build ứng dụng
FROM node:18 AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json (hoặc yarn.lock) vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Chuyển sang image Nginx để phục vụ ứng dụng
FROM nginx:alpine

# Copy build folder từ container trước đó vào thư mục của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 cho ứng dụng
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
