
import React, { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import PhoneInput from "@/components/PhoneInput";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!image) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }
    
    // Extract numbers only from phone
    const phoneNumbers = phone.replace(/\D/g, "");
    if (phoneNumbers.length < 10) {
      toast.error("Por favor, insira um número de telefone válido.");
      return;
    }
    
    if (!prompt.trim()) {
      toast.error("Por favor, insira um prompt.");
      return;
    }
    
    setLoading(true);
    
    // Here we would normally send the data to an API
    // Since we're just showing the UI, we'll simulate an API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Mensagem enviada com sucesso!");
      // Reset form
      setImage(null);
      setPhone("");
      setPrompt("");
    } catch (error) {
      toast.error("Erro ao enviar a mensagem. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Hero Section */}
      <div className="gradient-bg py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            WhatsApp Evolution Connect
          </h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
            Envie imagens com prompts personalizados diretamente para o WhatsApp
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium">
                  Imagem
                </Label>
                <ImageUploader onImageSelect={handleImageSelect} />
              </div>
              
              <PhoneInput value={phone} onChange={setPhone} />
              
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium">
                  Prompt
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Digite seu prompt aqui..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32"
                />
              </div>
              
              <Button 
                type="submit" 
                className="send-button w-full py-6 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Enviar para WhatsApp
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-4 text-center text-sm">
        <p>© 2025 WhatsApp Evolution Connect. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
