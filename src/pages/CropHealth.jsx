import { useState } from 'react';
import { Camera, Image as ImageIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function CropHealth() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        problem: "Early Blight (Fungal Disease)",
        confidence: "92%",
        severity: "Moderate",
        actions: [
          "Remove and destroy infected lower leaves",
          "Apply appropriate copper-based fungicide",
          "Ensure proper spacing for air circulation",
          "Avoid overhead watering to keep foliage dry"
        ]
      });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Fasal Ki Sehat</h1>
        <p className="text-lg text-gray-600 mt-2">Fasal ki photo upload karke possible pest ya disease problem check karein.</p>
      </div>

      {!result ? (
        <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
          
          {analyzing ? (
            <div className="space-y-6">
              <div className="relative h-48 w-48 mx-auto rounded-2xl overflow-hidden border-4 border-brand-green/30">
                <img src={selectedImage} alt="Analyzing" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-green/20 animate-pulse"></div>
              </div>
              <div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-brand-green mx-auto mb-4"></div>
                <h2 className="text-xl font-bold text-gray-900">Scanning crop image for diseases...</h2>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="space-y-6 w-full max-w-sm">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
                <img src={selectedImage} alt="Selected Crop" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80"
                >
                  ✕
                </button>
              </div>
              <button onClick={startAnalysis} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg transition">
                Analyze This Image
              </button>
            </div>
          ) : (
            <>
              <div className="h-32 w-32 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-16 w-16 text-gray-400" />
              </div>
              <div className="space-y-4 w-full max-w-sm">
                <label className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 cursor-pointer shadow-sm transition">
                  <Camera className="h-6 w-6" /> Take Photo
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
                </label>
                <p className="font-bold text-gray-400">OR</p>
                <label className="w-full bg-white text-gray-700 border-2 border-gray-200 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer transition">
                  <ImageIcon className="h-6 w-6" /> Upload Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
                <button 
                  onClick={() => {
                    setSelectedImage('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80');
                  }} 
                  className="w-full mt-4 text-brand-green font-bold hover:underline hover:text-green-700 text-sm py-2"
                >
                  Use Demo Image
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-orange-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-orange-100 p-4 rounded-full">
                <AlertTriangle className="h-12 w-12 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-2">Possible Issue Detected</p>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                  🦠 {result.problem}
                </h2>
                
                <div className="flex gap-4 mb-6">
                  <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    <span className="text-sm text-gray-500 block">Confidence</span>
                    <span className="text-xl font-bold text-gray-900">{result.confidence}</span>
                  </div>
                  <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
                    <span className="text-sm text-orange-700 block">Severity</span>
                    <span className="text-xl font-bold text-orange-800">🟠 {result.severity}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What you can do</h3>
                  <ul className="space-y-4">
                    {result.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-lg text-gray-700">
                        <CheckCircle2 className="h-6 w-6 text-brand-green flex-shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 text-center">
                    More Guidance
                  </button>
                  <button className="flex-1 bg-white text-brand-green border border-brand-green py-4 rounded-xl font-bold text-lg hover:bg-brand-light-green text-center">
                    Ask Expert
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <button onClick={() => setResult(null)} className="text-brand-green font-bold hover:underline flex items-center gap-2 mx-auto">
            Check another photo
          </button>
        </div>
      )}

      {/* History */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Checks</h2>
        <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-4">
          <div className="relative">
            <div className="absolute -left-[25px] bg-white border-2 border-gray-300 h-4 w-4 rounded-full mt-1.5"></div>
            <div className="pl-6">
              <p className="font-bold text-gray-500 mb-1">Today</p>
              <p className="text-lg font-bold text-gray-900 flex items-center gap-2">📷 Crop image checked</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[25px] bg-white border-2 border-orange-400 h-4 w-4 rounded-full mt-1.5"></div>
            <div className="pl-6">
              <p className="font-bold text-gray-500 mb-1">3 days ago</p>
              <p className="text-lg font-bold text-gray-900 flex items-center gap-2">🦠 Possible disease detected</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[25px] bg-white border-2 border-brand-green h-4 w-4 rounded-full mt-1.5"></div>
            <div className="pl-6">
              <p className="font-bold text-gray-500 mb-1">7 days ago</p>
              <p className="text-lg font-bold text-gray-900 flex items-center gap-2">✅ No major issue detected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
