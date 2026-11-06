import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Paperclip, 
  Loader2, 
  Sparkles, 
  Compass, 
  ExternalLink, 
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { LinkedinIcon } from './icons/LinkedinIcon';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: preselectedService || '3D CAD Modelling',
    requirements: '',
    fileAttachment: null as File | null,
    botHoney: '',
  });

  // Keep projectType synchronized if user selected a service from the Services modal
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [emailData, setEmailData] = useState<{
    subject: string;
    body: string;
    mailtoUrl: string;
    gmailUrl: string;
    whatsappUrl: string;
  } | null>(null);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      err.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      err.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      err.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      err.email = 'Please provide a valid email address';
    }

    if (!formData.projectType) {
      err.projectType = 'Please select a project type';
    }

    if (!formData.requirements.trim()) {
      err.requirements = 'Please describe your CAD or product design requirements';
    } else if (formData.requirements.trim().length < 15) {
      err.requirements = 'Please provide a little more detail (at least 15 characters)';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildEmailPayload = (data: typeof formData, refId: string) => {
    const subject = `[CAD Project Enquiry] - ${data.projectType} from ${data.fullName} [${refId}]`;
    const body = `Hello Sundar,

I would like to inquire about a CAD / Product Design project with you. Here are my project specifications:

==================================================
CLIENT INFORMATION
==================================================
• Full Name: ${data.fullName}
• Email: ${data.email}
• Phone / WhatsApp: ${data.phone || 'Not provided'}

==================================================
PROJECT SPECIFICATIONS
==================================================
• Discipline / Service: ${data.projectType}

• Project Scope & Technical Requirements:
${data.requirements}

${data.fileAttachment ? `• Attached Brief: ${data.fileAttachment.name} (I will attach this file directly to this email)` : ''}

==================================================
Enquiry Reference: ${refId}
Sent via Sundar Saravanan CAD Portfolio
==================================================`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const mailtoUrl = `mailto:sundarcovai02@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sundarcovai02@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
    const whatsappUrl = `https://wa.me/917604888467?text=${encodeURIComponent(
      `Hi Sundar, I would like to inquire about a CAD project:\n\n*Name:* ${data.fullName}\n*Service:* ${data.projectType}\n*Scope:* ${data.requirements.substring(0, 140)}...\n\n*Ref:* ${refId}`
    )}`;

    return { subject, body, mailtoUrl, gmailUrl, whatsappUrl };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botHoney) {
      console.warn('Spam detected');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const refId = `CAD-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionId(refId);

      const payload = buildEmailPayload(formData, refId);
      setEmailData(payload);

      // Store in browser local storage
      try {
        const stored = JSON.parse(localStorage.getItem('sundar_cad_enquiries') || '[]');
        stored.push({
          id: refId,
          timestamp: new Date().toISOString(),
          ...formData,
          fileAttachmentName: formData.fileAttachment ? formData.fileAttachment.name : null,
        });
        localStorage.setItem('sundar_cad_enquiries', JSON.stringify(stored));
      } catch (e) {
        // storage fallback
      }

      // DIRECTLY TRIGGER EMAIL TO SUNDAR
      // Launch user's default email client pre-filled with the exact form enquiry
      const tempLink = document.createElement('a');
      tempLink.href = payload.mailtoUrl;
      tempLink.click();

      setSubmissionSuccess(true);
    } catch (err) {
      setErrors({ form: 'An error occurred during email generation. Please use the direct links below.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenGmail = () => {
    if (emailData?.gmailUrl) {
      window.open(emailData.gmailUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenMailApp = () => {
    if (emailData?.mailtoUrl) {
      window.location.href = emailData.mailtoUrl;
    }
  };

  const handleCopy = () => {
    if (emailData?.body) {
      navigator.clipboard.writeText(emailData.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#080A0E] relative border-t border-[#1E293B] overflow-hidden">
      {/* Background blueprint elements & ambient glows */}
      <div className="absolute inset-0 bg-blueprint-dense opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#3987FF]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D2FF]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>07 // COLLABORATION & INQUIRY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3987FF] via-[#00D2FF] to-white drop-shadow-[0_0_35px_rgba(57,135,255,0.4)]">
              SOMETHING EXTRAORDINARY.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A3ACB9] font-sans leading-relaxed">
            Fill out your project specifications below to generate and send an immediate email brief directly to Sundar at <strong className="text-white">sundarcovai02@gmail.com</strong>.
          </p>
        </div>

        {/* 3 High-Impact Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: EMAIL */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3987FF]/5 blur-2xl rounded-full group-hover:bg-[#3987FF]/15 transition-all pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#3987FF]/15 text-[#3987FF] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] text-[#3987FF] bg-[#151D2A] px-2.5 py-1 rounded border border-[#3987FF]/30 uppercase tracking-wider">
                  Direct Inbox
                </span>
              </div>
              <span className="font-mono text-xs text-[#A3ACB9] uppercase tracking-wider block mb-1">
                Professional Email
              </span>
              <a
                href="mailto:sundarcovai02@gmail.com"
                className="font-display text-lg font-bold text-white group-hover:text-[#3987FF] transition-colors block mb-2 break-all"
              >
                sundarcovai02@gmail.com
              </a>
              <p className="text-xs text-[#A3ACB9] font-sans">
                Primary engineering contact for CAD projects, technical drawings, and quote requests.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-[#1E293B]">
              <a
                href="mailto:sundarcovai02@gmail.com"
                className="w-full py-2.5 px-4 rounded-xl bg-[#151D2A] hover:bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold border border-[#1E293B] hover:border-[#3987FF] transition-all flex items-center justify-center space-x-2"
              >
                <span>Compose Direct Email</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: PHONE & WHATSAPP */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-[#111720] border border-[#1E293B] hover:border-[#00D2FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00D2FF]/15 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/5 blur-2xl rounded-full group-hover:bg-[#00D2FF]/15 transition-all pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#00D2FF]/15 text-[#00D2FF] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] text-[#00D2FF] bg-[#151D2A] px-2.5 py-1 rounded border border-[#00D2FF]/30 uppercase tracking-wider">
                  Call & WhatsApp
                </span>
              </div>
              <span className="font-mono text-xs text-[#A3ACB9] uppercase tracking-wider block mb-1">
                Direct Line
              </span>
              <a
                href="tel:+917604888467"
                className="font-display text-lg font-bold text-white group-hover:text-[#00D2FF] transition-colors block mb-2"
              >
                +91 7604 888 467
              </a>
              <p className="text-xs text-[#A3ACB9] font-sans">
                Available for technical discussions, project consultations, and urgent CAD milestone delivery.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-[#1E293B] flex space-x-2">
              <a
                href="tel:+917604888467"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#151D2A] hover:bg-[#1E293B] text-white font-mono text-xs uppercase tracking-wider font-semibold border border-[#1E293B] hover:border-[#00D2FF] transition-all flex items-center justify-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Call</span>
              </a>
              <a
                href="https://wa.me/917604888467"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white font-mono text-xs uppercase tracking-wider font-semibold border border-[#25D366]/40 hover:border-[#25D366] transition-all flex items-center justify-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: LINKEDIN */}
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-[#111720] border border-[#1E293B] hover:border-[#0A66C2] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#0A66C2]/15 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A66C2]/5 blur-2xl rounded-full group-hover:bg-[#0A66C2]/15 transition-all pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2] group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] text-[#0A66C2] bg-[#151D2A] px-2.5 py-1 rounded border border-[#0A66C2]/30 uppercase tracking-wider">
                  Verified Profile
                </span>
              </div>
              <span className="font-mono text-xs text-[#A3ACB9] uppercase tracking-wider block mb-1">
                LinkedIn Network
              </span>
              <a
                href="https://www.linkedin.com/in/sundar-saravanan-341223336/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg font-bold text-white group-hover:text-[#3987FF] transition-colors block mb-2"
              >
                Sundar Saravanan
              </a>
              <p className="text-xs text-[#A3ACB9] font-sans">
                Connect on LinkedIn to review verified posts, mechanical design journey, and network updates.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-[#1E293B]">
              <a
                href="https://www.linkedin.com/in/sundar-saravanan-341223336/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0A66C2] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#084e96] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#0A66C2]/25"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Project Enquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Terms Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111720] border border-[#1E293B]">
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Freelance Collaboration Terms
              </h3>
              <p className="text-xs sm:text-sm text-[#A3ACB9] font-sans leading-relaxed mb-6">
                Direct engagement for manufacturing companies, hardware startups, design agencies, and engineering consultants worldwide.
              </p>
              <div className="space-y-3.5 text-xs text-[#CBD5E1]">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3987FF] shrink-0 mt-0.5" />
                  <span><strong>NDA Guarantee:</strong> Complete confidentiality and non-disclosure for proprietary 3D CAD models.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3987FF] shrink-0 mt-0.5" />
                  <span><strong>Native & Neutral Exports:</strong> .SLDPRT, .SLDASM, .CATPart, .STEP AP214/242, .IGES, .STL, and manufacturing .PDF / .DWG drawings.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3987FF] shrink-0 mt-0.5" />
                  <span><strong>Rapid Turnaround:</strong> Initial scope analysis and project quotation provided within 24 hours.</span>
                </div>
              </div>
            </div>

            {/* Direct Email Target Badge */}
            <div className="p-5 rounded-2xl bg-[#151D2A] border border-[#3987FF]/30 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#3987FF]/20 flex items-center justify-center text-[#3987FF]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#A3ACB9] uppercase tracking-wider block">
                  Enquiry Recipient
                </span>
                <span className="font-mono text-sm text-white font-bold">
                  sundarcovai02@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Right Form Column: Direct Email Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111720] border border-[#1E293B] shadow-2xl relative">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Project Specification Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#A3ACB9] mb-8 font-sans">
                Fill out the form below. Submitting will <strong className="text-white">immediately compose an email to Sundar</strong> with your full project brief.
              </p>

              {submissionSuccess && emailData ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-[#151D2A] border border-[#3987FF]/50 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="font-mono text-xs text-[#00D2FF] uppercase tracking-wider block mb-1">
                      Email Dispatched & Pre-Filled
                    </span>
                    <h4 className="font-display text-2xl font-bold text-white">
                      Thank You, {formData.fullName}!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] font-sans mt-2 max-w-lg mx-auto">
                      Your default mail program was launched with your project brief pre-filled to <strong className="text-white">sundarcovai02@gmail.com</strong> under reference <strong className="text-[#3987FF] font-mono">{submissionId}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-[#0B0F16] border border-[#1E293B] text-left text-xs font-mono space-y-1.5 text-[#CBD5E1]">
                    <div className="flex justify-between items-center text-[#3987FF] font-bold border-b border-[#1E293B] pb-1.5 mb-1.5">
                      <span>ENQUIRY REF: {submissionId}</span>
                      <button
                        onClick={handleCopy}
                        className="text-[11px] text-[#A3ACB9] hover:text-white flex items-center space-x-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied' : 'Copy Brief'}</span>
                      </button>
                    </div>
                    <div><span className="text-[#64748B]">TO:</span> sundarcovai02@gmail.com</div>
                    <div><span className="text-[#64748B]">FROM:</span> {formData.fullName} ({formData.email})</div>
                    <div><span className="text-[#64748B]">DISCIPLINE:</span> {formData.projectType}</div>
                    <div><span className="text-[#64748B]">PHONE:</span> {formData.phone || 'N/A'}</div>
                    {formData.fileAttachment && (
                      <div><span className="text-[#64748B]">ATTACHMENT:</span> {formData.fileAttachment.name}</div>
                    )}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono text-[#A3ACB9]">
                      Choose your preferred way to send:
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {/* Option 1: Gmail Web Compose */}
                      <button
                        onClick={handleOpenGmail}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#EA4335] to-[#C5221F] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-[#EA4335]/25"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Send via Gmail Web</span>
                      </button>

                      {/* Option 2: Default Mail Client */}
                      <button
                        onClick={handleOpenMailApp}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-[#3987FF]/25"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Default Mail App</span>
                      </button>

                      {/* Option 3: WhatsApp Chat */}
                      <a
                        href={emailData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-[#25D366]/25"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmissionSuccess(false);
                        setEmailData(null);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          projectType: '3D CAD Modelling',
                          requirements: '',
                          fileAttachment: null,
                          botHoney: '',
                        });
                      }}
                      className="text-xs font-mono text-[#64748B] hover:text-white underline underline-offset-4 transition-colors"
                    >
                      Fill Out Another Enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="hidden">
                    <input
                      type="text"
                      name="bot_field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botHoney}
                      onChange={(e) => setFormData({ ...formData, botHoney: e.target.value })}
                    />
                  </div>

                  {errors.form && (
                    <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs text-[#CBD5E1] block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David Henderson"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#151D2A] border text-sm text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3987FF] transition-all ${
                          errors.fullName ? 'border-rose-500' : 'border-[#1E293B]'
                        }`}
                      />
                      {errors.fullName && (
                        <span className="font-mono text-[11px] text-rose-400 mt-1 block">{errors.fullName}</span>
                      )}
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#CBD5E1] block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. david@aerotech.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#151D2A] border text-sm text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3987FF] transition-all ${
                          errors.email ? 'border-rose-500' : 'border-[#1E293B]'
                        }`}
                      />
                      {errors.email && (
                        <span className="font-mono text-[11px] text-rose-400 mt-1 block">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs text-[#CBD5E1] block mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 7604 888 467"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#151D2A] border border-[#1E293B] text-sm text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3987FF] transition-all"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#CBD5E1] block mb-2">
                        CAD Service / Discipline *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#151D2A] border border-[#1E293B] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3987FF] transition-all cursor-pointer"
                      >
                        <option value="3D CAD Modelling">3D CAD Solid Modelling (SolidWorks / CATIA)</option>
                        <option value="2D Technical Drafting">2D Technical Drafting & GD&T Sheets</option>
                        <option value="Mechanical Product Modelling">Mechanical Product Design & Enclosures</option>
                        <option value="Assembly Modelling & Mates">Assembly Modelling & Kinematic Mates</option>
                        <option value="Exploded Assembly Views">Exploded Assembly Views & BOM</option>
                        <option value="Generative Surface Modelling">CATIA Generative Surface Modelling (GSD)</option>
                        <option value="Motion Simulation">SolidWorks Motion Study & Simulation</option>
                        <option value="Other Custom CAD Project">Other Custom CAD Requirement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#CBD5E1] block mb-2">
                      Project Requirements & Technical Brief *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your component, functional kinematics, target CAD software (SolidWorks/CATIA), envelope dimensions, or required manufacturing drawings..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#151D2A] border text-sm text-white placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3987FF] transition-all resize-none ${
                        errors.requirements ? 'border-rose-500' : 'border-[#1E293B]'
                      }`}
                    />
                    {errors.requirements && (
                      <span className="font-mono text-[11px] text-rose-400 mt-1 block">{errors.requirements}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#CBD5E1] block mb-2">
                      Attach Reference Sketch / CAD Brief (Optional)
                    </label>
                    <div className="flex items-center space-x-3">
                      <label className="px-4 py-2.5 rounded-xl bg-[#151D2A] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] hover:text-white hover:border-[#3987FF] transition-colors cursor-pointer flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-[#3987FF]" />
                        <span>Choose File (.PDF, .PNG, .STEP, .ZIP)</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFormData({ ...formData, fileAttachment: e.target.files[0] });
                            }
                          }}
                        />
                      </label>
                      {formData.fileAttachment && (
                        <span className="font-mono text-xs text-emerald-400 truncate max-w-xs">
                          {formData.fileAttachment.name}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#64748B] block mt-1.5">
                      Note: You can also attach files directly to the email after clicking submit.
                    </span>
                  </div>

                  <div className="pt-3 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3987FF] via-[#2563EB] to-[#1E6BDB] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 shadow-xl shadow-[#3987FF]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating Email Brief...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Submit & Email Directly to Sundar</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center font-mono text-[11px] text-[#A3ACB9]">
                      ✉ Submitting will directly open an email pre-addressed to <strong className="text-white">sundarcovai02@gmail.com</strong>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
