# 🍱 Genkimi (Japanese Market Edition)

Genkimi is a cross-platform mobile application built with React Native and Expo, designed to help users make healthier food choices. Tailored specifically for the Japanese market, it allows users to scan product barcodes (JAN codes) to instantly see a health score, ingredient breakdown, and healthier alternatives.

## ✨ Features

*   **📷 Lightning-Fast Barcode Scanning:** Built using Expo Camera for immediate barcode recognition.
*   **🌐 Multi-Database Scatter-Gather Engine:** Concurrently queries Open Food Facts, Yahoo! Japan Shopping, and Rakuten Ichiba APIs to maximize product discovery.
*   **📊 Smart Health Scoring:** Calculates health scores based on Nutri-Score, NOVA groups, and Eco-Score, returning an easy-to-read grade (Excellent, Good, Poor, Bad).
*   **⚠️ Ingredient Safety Breakdown:** Highlights ingredients categorized as 'safe', 'caution', or 'warning' based on known artificial additives and processing.
*   **🤖 AI Vision Upsell (Premium):** When e-commerce databases return a product but lack health data, users are gracefully upsold to scan the ingredient label using AI vision.
*   **📜 Local Scan History:** Keeps track of previously scanned products locally using AsyncStorage.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
*   Expo Go app installed on your physical device (iOS or Android), or an emulator set up.

### API Keys Setup

To fully utilize the multi-database search for Japanese products, you need developer keys for Yahoo! Japan and Rakuten.

1.  **Yahoo! Japan Shopping API:** Register for a Yahoo Developer account and generate a Client ID.
2.  **Rakuten Ichiba API:** Register for a Rakuten Developer account and generate an Application ID.

Create a `.env` file in the root directory of the project and add your keys:

```env
EXPO_PUBLIC_YAHOO_CLIENT_ID=your_yahoo_client_id_here
EXPO_PUBLIC_RAKUTEN_APP_ID=your_rakuten_app_id_here
```

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Genkimi.git
    cd Genkimi
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npx expo start
    ```

4.  Scan the QR code with the Expo Go app on your phone, or press `i` to open an iOS simulator, or `a` to open an Android emulator.

## 🛠 Tech Stack

*   **Framework:** React Native / Expo
*   **Navigation:** React Navigation (Bottom Tabs & Native Stack)
*   **Styling:** StyleSheet (Vanilla React Native styles with unified design tokens)
*   **Icons:** Lucide React Native
*   **Storage:** AsyncStorage

## 📂 Project Structure

```
src/
├── api/          # Database fetching logic (Open Food Facts, Yahoo, Rakuten)
├── components/   # Reusable UI components (ScoreBadge, IngredientItem)
├── navigation/   # Stack and Tab navigators
├── screens/      # Main application screens (Scanner, ProductDetail, History)
├── store/        # Local storage logic (AsyncStorage)
└── theme/        # Unified color palette and typography
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
