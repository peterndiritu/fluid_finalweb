import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';
import { Upload, Sparkles, Image as ImageIcon, Loader2, Download } from 'lucide-react';
import { ProcessingStatus } from '../types';

const GeminiImageEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please upload an image under 5MB.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Reset state
        setEditedImage(null);
        setStatus(ProcessingStatus.IDLE);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile || !prompt || !imagePreview) return;

    setStatus(ProcessingStatus.PROCESSING);
    try {
      // Extract base64 (remove data:image/xxx;base64, prefix)
      const base64Data = imagePreview.split(',')[1];
      const mimeType = selectedFile.type;

      const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);

      if (resultBase64) {
        setEditedImage(`data:${mimeType};base64,${resultBase64}`);
        setStatus(ProcessingStatus.SUCCESS);
      } else {
        alert("Failed to generate image. Try a different prompt.");
        setStatus(ProcessingStatus.ERROR);
      }
    } catch (error) {
      console.error(error);
      setStatus(ProcessingStatus.ERROR);
      alert("An error occurred during processing.");
    }
  };

  return (
    <div id="ai-editor" className="py-8 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 mb-4 border border-yellow-500/30">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            AI Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Powered by Gemini</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg font-medium">
            Experience the power of Gemini 2.5 Flash Image (Nano Banana). Upload an image and use natural language to edit it instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls Side */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl">
             <div className="space-y-6">
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${imagePreview ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-slate-700 hover:border-slate-500 bg-slate-900'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden" 
                  />
                  {imagePreview ? (
                    <div className="relative h-48 w-full">
                       <img src={imagePreview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          <p className="text-white font-bold">Click to change image</p>
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-full bg-slate-800">
                         <Upload className="w-8 h-8 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Click to upload</p>
                        <p className="text-slate-400 text-sm mt-1 font-medium">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prompt Input */}
                <div>
                   <label className="block text-slate-300 text-sm font-bold mb-2">Editor Prompt</label>
                   <textarea
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder="E.g., 'Add a retro filter', 'Make the background snowy', 'Put sunglasses on the cat'"
                     className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 min-h-[120px] resize-none placeholder-slate-500 font-medium"
                   />
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleProcess}
                  disabled={!selectedFile || !prompt || status === ProcessingStatus.PROCESSING}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    !selectedFile || !prompt 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black shadow-lg shadow-orange-500/20'
                  }`}
                >
                  {status === ProcessingStatus.PROCESSING ? (
                    <>
                      <Loader2 className="animate-spin" /> Processing with Gemini...
                    </>
                  ) : (
                    <>
                      <Sparkles /> Generate Edit
                    </>
                  )}
                </button>
             </div>
          </div>

          {/* Result Side */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col shadow-xl">
             <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
               <ImageIcon className="text-cyan-500" /> Result
             </h3>
             
             <div className="flex-1 flex items-center justify-center bg-black/40 rounded-2xl border border-slate-800 overflow-hidden relative group">
                {editedImage ? (
                  <>
                     <img src={editedImage} alt="Edited result" className="max-w-full max-h-[400px] object-contain" />
                     <a 
                       href={editedImage} 
                       download="fluid-ai-edit.png"
                       className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200"
                     >
                        <Download size={20} />
                     </a>
                  </>
                ) : (
                  <div className="text-center text-slate-500">
                    {status === ProcessingStatus.PROCESSING ? (
                      <div className="flex flex-col items-center animate-pulse">
                        <div className="w-16 h-16 bg-slate-800 rounded-full mb-4"></div>
                        <p className="font-medium">AI is thinking...</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="font-medium">Generated image will appear here</p>
                      </>
                    )}
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GeminiImageEditor;