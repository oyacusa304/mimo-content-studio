"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://centerbeam.proxy.rlwy.net:21840';

type TabType = 'text' | 'image' | 'voice' | 'pipeline';

interface TextGenerationResult {
  success: boolean;
  model: string;
  prompt: string;
  generated_text: string;
  tokens_used: number;
  timestamp: string;
}

interface ImageGenerationResult {
  success: boolean;
  model: string;
  prompt: string;
  image_url: string;
  size: string;
  generation_time: number;
  timestamp: string;
}

interface VoiceGenerationResult {
  success: boolean;
  model: string;
  text: string;
  audio_url: string;
  duration_seconds: number;
  format: string;
  timestamp: string;
}

interface PipelineResult {
  success: boolean;
  pipeline_id: string;
  text_prompt: string;
  outputs: {
    text?: any;
    image?: any;
    voice?: any;
  };
  usage: {
    total_credits_used: number;
    generation_time: number;
  };
  timestamp: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Text generation state
  const [textPrompt, setTextPrompt] = useState('Write a creative story about a futuristic city powered by AI');
  const [textResult, setTextResult] = useState<TextGenerationResult | null>(null);
  
  // Image generation state
  const [imagePrompt, setImagePrompt] = useState('A futuristic city with flying cars and holographic displays, cyberpunk style');
  const [imageResult, setImageResult] = useState<ImageGenerationResult | null>(null);
  
  // Voice generation state
  const [voiceText, setVoiceText] = useState('Welcome to MiMo Content Studio. Generate text, images, and voice content using Xiaomi MiMo V2.5 models.');
  const [voiceResult, setVoiceResult] = useState<VoiceGenerationResult | null>(null);
  
  // Pipeline state
  const [pipelinePrompt, setPipelinePrompt] = useState('Create a marketing campaign for a new AI-powered smartphone');
  const [pipelineResult, setPipelineResult] = useState<PipelineResult | null>(null);
  const [generateImage, setGenerateImage] = useState(true);
  const [generateVoice, setGenerateVoice] = useState(true);

  const tabs = [
    { id: 'text', label: 'Text Generation', icon: '📝' },
    { id: 'image', label: 'Image Generation', icon: '🖼️' },
    { id: 'voice', label: 'Voice Generation', icon: '🎤' },
    { id: 'pipeline', label: 'Multi-modal Pipeline', icon: '⚡' },
  ];

