<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e1204b04-81a3-46b1-8fb9-48b16ad1d18c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

這個專案已經設定好 **GitHub Actions** 自動部署流程，請參考以下步驟：

1. 將專案推送到 GitHub 後，請確保您的儲存庫設定允許 GitHub Actions。
2. 進入專案儲存庫的 **Settings** > **Pages**：
   - 將 Source 設為 **GitHub Actions**。
3. 如果伺服器需要環境變數（例如 `GEMINI_API_KEY`），請至 **Settings** > **Secrets and variables** > **Actions** 中新增 Repository secret。
4. 每當有新的提交推送到 `main` 或 `master` 分支時，GitHub Actions 會自動執行編譯並將結果部署到 GitHub Pages。使用 `vite.config.ts` 中的 `base` 確保網頁靜態資源能正確載入。
