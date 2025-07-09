# Ghost Writer - AI-Powered Interview Assistant

A React Native mobile application built with Expo that helps job candidates during video interviews by providing AI-generated answers in real-time through Picture-in-Picture mode.

## Features

- **Real-time Audio Transcription**: Uses Deepgram API for fast, accurate speech-to-text conversion
- **AI-Powered Answers**: Leverages Google Gemini AI to generate tailored interview responses
- **Picture-in-Picture Mode**: Floats over other apps during video calls
- **Context-Aware Responses**: Customizes answers based on your resume and job description
- **Question Detection**: Automatically detects when a question is asked
- **Cross-Platform**: Works on both iOS and Android

## Architecture

### Core Components

1. **SetupScreen**: Main interface for entering resume, job description, and API keys
2. **PipView**: Floating window that displays AI-generated answers
3. **Zustand Store**: Global state management for app data
4. **AI Service**: Google Gemini integration for answer generation
5. **Transcription Service**: Deepgram WebSocket integration for real-time transcription
6. **PiP Service**: Picture-in-Picture mode management

### Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **AI**: Google Gemini API
- **Transcription**: Deepgram API
- **Audio**: Expo AV / react-native-live-audio-stream
- **PiP**: react-native-pip-android (Android) / Custom iOS implementation

## Prerequisites

Before running the app, you'll need:

1. **Google Gemini API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Keep this key secure

2. **Deepgram API Key**
   - Sign up at [Deepgram](https://deepgram.com/)
   - Create a new API key
   - Add it to your environment or update the default in the store

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Keys**
   - Open `src/store/appStore.ts`
   - Replace `YOUR_DEEPGRAM_API_KEY` with your actual Deepgram API key
   - Or set it in your environment variables

4. **Run the application**
   ```bash
   # For iOS
   npx expo start --ios
   
   # For Android
   npx expo start --android
   
   # For web (development)
   npx expo start --web
   ```

## Usage

### Setup Phase

1. **Launch the app** and you'll see the Setup Screen
2. **Enter your resume** in the large text field (copy and paste your full resume)
3. **Enter the job description** for the position you're interviewing for
4. **Enter your Google Gemini API key** in the secure field
5. **Tap "Start Interview Mode"** to activate the assistant

### Interview Phase

1. **Join your video call** (Zoom, Teams, etc.) on the same device
2. **The app will enter Picture-in-Picture mode** and start listening
3. **When the interviewer asks a question** ending with "?", the app will:
   - Transcribe the question using Deepgram
   - Generate a tailored answer using Gemini AI
   - Display the answer in the floating PiP window
4. **Read the suggested answer** and respond naturally in your own words

### Tips for Best Results

- **Speak clearly** and ensure good audio quality
- **Customize your resume** to highlight relevant experience
- **Include specific details** in the job description
- **Practice** with the app before your actual interview
- **Use the AI suggestions as guidance**, not verbatim responses

## Project Structure

```
ghost-writer/
├── src/
│   ├── components/
│   │   ├── SetupScreen.tsx      # Main setup interface
│   │   └── PipView.tsx          # Picture-in-Picture component
│   ├── hooks/
│   │   └── useInterviewMode.ts  # Interview logic hook
│   ├── services/
│   │   ├── aiService.ts         # Google Gemini integration
│   │   ├── transcriptionService.ts # Deepgram integration
│   │   └── pipService.ts        # Picture-in-Picture service
│   ├── store/
│   │   └── appStore.ts          # Zustand state management
│   └── types/
│       └── index.ts             # TypeScript interfaces
├── App.tsx                      # Main app component
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

### Expo Configuration

The app is configured in `app.json` with necessary permissions:

- **Microphone access** for audio transcription
- **System alert window** for Picture-in-Picture mode
- **Internet access** for API calls

## Platform-Specific Notes

### Android
- Requires API level 26+ for Picture-in-Picture support
- Uses `react-native-pip-android` library
- Needs `SYSTEM_ALERT_WINDOW` permission

### iOS
- Requires iOS 14+ for Picture-in-Picture support
- Uses native `AVPictureInPictureController`
- May require custom native module implementation

## Limitations and Future Improvements

### Current Limitations
- **Audio streaming** implementation is simplified (requires full integration)
- **PiP mode** uses placeholder implementation (needs native module completion)
- **Question detection** is basic (only checks for "?" at the end)
- **No audio processing** for noise reduction or echo cancellation

### Planned Improvements
- **Enhanced question detection** using NLP
- **Voice activity detection** to avoid false triggers
- **Multiple AI model support** (OpenAI, Claude, etc.)
- **Answer caching** for common questions
- **Custom answer templates** and styles
- **Interview analytics** and performance tracking

## Development

### Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint
```

## Security Considerations

- **API keys** are stored locally and not transmitted except to their respective services
- **Audio data** is only sent to Deepgram for transcription
- **Resume and job data** remain on device except when sent to AI service
- **Use secure networks** when using the app for sensitive interviews

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is designed to assist with interview preparation and should be used in accordance with the policies of the company you're interviewing with. Always ensure you have permission to use assistive technology during interviews.

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for troubleshooting

---

**Note**: This is a development version. Some features like full PiP integration and audio streaming require additional native module development for production use.