  const handleTextGeneration = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/generate/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textPrompt,
          max_tokens: 500,
          temperature: 0.7
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate text');
      const data = await response.json();
      setTextResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/generate/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          size: '1024x1024',
          quality: 'hd'
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate image');
      const data = await response.json();
      setImageResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceGeneration = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/generate/voice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: voiceText,
          voice: 'default',
          speed: 1.0
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate voice');
      const data = await response.json();
      setVoiceResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handlePipelineGeneration = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/pipeline/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text_prompt: pipelinePrompt,
          generate_image: generateImage,
          generate_voice: generateVoice
        })
      });
      
      if (!response.ok) throw new Error('Failed to create pipeline');
      const data = await response.json();
      setPipelineResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MiMo Content Studio
            </h1>
            <p className="text-gray-400 mt-2">
              Multi-modal AI content generator powered by Xiaomi MiMo V2.5 models
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
            <div className="text-sm text-gray-300">API Status</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Connected</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          {/* Text Generation Tab */}
          {activeTab === 'text' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Text Generation</h2>
                <p className="text-gray-400 mb-4">
                  Generate creative text content using MiMo V2.5 Text Model
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your text prompt..."
                  />
                </div>

                <button
                  onClick={handleTextGeneration}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : 'Generate Text'}
                </button>
              </div>

              {textResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <h3 className="text-lg font-medium mb-2">Generated Text</h3>
                  <div className="text-gray-300 whitespace-pre-wrap">
                    {textResult.generated_text}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Model: {textResult.model}</span>
                      <span>Tokens: {textResult.tokens_used}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Image Generation Tab */}
          {activeTab === 'image' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Image Generation</h2>
                <p className="text-gray-400 mb-4">
                  Generate stunning images using MiMo V2.5 Image Model
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image Prompt
                  </label>
                  <textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the image you want to generate..."
                  />
                </div>

                <button
                  onClick={handleImageGeneration}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : 'Generate Image'}
                </button>
              </div>

              {imageResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <h3 className="text-lg font-medium mb-4">Generated Image</h3>
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={imageResult.image_url}
                      alt={imageResult.prompt}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="text-sm text-gray-400 space-y-2">
                      <div className="flex justify-between">
                        <span>Model: {imageResult.model}</span>
                        <span>Size: {imageResult.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prompt: {imageResult.prompt}</span>
                        <span>Time: {imageResult.generation_time}s</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Voice Generation Tab */}
          {activeTab === 'voice' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Voice Generation</h2>
                <p className="text-gray-400 mb-4">
                  Generate natural-sounding voice using MiMo V2.5 Voice Model
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Text to Convert
                  </label>
                  <textarea
                    value={voiceText}
                    onChange={(e) => setVoiceText(e.target.value)}
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter text to convert to speech..."
                  />
                </div>

                <button
                  onClick={handleVoiceGeneration}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : 'Generate Voice'}
                </button>
              </div>

              {voiceResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <h3 className="text-lg font-medium mb-4">Generated Audio</h3>
                  <div className="flex items-center gap-4">
                    <audio controls className="flex-1">
                      <source src={voiceResult.audio_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <a
                      href={voiceResult.audio_url}
                      download="mimo-voice.mp3"
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Download
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Model: {voiceResult.model}</span>
                      <span>Duration: {voiceResult.duration_seconds}s</span>
                    </div>
                    <div className="mt-2">
                      <span>Text: {voiceResult.text.substring(0, 100)}...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Pipeline Tab */}
          {activeTab === 'pipeline' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Multi-modal Pipeline</h2>
                <p className="text-gray-400 mb-4">
                  Generate text, image, and voice content in one go
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pipeline Prompt
                  </label>
                  <textarea
                    value={pipelinePrompt}
                    onChange={(e) => setPipelinePrompt(e.target.value)}
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your multi-modal content prompt..."
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={generateImage}
                      onChange={(e) => setGenerateImage(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Generate Image</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={generateVoice}
                      onChange={(e) => setGenerateVoice(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Generate Voice</span>
                  </label>
                </div>

                <button
                  onClick={handlePipelineGeneration}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Running Pipeline...' : 'Run Multi-modal Pipeline'}
                </button>
              </div>

              {pipelineResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 space-y-4"
                >
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-2">Pipeline Results</h3>
                    <div className="text-sm text-gray-400 mb-4">
                      <div className="flex justify-between">
                        <span>Pipeline ID: {pipelineResult.pipeline_id}</span>
                        <span>Credits: {pipelineResult.usage.total_credits_used}</span>
                      </div>
                    </div>

                    {/* Text Output */}
                    {pipelineResult.outputs.text && (
                      <div className="mb-4 p-3 bg-gray-900/50 rounded">
                        <div className="text-sm text-gray-300 mb-1">📝 Text</div>
                        <div className="text-gray-400 text-sm">
                          {pipelineResult.outputs.text.generated_text}
                        </div>
                      </div>
                    )}

                    {/* Image Output */}
                    {pipelineResult.outputs.image && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-300 mb-2">🖼️ Image</div>
                        <div className="bg-gray-900 rounded overflow-hidden">
                          <img
                            src={pipelineResult.outputs.image.image_url}
                            alt="Generated"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    )}

                    {/* Voice Output */}
                    {pipelineResult.outputs.voice && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-300 mb-2">🎤 Voice</div>
                        <audio controls className="w-full">
                          <source src={pipelineResult.outputs.voice.audio_url} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white">Generating content with MiMo V2.5...</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800">
        <div className="text-center text-gray-500 text-sm">
          <p>
            Powered by Xiaomi MiMo V2.5 Models • Built for 100T Creator Incentive Program
          </p>
          <p className="mt-2">
            Submission Deadline: May 28, 2026 • API: {API_URL}
          </p>
        </div>
      </footer>
    </div>
  );
}
