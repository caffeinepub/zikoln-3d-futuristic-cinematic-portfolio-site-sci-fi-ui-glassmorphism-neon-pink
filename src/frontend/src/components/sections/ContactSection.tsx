import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import GlassPanel from '../visual/GlassPanel';
import { useSubmitContactMessage } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { siteConfig } from '../../content/siteConfig';
import { SiInstagram, SiLinkedin, SiX } from 'react-icons/si';
import { Category } from '../../backend';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitMutation = useSubmitContactMessage();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        category: Category.SocialMedia,
      });

      toast.success('Signal sent successfully! 🚀');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      toast.error('Failed to send signal. Please try again.');
    }
  };

  const handleWhatsApp = () => {
    window.open(siteConfig.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Contact
        </h2>

        <GlassPanel className="p-8 md:p-12" neonColor="purple">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-white text-lg mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400 h-12"
                placeholder="Your name_"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-white text-lg mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400 h-12"
                placeholder="your.email@domain.com_"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="message" className="text-white text-lg mb-2 block">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400 min-h-[150px] resize-none"
                placeholder="Your message here_"
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all duration-300"
              >
                {submitMutation.isPending ? 'Sending Signal...' : 'Send Signal'}
              </Button>
              <Button
                type="button"
                onClick={handleWhatsApp}
                variant="outline"
                className="flex-1 h-12 border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20"
              >
                WhatsApp Direct
              </Button>
            </div>
          </form>

          {/* Social Icons */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex justify-center gap-6">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300"
              >
                <SiX className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300"
              >
                <SiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
