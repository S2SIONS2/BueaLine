import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getList': {
        target: 'http://stage-kmc.daeho.shop:81/api2/work_category_api/getList',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 경로 재작성
      }
    }
  }
})
