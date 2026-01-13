import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';
import { Upload, Sparkles, Image as ImageIcon, Loader2, Download, Wand2 } from 'lucide-react';
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

  const promptSuggestions = [
    "Make the lighting futuristic and neon",
    "Apply a cinematic cyber-punk aesthetic",
    "Turn the background into a liquid matrix",
    "Add a high-tech holographic interface",
    "Convert to a clean 3D claymation style"
  ];

  return (
    <div id="ai-editor" className="py-16 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 mb-4 border border-yellow-500/30">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Image Studio</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg font-medium">
            Manipulate any image using natural language. Powered by Gemini Nano Banana (2.5 Flash Image).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls Side */}
          <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
             <div className="space-y-8">
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-[2rem] p-10 text-center transition-all cursor-pointer ${imagePreview ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'}`}
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
                    <div className="relative h-48 w-full group/preview">
                       <img src={imagePreview} alt="Preview" className="h-full w-full object-contain rounded-xl" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl">
                          <p className="text-white font-bold flex items-center gap-2"><ImageIcon size={18} /> Change Image</p>
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-5 rounded-full bg-slate-800 text-slate-300">
                         <Upload className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">Upload Image</p>
                        <p className="text-slate-500 text-sm mt-1 font-medium">PNG or JPG (max 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prompt Input */}
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Wand2 size={12} /> Editing Instructions
                     </label>
                     <span className="text-[10px] text-slate-600 font-mono">Gemini 2.5 Flash</span>
                   </div>
                   <textarea
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder="E.g., 'Make it look like a futuristic credit card with glowing edges'..."
                     className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 min-h-[140px] resize-none placeholder-slate-600 font-medium transition-all"
                   />
                   
                   {/* Prompt Suggestions */}
                   <div className="flex flex-wrap gap-2">
                      {promptSuggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => setPrompt(s)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 hover:border-yellow-500/30 hover:text-yellow-400 transition-all whitespace-nowrap"
                        >
                          {s}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleProcess}
                  disabled={!selectedFile || !prompt || status === ProcessingStatus.PROCESSING}
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    !selectedFile || !prompt 
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' 
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:brightness-110 text-slate-950 shadow-xl shadow-orange-500/20 active:scale-[0.98]'
                  }`}
                >
                  {status === ProcessingStatus.PROCESSING ? (
                    <>
                      <Loader2 className="animate-spin" /> Processing AI Studio...
                    </>
                  ) : (
                    <>
                      <Sparkles /> Generate AI Edit
                    </>
                  )}
                </button>
             </div>
          </div>

          {/* Result Side */}
          <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 min-h-[500px] flex flex-col shadow-2xl sticky top-28">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <ImageIcon className="text-yellow-500" /> Final Result
                </h3>
                {editedImage && (
                  <a 
                    href={editedImage} 
                    download="fluid-studio-edit.png"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/10 transition-all"
                  >
                    <Download size={14} /> Download
                  </a>
                )}
             </div>
             
             <div className="flex-1 flex items-center justify-center bg-slate-900/30 rounded-3xl border border-slate-800 overflow-hidden relative group p-4">
                {editedImage ? (
                  <img src={editedImage} alt="Edited result" className="max-w-full max-h-[420px] object-contain rounded-xl shadow-2xl" />
                ) : (
                  <div className="text-center text-slate-600">
                    {status === ProcessingStatus.PROCESSING ? (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-full mb-6 flex items-center justify-center">
                           <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
                        </div>
                        <p className="font-bold text-lg text-slate-400">Gemini is redrawing...</p>
                        <p className="text-sm mt-2">This usually takes 5-10 seconds</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-20 h-20 mx-auto mb-6 opacity-10" />
                        <p className="font-bold text-lg">Your creation will appear here</p>
                        <p className="text-sm mt-2">Upload an image and give an instruction to start</p>
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